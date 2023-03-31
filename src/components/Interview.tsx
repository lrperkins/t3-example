import React from 'react'

interface InterviewProps {
  selects: {
    label: string
    value: string
    options: {
      label: string
      value: string
    }[]
  }[]
  selectOptions: { [key: string]: string }
  setSelectOptions: (selectOptions: { [key: string]: string }) => void
  onClick: () => void
}

export default function Interview({ selects, selectOptions, setSelectOptions, onClick }: InterviewProps) {
  return (
    <div className='flex justify-between flex-col gap-3'>
      <p className='text-center text-gray-500'>Select position and experience level for Assistive Intel to interview you</p>
      <div className='flex justify-between'>
      {
        selects.map((item, i) => (
          <select
            className='w-[48%] bg-indigo-600 rounded p-2.5 text-white'
            key={i}
            placeholder={item.label}
            value={selectOptions[item.value]}
            onChange={(e) => setSelectOptions([...selectOptions, {[item.value]: e.target.value}])}
          >
            {
              item.options.map((option, index) => (
                <option value={option.value} key={index}>{option.label}</option>
              ))
            }
          </select>
        ))
      }
      </div>
      <button
        className='bg-indigo-600 rounded text-white py-2.5 w-20'
        onClick={onClick}
      >Submit</button>
    </div>
  )
}
