import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'
export const dynamic = "force-dynamic";

function page() {
  return (
 <div className='p-10'>
  <h2 className='font-bold text-2xl'>Dashboard</h2>
  <h2 className='text-gray-500'>Create and Start your AI Mockup</h2>
  <div className='grid grid-cols-1 md:grid-cols-3'>
    <AddNewInterview/>
  </div>
  {/* Previous Interview List */}
  <InterviewList/>
 </div>
  )
}

export default page