import React from 'react'
import { Lightbulb } from 'lucide-react';
import { Volume2 } from 'lucide-react';
function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex, setActiveQuestionIndex }) {
  const questions = typeof mockInterviewQuestion === 'string' ? JSON.parse(mockInterviewQuestion) : mockInterviewQuestion;
  const textToSpeach = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech)
    }
    else {
      alert("Soory your browser does not suppot text to Speech");
    }
  }
  return questions && (
    <div className='p-5 border rounded-lg'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>

        {questions && questions.map((question, index) =>
          <h2 key={index} className={`p-2  rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex === index && 'bg-blue-600 text-white'}`} onClick={() => setActiveQuestionIndex(index)}>Question {index + 1}</h2>
        )}
      </div>
      <h2 className='my-5 text-md md:text-lg' >{questions[activeQuestionIndex]?.Questions}</h2>
      <Volume2 className="cursor-pointer" onClick={() => textToSpeach(questions[activeQuestionIndex].Questions)} />
      <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
        <h2 className='flex gap-2 items-center text-blue-500'>
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className='text-sm text-blue-400 my-2'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
      </div>
    </div>
  )
}

export default QuestionsSection