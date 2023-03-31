import React from 'react'

interface AnswerProps {
  answers: { question: string, answer: string }[]
  category: string
}
interface QuestionBlockProps {
  category: string
  question: string
}

const QuestionBlock = ({ category, question }: QuestionBlockProps) => {
  if (category !== 'Tech Question') return null;
  return (
    <div className='w-full min-h-[160px] border border-2 border-slate-200 rounded p-2.5 shadow-xl'>
      <h4 className='text-center font-bold'>Question</h4>
      <p className='text-center'>{question} ?</p>
    </div>
  )
}

export default function Answer({ answers, category }: AnswerProps) {
  return (
    <>
      {answers.map((item: { question: string, answer: string}, index: number) => (
        <div key={index} className="flex flex-col gap-3">
          <QuestionBlock category={category} question={item.question} />
          <pre className='whitespace-pre-wrap'>
            <div className='w-full min-h-[160px] bg-indigo-100 rounded p-2.5 shadow-xl'>
              <h4 className='text-center font-bold'>Answer</h4>
              <p className='text-left'>{item.answer}</p>
            </div>
          </pre>
        </div>
      )).reverse()}
    </>
  )
}
