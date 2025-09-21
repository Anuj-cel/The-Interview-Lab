"use client"
import { v4 as uuidv4 } from 'uuid';
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from 'next/navigation';
import db from '@/utils/db';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import generateContent from '@/utils/GeminiAiModel'
import { LoaderCircle } from 'lucide-react'
import { useUser } from '@clerk/nextjs';
import moment from 'moment/moment';
import { MockInterview } from '@/utils/schema';
function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [jobExperience, setJobExperience] = useState(0);
    const [loading, setLoading] = useState(false);
    const [parsedResult, setParsedResult] = useState("");
    const router = useRouter()
    const { user } = useUser();//getting the user
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        console.log(jobPosition, jobDesc, jobExperience)
        const InputPrompt = `Job Position:${jobPosition},Job Description:${jobDesc},Years of Experience:${jobExperience},Depends of this information please give me 5 interview questions with Answered in Json format,Give Questions and Answered as field names in JSON and no other text lines as i need to parse them`
        try {
            const response = await generateContent(InputPrompt);
            console.log(response);
            let MockResponse = await response.replaceAll("```json", "").replaceAll("```", "");
            // sending propt to the generateContent
            console.log("New Mockresponse ", MockResponse); // Check if MockResponse is a valid JSON string
            const result = JSON.parse(MockResponse);//for removing ```json,``` so that can be parsed to .js
            setParsedResult(result);
            console.log(parsedResult);
            console.log(user?.primaryEmailAddress?.emailAddress); // Check if user email is defined

            const res = await db.insert(MockInterview)
                .values({
                    mockId: uuidv4(),
                    jsonMockResp: MockResponse,
                    jobPosition: jobPosition,
                    jobExperience: jobExperience,
                    jobDesc: jobDesc,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format("DD-MM-yyyy")
                }).returning({ mockId: MockInterview.mockId });//for id as table has id

            console.log("Inserted Id", res);
            if (res) {
                setOpenDialog(false)
                setLoading(false)
                router.push("/dashboard/interview/" + res[0]?.mockId)
            }
        } catch (error) {
            if (error.response && error.response.status === 503) {
                // Specific handling for 503 from Gemini (or any external service)
                console.warn("Gemini model is overloaded. Suggesting a retry.");
                return res.status(503).json({
                    error: {
                        message: "AI service is temporarily unavailable. Please try again later.",
                        code: 503
                    }
                });
            }
            else  {console.log("Error",error)}
            setLoading(false)
        }
    }
    return (
        <div>
            <div>
                <h2 className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all' onClick={() => setOpenDialog(true)}>+ Add New</h2>
                {/* opens dialog on click */}
            </div>
            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Tell us more about your job interviewing</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={(e) => onSubmit(e)}>

                                <div>
                                    <div>Add Details about your job position/role, Job description and years of experience</div>
                                    <div className='mt-7 my-3'>
                                        <label>Job Role/Job Position</label>
                                        <Input placeholder="Ex. Full Stack Developer" required onChange={(e) => setJobPosition(e.target.value)} />
                                    </div>
                                    <div className='my-3'>
                                        <label>Job Description/ Tech Stack</label>
                                        <Textarea placeholder="Ex. React, Angular, NodeJs, MySql" required onChange={(e) => setJobDesc(e.target.value)} />
                                    </div>
                                    <div className='my-3'>
                                        <label>Years of experience</label>
                                        <Input placeholder="Ex. 5" type="number" max="50" required onChange={(e) => setJobExperience(e.target.value)} />
                                    </div>
                                </div>
                                <div className='flex gap-5 justify-end'>
                                    <Button variant='ghost' onClick={() => { setOpenDialog(false); setLoading(false) }}>Cancel</Button>
                                    <Button className='bg-blue-600 cursor-pointer' type="submit" disabled={loading}>
                                        {loading ?
                                            <>
                                                <LoaderCircle className='animate-spin' />Generating with AI
                                            </> : "Start Interview"}
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewInterview