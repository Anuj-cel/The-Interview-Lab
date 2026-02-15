"use client"
import db from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import InterviewItemCard from './InterviewItemCard';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import InterviewItemCardShimmer from './InterviewItemCardShimmer';

function InterviewList() {
    const user = useUser().user;
    const [interviewList, setInterviewList] = useState();
    const GetInterviewList = async () => {
        const result = await db.select()
            .from(MockInterview)
            .where(eq(MockInterview.createdBy, user.primaryEmailAddress.emailAddress))
            .orderBy(desc(MockInterview.id));
        setInterviewList(result);
    }
    useEffect(() => {
        user && GetInterviewList();
    }, [user])
    return (
        <div>
            <h2 className='font-medium text-xl'>Previous Mock Interview</h2>
            {
                interviewList === undefined ?
                    <div className='grid   md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
                        {
                            [1, 2, 3, 4, 5].map((interview, index) => (
                                <InterviewItemCardShimmer />
                            ))
                        }</div> :
                    <div className='grid   md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
                        {
                            interviewList && interviewList.map((interview, index) => (
                                <InterviewItemCard interview={interview} key={index} />
                            ))
                        }
                    </div>
            }
        </div>
    )
}

export default InterviewList