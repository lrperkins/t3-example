import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import Interview from '../components/Interview'
import Prompt from '../components/Prompt'
import Tabs from '../components/Tabs'
import { topics } from '../constants/topic'

interface AnswerProps {
  question: string
  answer: string
}

const selects = [
  {
    label: 'What Position',
    value: 'position',
    options: [
      { label: 'Frontend', value: 'frontend' },
      { label: 'Backend', value: 'backend' },
      { label: 'Fullstack', value: 'fullstack' },
    ],
  },
  {
    label: 'Experience level',
    value: 'experience',
    options: [
      { label: 'Junior', value: 'junior' },
      { label: 'Mid', value: 'mid' },
      { label: 'Senior', value: 'senior' },
    ],
  },
]

export default function AssistiveIntel() {
  const tabs = ['Tech Question', 'Fix my code', 'Write my code', 'Explain my code', 'Interview']
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [answer, setAnswer] = useState<AnswerProps[]>([])
  const [tab, setTab] = useState('Tech Question')
  const [selectOptions, setSelectOptions] = useState<{ [key: string]: string }[]>([{position: 'frontend'}, {experience: 'junior'}])

  const convertTabToTopic = (tab: string) => {
    switch (tab) {
      case 'Tech Question':
        return topics.TECH_QUESTION
      case 'Fix my code':
        return topics.FIX_CODE
      case 'Write my code':
        return topics.WRITE_CODE
      case 'Explain my code':
        return topics.EXPLAIN_CODE
      case 'Interview':
        return topics.INTERVIEW_QUESTION
      default:
        return topics.TECH_QUESTION
    }
  }

  const askQuestion = async () => {
    setLoading(true)
    const response = await fetch('/api/chatgpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: question, topic: convertTabToTopic(tab) }),
    })
    const data = await response.json()
    setAnswer([...answer, {question: question, answer: data.result}])
    setQuestion('')
    setLoading(false)
  }

  const clearResponse = async () => {
    setAnswer([])
  }

  const changeTopic = (item: string) => {
    setTab(item);
    setAnswer([]);
  }
  const interviewRequest = async () => {
    setLoading(true)
    console.log('options', selectOptions)
    const response = await fetch('/api/chatgpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({topic: convertTabToTopic(tab), position: selectOptions[0].position, level: selectOptions[1].experience }),
    })
    const data = await response.json()
    setAnswer([...answer, {question: question, answer: data.result}])
    setLoading(false)
  }

  return (
    <div className='flex items-center justify-center'>
      <div className='flex flex-col items-center w-3/5 gap-3'>
        <div className='flex flex-col gap-3 w-3/5'>
          <div>
            <h1 className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center'>
              Assistive Intelligence
            </h1>
            <p className='text-center text-gray-500'>
              Allow Assistive Intelligence to be your AI assistant. Select a category and ask away.
            </p>
          </div>
          <div>
            <Tabs tabs={tabs} tab={tab} setTab={changeTopic} />
          </div>
          {
            tab === 'Interview' ?
              <Interview
                selects={selects}
                selectOptions={selectOptions}
                setSelectOptions={setSelectOptions}
                onClick={interviewRequest}
              /> :
              <Prompt
                question={question}
                setQuestion={setQuestion}
                onClick={askQuestion}
                clear={clearResponse}
              />
          }
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
