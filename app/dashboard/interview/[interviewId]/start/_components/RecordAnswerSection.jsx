"use client"
import React from 'react'
import Webcam from 'react-webcam'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text'
import { useEffect } from 'react'
import { useState } from 'react'
import { Mic } from 'lucide-react'
import { StopCircle } from 'lucide-react'
import { toast } from "sonner"
import generateContent from '@/utils/GeminiAiModel'
import db from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq, and } from 'drizzle-orm'
import moment from 'moment/moment'
function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewId }) {
    const [cameraOn, setCameraOn] = useState(false);
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults   //
    } = useSpeechToText({
        crossBrowser: true,
        continuous: true,
        useLegacyResults: false
    });
    const user = useUser().user;
    const questions = typeof mockInterviewQuestion === 'string' ? JSON.parse(mockInterviewQuestion) : mockInterviewQuestion;
    const [userAnswer, setUserAnswer] = useState('');
    useEffect(() => {
        const transcripts = results.map(result => result.transcript).join(' ');
        setUserAnswer(transcripts);
    }, [results])

    const SaveUserAnswer = async () => {
        if (isRecording) {
            setCameraOn(false);
            stopSpeechToText();
            if (userAnswer?.length < 10) {

                toast.dismiss(); // Dismiss any pending toast notifications
                toast.error("Error while saving your answer, Please record again")
                return;
            }
            else {
              
                toast.dismiss(); // Dismiss any pending toast notifications
                // toast.success("User answer received successfully !")
                await updateUserAnswer();
                setUserAnswer("");
                setResults([])
            }
        }
        else {
            setCameraOn(true)
            startSpeechToText();
        }
    }
    const updateUserAnswer = async () => {
        const feedbackPrompt = "Question:" + questions[activeQuestionIndex]?.Questions + ", User Answer " + userAnswer + ",Depends on question and user answer " + "please give us rating for answer from 0 to 5 and feedback as area of improvement if any in just 3 to 5 lines to improve it in json format with rating field and feedback field there should be no text outside json as it need to parse it";
        try {
            const response = await generateContent(feedbackPrompt);
            let geminiResponse = response.replaceAll("```json", "").replaceAll("```", "");
            const result = await JSON.parse(geminiResponse);

            // Define the data to be updated
            const updateData = {
                userAns: userAnswer,
                feedback: result?.feedback,
                rating: result?.rating,
                createdAt: moment().format("DD-MM-YYYY") // Update timestamp if needed
            };

            // Define the conditions to find the record
            const whereConditions = and( // Use 'and' from Drizzle if you have multiple conditions
                eq(UserAnswer.mockIdRef, interviewId),
                eq(UserAnswer.question, questions[activeQuestionIndex]?.Questions),
                eq(UserAnswer.userEmail, user?.primaryEmailAddress?.emailAddress)
            );

            // Attempt to update the existing record
            const updatedResp = await db.update(UserAnswer)
                .set(updateData)
                .where(whereConditions)
                .returning({ id: UserAnswer.id });

            if (updatedResp.length > 0) {
                // Record was found and updated
                toast.dismiss(); // Dismiss any pending toast notifications
                toast.success("Answer updated successfully!");
            } else {
                // No existing record found for the given conditions, so insert a new one
                const insertedResp = await db.insert(UserAnswer)
                    .values({
                        mockIdRef: interviewId,
                        question: questions[activeQuestionIndex]?.Questions,
                        correctAns: questions[activeQuestionIndex]?.Answered, // Ensure this is the correct field
                        userAns: userAnswer,
                        feedback: result?.feedback,
                        rating: result?.rating,
                        userEmail: user?.primaryEmailAddress?.emailAddress,
                        createdAt: moment().format("DD-MM-YYYY")
                    }).returning({ id: UserAnswer.id });
                toast.dismiss(); // Dismiss any pending toast notifications
                toast.success("Answer saved successfully!"); // Toast for new insertion
            }

        } catch (error) {
            console.error("Error processing user answer (update/insert):", error);
            toast.dismiss(); // Dismiss any pending toast notifications
            toast.error("Failed to process your answer. Please try again.");
            return;
        }

    }
    return (
        <div className='flex items-center justify-center flex-col w-full'>

            <div className='flex flex-col my-20 justify-center items-center rounded-lg gap-10 bg-black text-center'>
                {cameraOn ? (
                    <Webcam
                        mirrored={true}
                        videoConstraints={{
                            facingMode: "user" // Or "environment" for back camera
                        }}
                        style={{
                            height: 300,
                            width: "100%",
                            zIndex: 10
                        }}
                    />
                ) : (
                    // Display an image or placeholder when camera is off
                    <Image src={"/webcam.png"} width={200} height={400} className='absolute' alt='WebCam' />
                )}
            </div>
            <Button variant={"outline"} className={"my-10"} onClick={SaveUserAnswer}>
                {isRecording ?
                    <h2 className='text-red-600 flex gap-2 items-center cursor-pointer' >
                        <StopCircle />Stop Recording
                    </h2>
                    : <h2 className='flex gap-2 items-center cursor-pointer' ><Mic />Record Answer</h2>}</Button>
            <br />
        </div>
    )
}
export default RecordAnswerSection