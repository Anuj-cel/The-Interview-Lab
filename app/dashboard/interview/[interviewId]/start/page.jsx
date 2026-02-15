"use client"
import { use } from 'react';
import React from 'react'
import { useState } from 'react';
import { MockInterview } from '@/utils/schema';
import QuestionsSection from './_components/QuestionsSection';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import db from '@/utils/db';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import RecordAnswerSection from './_components/RecordAnswerSection';
import QuestionsSectionShimmer from './_components/QuestionSectionShimmer';

function StartInterview({ params }) {

  const { interviewId } = use(params);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [loading, setLoading] = useState(true);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const GetInteviewDetails = async () => {
    const result = await db.select().from(MockInterview)
      .where(eq(MockInterview.mockId, interviewId));
    setMockInterviewQuestion(result[0].jsonMockResp)
    setLoading(false)
  }
  useEffect(() => {
    GetInteviewDetails();
  }, [])

  return (
    <>
      {
        loading ?
          <>
            <QuestionsSectionShimmer />
          </> :
          <div>
            <div className="flex gap-2">
              <QuestionsSection mockInterviewQuestion={mockInterviewQuestion} activeQuestionIndex={activeQuestionIndex} setActiveQuestionIndex={setActiveQuestionIndex} />
              <RecordAnswerSection mockInterviewQuestion={mockInterviewQuestion} activeQuestionIndex={activeQuestionIndex} interviewId={interviewId} />
            </div>
            <div className='flex justify-end gap-6 my-5'>

              {activeQuestionIndex > 0 && <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>Previous Question</Button>}
              {activeQuestionIndex < 4 && <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>Next Question</Button>}
              <Link href={"/dashboard/interview/" + interviewId + "/feedback"}>
                {activeQuestionIndex == 4 && <Button className={"cursor-pointer"}>End Interview</Button>}
              </Link>
            </div>
          </div>
      }
    </>
  )

}
  export default StartInterview