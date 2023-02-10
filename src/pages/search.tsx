import Head from 'next/head'
import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { ClearRefinements, Hits, InstantSearch, RefinementList, SearchBox, RangeInput, Snippet } from 'react-instantsearch-hooks-web';
import CountUp from 'react-countup'

const searchClient = algoliasearch('JBN0Y9WSDJ', '03a413cd7ba3c19ed00a356273bd1361');


const refinementListStyles = {
  list: 'list-none p-1',
  item: 'flex items-center',
  selectedItem: 'font-semibold',
  label: '',
  count: 'ml-3 text-sm text-slate-500',
  noResults: 'text-xs text-slate-500',
  searchableInput: 'form-input w-full',
  checkbox: 'h-4 w-4 rounded border-gray-400 text-indigo-600 focus:ring-indigo-500  mr-2 ml-1',
}
const searchBoxListSyles = {
  root: 'form w-full',
  form: 'p-5 justify-center flex',
  input: ' w-2/3 p-2 rounded-full border-slate-300 border-2 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg',
  submit: 'inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ml-3',
  // reset: '!display-none',
  // loadingIndicator: 'form-button',
  // loadingIcon: 'form-button',
  submitIcon: 'h-5 w-5 fill-white',
  // resetIcon: '!display-none',
  // clearIcon: 'form-button',
  // loadingText: 'form-button',
  // submitText: 'form-button',
  // resetText: 'form-button',
}
function Hit({ hit }) {
  return (
    <div className="relative flex items-start mb-4 rounded overflow-hidden shadow-lg p-8 border-stone-200 border-2">
      <div className="flex h-5 items-center">
        <input
          id={hit.case_id}
          name={hit.case_id}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-400 text-indigo-600 focus:ring-indigo-500 "
          style={{ marginTop: 4 }}
        />
      </div>
      <div className="ml-3 text-sm w-full">
        <label htmlFor="candidates" className="text-lg text-gray-700">

          <div>{hit.name} <span className='text-gray-500 text-sm'>({hit.exchange} - {hit.ticker})</span></div>
        </label>
        <div className="grid grid-cols-12">
          <div className="col-span-6">
            <div className="p-2">
              <div className="text-5xl font-extrabold tracking-tight text-[#43b365] sm:text-[4rem] text-center mt-3 ">
                <CountUp start={0} end={Math.round(hit.pctRank * 100)} suffix='%' />


                </div>
                <div className='text-center font-bold text-gray-500'>ESG Overall Score</div>


            </div>
          </div>
          <div className="col-span-6">
            <div className="p-2" style={{ fontSize: 8, lineHeight: 1, maxHeight: 100, overflow: 'hidden'}}>
             hit json: {JSON.stringify(hit)}

            </div>
          </div>
      </div>
    </div>
    </div>
  );
}


export default function Register() {
  return (
    <>
      <Head>
        <title>Search the ESG Ticker</title>
      </Head>
      
      <InstantSearch searchClient={searchClient} indexName="companies_v0">
        <SearchBox classNames={searchBoxListSyles} placeholder='Company name or stock symbol' />
        {/* Refinement list: state, counties, statewideFlag, constructionType, year, standard */}
        <div className="grid grid-cols-7 gap-2 p-10">
          <div className="col-span-2">
            <ClearRefinements className="group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none bg-white text-slate-900 hover:bg-blue-50 active:bg-blue-200 active:text-slate-600 focus-visible:outline-white" />
            <h3 className='mt-3 font-semibold text-lg'>Country</h3>
            <RefinementList classNames={refinementListStyles} attribute="exchange" />
            {/* <h3 className='mt-3 font-semibold text-lg'>ESG Score</h3>
            <RangeInput classNames={refinementListStyles} attribute='pctRank' /> */}
            <h3 className='mt-3 font-semibold text-lg'>Sector</h3>
            <RefinementList classNames={refinementListStyles} attribute='sector' />
            <h3 className='mt-3 font-semibold text-lg'>Industry</h3>
            <RefinementList classNames={refinementListStyles} attribute='industry' />
          </div>
          <div className="col-span-5">
            {/* tailwind export to csv button */}
            <div className='w-full flex justify-end'>
              <button className="group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none bg-white text-slate-900 hover:bg-blue-50 active:bg-blue-200 active:text-slate-600 focus-visible:outline-white mb-4 disabled">
                Export to csv
              </button>
            </div>
            <Hits hitComponent={Hit} />

          </div>
        </div>
      </InstantSearch>
    </>
  );
}
