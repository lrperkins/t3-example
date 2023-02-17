import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const comp = {
  name: "Apple",
  ticker: "AAPL",
  exchange: "NASDAQ",
  description:
    "Apple is an American multinational technology company headquartered in Cupertino, California, that designs, develops, and sells consumer electronics, computer software, and online services.",
};

export const getServerSideProps = (context) => {
  console.log(context.query);
  return {
    props: { ...context.query },
  };
};

export default function Company(props) {
  const [productInput, setProductInput] = useState("");
  const [result, setResult] = useState(() => "");
  const [isLoading, setIsLoading] = useState(false);
  const [website, setWebsite] = useState("");
  const router = useRouter();
  const { company } = router.query;

  async function queryAi(query) {
    if (query.includes("ESG")) {
      setIsLoading(true);
    }
    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: query }),
    });
    const data = await response.json();
    console.log("data", data);
    console.log("data.result", data.result);

    const rawResult = data.result;

    console.log(rawResult);

    // set result to the highlighted code. Address this error: Argument of type 'string' is not assignable to parameter of type '(prevState: undefined) => undefined'.ts(2345)
    if (query.includes("ESG")) {
      setResult(rawResult);
      setProductInput("");
      setIsLoading(false);
    }
    if (query.includes("website")) {
      setWebsite(rawResult);
    }
  }
  // queryAi(`What is the website of the company with ticker symbol ${company}? (example response: www.google.com)\n\n###\n\n`)
  return (
    <div className="m-4 mx-auto max-w-4xl">
      <div className="m-4">
        <button type="button" onClick={() => router.back()}>
          ← Back to search
        </button>
      </div>
      <div
        className="float-left"
        style={{ float: "left", height: 150, marginRight: 30 }}
      >
        {website ? (
          <img
            src={`https://logo.clearbit.com/${website}`}
            style={{ height: 80, width: 80, borderRadius: 15 }}
            className="shake"
            onError={(e) => (e.currentTarget.src = "/ai_fail.png")}
          />
        ) : (
          <button
            onClick={() =>
              queryAi(
                `What is the website of ${props.name}? Their ticker symbol is ${company}? (ONLY RETURN A VALID URL)`
              )
            }
            className="shake"
          >
            <img
              src={`https://logo.clearbit.com/openai.com`}
              style={{ height: 100, width: 100 }}
            />
            AI Logo
            <br />
            (Click me!)
          </button>
        )}
      </div>
      <div className="grid">
        <h1 className="text-3xl font-bold">
          <a
            href={website}
            target="_blank"
            rel="noreferrer"
            className={
              !website
                ? ""
                : "text-blue-600 underline visited:text-purple-600 hover:text-blue-800"
            }
          >
            {props.name}
          </a>
        </h1>
        <p className="mb-2 text-sm text-gray-700">{website} </p>
        <h2 className="mb-2 text-xl font-semibold">
          {props.ticker} {props.exchange ? `(${props.exchange})` : ""}
        </h2>
        <p className="text-gray-500">{props.description}</p>
      </div>
      <button
        className="my-10 h-7 w-full rounded-2xl bg-fuchsia-600 text-sm text-white"
        onClick={() =>
          queryAi(
            `Write a paragraph with details about the ESG commitments of the company ${props.name} with ticker symbol ${company} in the style of 
            Steve Kornacki.`
          )
        }
      >
        Generate AI Content
      </button>
      <p>{result}</p>
      {isLoading && (
        <img
          src={`https://logo.clearbit.com/openai.com`}
          style={{ height: 80, width: 80, borderRadius: 15 }}
          className="rotate m-auto"
        />
      )}
    </div>
  );
}
