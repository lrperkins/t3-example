import React from 'react'

interface TabsProps {
  tabs: string[]
  tab: string
  setTab: (tab: string) => void
}

export default function Tabs({ tabs, tab, setTab}: TabsProps) {
  return (
    <div className='flex justify-center flex-wrap gap-2'>
      {
        tabs.map((item, index) => (
          <button
            className={`
            ${tab === item ?
              'bg-indigo-600 text-white':
              'border border-2 border-slate-300 text-slate-300'
            } rounded py-2.5 px-5 mr-2`}
            key={index}
            onClick={() => setTab(item)}
          >
            {item}
          </button>
        ))
      }
    </div>
  )
}
