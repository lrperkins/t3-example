import Head from "next/head";
import React, { useState } from "react";
import algoliasearch from "algoliasearch/lite";
import {
  ClearRefinements,
  Hits,
  InstantSearch,
  RefinementList,
  SearchBox,
} from "react-instantsearch-hooks-web";
import CountUp from "react-countup";
import Link from "next/link";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Tooltip from "../components/Tooltip";

const searchClient = algoliasearch(
  "JBN0Y9WSDJ",
  "03a413cd7ba3c19ed00a356273bd1361"
);

const refinementListStyles = {
  list: "list-none p-1 text-gray-700",
  item: "flex items-center",
  selectedItem: "font-semibold",
  label: "truncate",
  count: "ml-3 text-sm text-slate-500",
  noResults: "text-xs text-slate-500",
  searchableInput: "form-input w-full",
  checkbox:
    "h-4 w-4 rounded border-gray-400 text-indigo-600 focus:ring-indigo-500  mr-2 ml-1",
};
const searchBoxListSyles = {
  root: "form w-full",
  form: "p-5 justify-center flex",
  input:
    " w-2/3 p-2 rounded-full border-slate-300 border-2 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg",
  submit:
    "inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ml-3",
  // reset: '!display-none',
  // loadingIndicator: 'form-button',
  // loadingIcon: 'form-button',
  submitIcon: "h-5 w-5 fill-white",
  // resetIcon: '!display-none',
  // clearIcon: 'form-button',
  // loadingText: 'form-button',
  // submitText: 'form-button',
  // resetText: 'form-button',
  clearText: "form-button",
};

const Modal = (hit) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="disabled group mt-4 inline-flex items-center justify-center rounded-full bg-white px-4 text-sm text-slate-900 ring-1 hover:bg-blue-50 focus:outline-none focus-visible:outline-white active:bg-blue-200 active:text-slate-600"
        type="button"
      >
        Read More
      </button>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-auto max-w-3xl">
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                <div className="flex items-start justify-between rounded-t border-b border-solid border-gray-300 p-5 ">
                  <h3 className="font=semibold text-xl">General Info</h3>
                  <button
                    className="float-right border-0 bg-transparent text-black"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="opacity-7 block h-6 w-6 py-0 text-xl text-black ">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative flex-auto p-6">
                  {JSON.stringify(hit)}
                </div>
                <div className="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6">
                  <button
                    className="background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none focus:outline-none"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

function Hit({ hit }) {
  return (
    <div className="relative mb-4 flex items-start overflow-hidden rounded border-2 border-stone-200 px-8 py-5 shadow-lg">
      <div className="flex h-5 items-center">
        <input
          id={hit.case_id}
          name={hit.case_id}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-400 text-indigo-600 focus:ring-indigo-500 "
          style={{ marginTop: 4 }}
        />
      </div>
      <div className="ml-3 w-full text-sm">
        <label className="text-lg text-gray-700">
          <div>
            <Link
              className="text-blue-600 underline visited:text-purple-600 hover:text-blue-800"
              href={{
                pathname: `/companies/${hit.ticker}`,
                query: {
                  name: hit.name,
                  ticker: hit.ticker,
                  exchange: hit.exchange,
                  description: hit.description,
                  industry: hit.industry,
                  sector: hit.sector,
                },
              }}
            >
              {hit.name}
            </Link>{" "}
            <span className="text-sm text-gray-500">
              ({hit.ticker}
              {hit.exchange ? ` - ${hit.exchange}` : ""})
            </span>
          </div>
        </label>
        <div>
          {hit.sector && (
            <span className="mr-1 inline-block rounded bg-indigo-200 py-0 px-2 text-[0.6rem] font-semibold uppercase text-indigo-600 last:mr-0">
              {hit.sector}
            </span>
          )}
          {hit.industry && (
            <span className="mr-1 inline-block rounded bg-indigo-200 py-0 px-2 text-[0.6rem] font-semibold uppercase text-indigo-600 last:mr-0">
              {hit.industry}
            </span>
          )}
          {(hit.industry || hit.sector) && (
            <Tooltip text="Ask us about 'Zero-Shot Classification'.">
              {/* <InformationCircleIcon className="inline-block h-5 w-5 text-gray-900" /> */}
              <div className=" inline-block rounded-full border-y-red-600 p-1">
                <img
                  src="/favicon.ico"
                  className="grayscale-100 inline-block h-6 w-6 grayscale filter hover:grayscale-0"
                />
              </div>
            </Tooltip>
          )}
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-9">
            <div className="p-2 pl-0">
              <div
                className="p-2 pl-0 text-gray-600"
                style={{
                  fontSize: 14,
                  lineHeight: 1,
                  maxHeight: 93,
                  overflow: "hidden",
                }}
              >
                {hit.description
                  ? hit.description
                  : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
              </div>

              <Modal hit={hit} />
            </div>
          </div>
          <div className="col-span-3">
            <div className="mt-3 text-center text-5xl font-extrabold tracking-tight text-[#43b365] sm:text-[4rem] ">
              <CountUp
                start={0}
                end={Math.round(hit.pctRank * 100)}
                suffix="%"
              />
            </div>
            <div className="text-center font-bold text-gray-500">
              ESG Overall Score
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
        <SearchBox
          classNames={searchBoxListSyles}
          placeholder="Company name or stock symbol"
        />
        {/* Refinement list: state, counties, statewideFlag, constructionType, year, standard */}
        <div className="mx-auto grid max-w-4xl grid-cols-7 gap-10">
          <div className="col-span-2">
            <div className="mt-10 grid grid-cols-2 gap-2">
              <div className="col-span-1">
                <h3 className="mt-3 text-2xl font-semibold">Filters</h3>
              </div>

              {/* <div className="col-span-1">
                <ClearRefinements className="rounded-md border-blue-800 text-sm outline-1" />
              </div> */}
            </div>
            <h3 className="mt-3 text-lg font-semibold">Country</h3>

            <RefinementList
              classNames={refinementListStyles}
              attribute="exchange"
            />
            {/* <h3 className='mt-3 font-semibold text-lg'>ESG Score</h3>
            <RangeInput classNames={refinementListStyles} attribute='pctRank' /> */}
            <h3 className="mt-3 text-lg font-semibold">Sector</h3>
            <RefinementList
              classNames={refinementListStyles}
              attribute="sector"
            />
            <h3 className="mt-3 text-lg font-semibold">Industry</h3>
            <RefinementList
              classNames={refinementListStyles}
              attribute="industry"
            />
          </div>
          <div className="col-span-5">
            {/* tailwind export to csv button */}
            <div className="flex w-full justify-end">
              <button className="disabled group mb-4 inline-flex items-center justify-center rounded-full bg-white py-2 px-4 text-sm text-slate-900 ring-1 hover:bg-blue-50 focus:outline-none focus-visible:outline-white active:bg-blue-200 active:text-slate-600">
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
