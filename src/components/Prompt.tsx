import React from 'react'

interface PromptProps {
  question: string
  setQuestion: (question: string) => void
  onClick: () => void
  clear?: () => void
}

export default function Prompt({ question, setQuestion, onClick, clear }: PromptProps) {
  return (
    <div>
      <textarea
        className='border border-2 border-slate-300 w-full rounded h-40 p-2.5'
        placeholder='Ask a question'
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      ></textarea>
      <button
        className='bg-indigo-600 rounded text-white py-2.5 w-20'
        onClick={onClick}
      >Ask</button>

      <button
        className='bg-red-600 rounded text-white py-2.5 w-20 gap-2 mx-3'
        onClick={clear}
      >Clear</button>
    </div>
  )
}
