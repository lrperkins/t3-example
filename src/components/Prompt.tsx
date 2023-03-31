import React from 'react'

interface PromptProps {
  question: string
  setQuestion: (question: string) => void
  onClick: () => void,
  category: string
  clear: () => void,
}

const placeholderText = (category: string) => {
  if (category === 'Tech Question') {
    return 'Ask Assistive Intel a tech question'
  } else if (category === 'Fix my code') {
    return 'Submit broken code to Assistive Intel'
  } else if (category === 'Write my code') {
    return 'Instruct Assistive Intel to write code'
  } else if (category === 'Explain my code') {
    return 'Submit code to Assistive Intel to explain'
  }
}

export default function Prompt({ question, setQuestion, onClick, category, clear }: PromptProps) {
  const placeholder = placeholderText(category)
  return (
    <div>
      <textarea
        className='border border-2 border-slate-300 w-full rounded h-40 p-2.5'
        placeholder={placeholder}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      ></textarea>
      <button
        className='bg-indigo-600 rounded text-white py-2.5 w-20'
        onClick={onClick}
      >Submit</button>

      <button
        className='bg-red-600 rounded text-white py-2.5 w-20 gap-2 mx-3'
        onClick={clear}
      >Clear</button>
    </div>
  )
}
