"use client"
import db from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { use } from 'react';
import React from 'react'
import { useEffect } from 'react';
import { eq } from 'drizzle-orm';
import { useState } from 'react';
import Webcam from "react-webcam";
import { WebcamIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';
import { useContext } from 'react';
import { InterviewContext } from '@/utils/context';
import InterviewShimmer from "./start/_components/InterviewShimmer";
import Link from 'next/link';
function Interview({ params }) {
    const { interviewData, setInterviewData } = useContext(InterviewContext);
    const [webCamEnabled, setWebCamEnabled] = useState(false);
    const [loading, setLoading] = useState(true);
    const { interviewId } = use(params)
    const GetInteviewDetails = async () => {
        const result = await db.select().from(MockInterview)
            .where(eq(MockInterview.mockId, interviewId));
        setInterviewData(result[0])
        setLoading(false)
    }
    useEffect(() => {
        GetInteviewDetails();
    }, []);

    return (
        <div className='my-10'>
            {
                loading ? <InterviewShimmer /> :
                    <>
                        <h2 className='font-bold text-2xl'>Let's Get Started</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 '>

                            <div className='flex flex-col my-5 gap-5'>
                                <div className='flex flex-col p-5 rounded-lg border gap-5'>
                                    <h2 className='text-lg'><strong>Job Role/Job Position:</strong>{interviewData.jobPosition}</h2>
                                    <h2 className='text-lg'><strong>Job Description/Tech Stack:</strong>{interviewData.jobDesc}</h2>
                                    <h2 className='text-lg'><strong>Years of Experience:</strong>{interviewData.jobExperience}</h2>
                                </div>
                                <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
                                    <h2 className='flex gap-2 items-center text-yellow-500'><Lightbulb /><strong>Information</strong></h2>
                                    <h2 className='mt-3 text-yellow-500'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                                </div>
                            </div>
                            <div>
                                {
                                    webCamEnabled ? <Webcam
                                        onUserMedia={() => setWebCamEnabled(true)}
                                        onUserMediaError={() => setWebCamEnabled(false)}
                                        style={{ height: 300, width: 300 }} mirrored={true} /> : <>
                                        <WebcamIcon className='h-72  w-full my-7 p-20 bg-secondary rounded-lg border' />
                                        <Button variant={"ghost"} className={"w-full"} onClick={() => setWebCamEnabled(true)}>Enable Web Cam and Microphone</Button>
                                    </>
                                }
                            </div>
                        </div>
                        <div className='flex justify-end items-end'>
                            <Link href={"/dashboard/interview/" + interviewId + "/start"}>
                                <Button className={"bg-blue-700"}>Start Interview </Button>
                            </Link>
                        </div>
                    </>
            }

        </div>
    )
}

export default Interview;