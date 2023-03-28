import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner'

interface AnswerProps {
  question: string
  answer: string
}

export default function AssistiveIntel() {
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [answer, setAnswer] = useState<AnswerProps[]>([])

  const askQuestion = async () => {
    setLoading(true)
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: question }),
    })
    const data = await response.json()
    setAnswer([...answer, {question: question, answer: data.result}])
    setQuestion('')
    setLoading(false)
    console.log('data', data)
    console.log('data.result', data.result)
  }
  return (
    <div className='flex items-center justify-center'>
      <div className='flex flex-col items-center w-3/5 gap-3'>
        <div className='flex flex-col gap-3 w-3/5'>
          <div>
            <h1 className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center'>
              Assistive Intelligence
            </h1>
            <p className='text-center text-gray-500'>Allow Assistive Intelligence to be your AI assistant.</p>
          </div>
          <div>
            <textarea
              className='border border-2 border-slate-300 w-full rounded h-40 p-2.5'
              placeholder='Ask a question'
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            ></textarea>
            <button
              className='bg-indigo-600 rounded text-white py-2.5 w-20'
              onClick={askQuestion}
            >Ask</button>
          </div>
        </div>
        <div className='flex flex-col gap-3 w-full mb-5'>
          {loading && (
            <div className='flex justify-center'>
              <TailSpin color='#4f46e5' height={50} width={50} />
            </div>
          )}
          {answer.map((item, index) => (
            <div key={index} className="flex flex-col gap-3">
              <div className='w-full min-h-[160px] border border-2 border-slate-200 rounded p-2.5 shadow-xl'>
                <h4 className='text-center font-bold'>Question</h4>
                <p className='text-center'>{item.question} ?</p>
              </div>
              <div className='w-full min-h-[160px] bg-indigo-100 rounded p-2.5 shadow-xl'>
                <h4 className='text-center font-bold'>Answer</h4>
                <p className='text-center'>{item.answer}</p>
              </div>
            </div>
          )).reverse()}
        </div>
      </div>
    </div>
  )
}
