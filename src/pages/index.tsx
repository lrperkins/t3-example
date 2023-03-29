import React, { useState } from "react";
// info icon from https://heroicons.com/
import { InformationCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import Head from "next/head";

const companies = [
  "Apple Inc",
  "Microsoft Corp",
  "Alphabet Inc",
  "Amazon.com Inc",
  "UnitedHealth Group Inc.",
  "Moderna",
  "Anthem Inc",
  "Allianz SE",
  "CVS Health Corp",
  "Cigna Corp",
  "The Progressive Corp",
  "Reliance Industries Ltd",
  "The Southern Co",
  "Schlumberger NV",
  "Taiwan Semiconductor Manufacturing Co Ltd",
  "BYD Co Ltd",
  "Huazhu Group Ltd",
  "China Yangtze Power Co Ltd",
];

function OpenAIForm() {
  const [prompt, setPrompt] = useState(
    "You are a business inight expert. Give a one paragraph description of COMPANY and their primary products and services in the style of Tim Ferriss."
  );
  const [maxTokens, setMaxTokens] = useState(350);
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(0.5);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0);
  const [presencePenalty, setPresencePenalty] = useState(0.0);
  const [companyResults, setCompanyResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editableCompanies, setEditableCompanies] = useState(companies);
  const [newCompany, setNewCompany] = useState("");

  const convertToCSV = () => {
    const headers = ["Company", "Description"];
    const rows = companyResults.map(({ name, description }) => {
      // if company is undefined console log the companyResults
      if (!name) {
        console.log(companyResults);
        return;
      }
      const escapedCompany = name.replace(/"/g, '""');
      const escapedDescription = description.replace(/"/g, '""');
      return [`"${escapedCompany}"`, `"${escapedDescription}"`];
    });

    let csvContent = headers.join(",") + "\n";

    rows.forEach((rowArray) => {
      csvContent += rowArray.join(",") + "\n";
    });

    return csvContent;
  };

  const downloadCSV = () => {
    const csvContent = convertToCSV();
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.setAttribute("href", url);
    link.setAttribute("download", "company_ai_descriptions.csv");
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Modify the handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setCompanyResults([]);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };

    const companyCompletionsPromises = editableCompanies.map(
      async (company) => {
        const updatedPrompt = prompt.replace("COMPANY", company);
        const requestBody = JSON.stringify({
          prompt: updatedPrompt,
          max_tokens: maxTokens,
          temperature,
          top_p: topP,
          frequency_penalty: frequencyPenalty,
          presence_penalty: presencePenalty,
        });

        requestOptions.body = requestBody;
        const response = await fetch("/api/openai", requestOptions);
        const data = await response.json();
        return { name: company, description: data.result };
      }
    );

    const companyCompletions = await Promise.all(companyCompletionsPromises);
    setCompanyResults(companyCompletions);
    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>Playground</title>
        <meta name="description" content="Playground for Harmony Analytics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen justify-center bg-gray-100 p-6 sm:py-12">
        <div className=" w-1/3 py-3 ">
          <h1 className="mb-6 text-center text-2xl font-bold">
            Harmony Playground
          </h1>
          <form
            onSubmit={handleSubmit}
            className="mb-4 rounded-xl bg-white px-8 pt-6 pb-8 shadow-md"
          >
            <div className="mb-4">
              <label
                htmlFor="prompt"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Prompt:
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={6}
                cols={50}
                className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              />
            </div>
            {[
              {
                label: "Max Tokens",
                value: maxTokens,
                setValue: setMaxTokens,
                min: 0,
                max: 1000,
                title:
                  "The token count of your prompt plus max_tokens cannot exceed the model's context length. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).",
              },
              {
                label: "Temperature",
                value: temperature.toFixed(1),
                setValue: setTemperature,
                min: 0,
                max: 1,
                step: 0.1,
                title:
                  "What sampling temperature to use, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. We generally recommend altering this or top_p but not both.",
              },
              {
                label: "Top P",
                value: topP.toFixed(1),
                setValue: setTopP,
                min: 0,
                max: 1,
                step: 0.1,
                title:
                  "An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.",
              },
              {
                label: "Frequency Penalty",
                value: frequencyPenalty,
                setValue: setFrequencyPenalty,
                min: 0,
                max: 2,
                title:
                  "Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.",
              },
              {
                label: "Presence Penalty",
                value: presencePenalty.toFixed(1),
                setValue: setPresencePenalty,
                min: 0,
                max: 2,
                step: 0.1,
                title:
                  "Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.",
              },
            ].map(({ label, value, setValue, title, ...props }) => (
              <div key={label} className="mb-4">
                <label
                  htmlFor={label}
                  className="mb-2 block text-sm font-bold text-gray-700"
                  title={title}
                >
                  {label}: {value}
                  <InformationCircleIcon
                    style={{
                      height: 15,
                      display: "inline",
                      paddingLeft: 6,
                    }}
                  />
                </label>
                <input
                  type="range"
                  id={label}
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                  {...props}
                  className="h-3 w-full appearance-none rounded bg-gray-300 focus:bg-gray-400 focus:outline-none"
                />
              </div>
            ))}
            <button
              type="submit"
              className="focus:shadow-outline w-full rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
            >
              Generate
            </button>
            <div className="mb-4">
              <h3 className="mb-2 mt-8 text-sm font-bold text-gray-700">
                Companies:
              </h3>
              {editableCompanies.map((company, index) => (
                <div key={index} className="mb-2 flex items-center space-x-2">
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => {
                      const updatedCompanies = [...editableCompanies];
                      updatedCompanies[index] = e.target.value;
                      setEditableCompanies(updatedCompanies);
                    }}
                    className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      const updatedCompanies = editableCompanies.filter(
                        (_, i) => i !== index
                      );
                      setEditableCompanies(updatedCompanies);
                    }}
                    className="focus:shadow-outline rounded bg-red-500 py-2 px-3 font-bold text-white hover:bg-red-700 focus:outline-none"
                  >
                    <TrashIcon style={{ height: 16 }} />
                  </button>
                </div>
              ))}
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  placeholder="Add a new company"
                  className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                />
                <button
                  onClick={() => {
                    if (newCompany.trim()) {
                      setEditableCompanies([...editableCompanies, newCompany]);
                      setNewCompany("");
                    }
                  }}
                  className="focus:shadow-outline rounded bg-blue-500 py-2 px-3 font-bold text-white hover:bg-blue-700 focus:outline-none"
                >
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className=" w-2/3 px-6 py-3 ">
          <div className="text-left">
            <div>
              <h1 className="mb-6 text-center text-2xl font-bold">
                Company Results:
              </h1>
              {!isLoading && companyResults.length === 0 && (
                <div className="mb-4 text-center">
                  <div className="">
                    <h2 className="m-2 text-lg font-bold">Getting Started</h2>
                    <ul className="list-inside list-disc px-4 text-left text-gray-700">
                      <li className="my-2">
                        Enter your prompt on the right to view the results for
                        companies in the sample. To modify companies, edit the
                        companies list below the form.
                      </li>
                      <li className="my-2">
                        The AI model is trained on what is essentially all
                        internet content until 2021. When you're giving it a
                        prompt, try to be as specific as possible. eg. Write a
                        response as if you're Wolfe Blitzer, Tim Ferris, or
                        Warren Buffet. The AI will be able to emulate the
                        writing style of that person. In the future, we could
                        iterate through a list of people when generating the
                        final results, to add additional randomness.
                      </li>
                      <li className="my-2">
                        Temperature: This will be the main setting that you will
                        want to modify to see how it affects your results. It
                        controls the creativity and randomness of the model.
                      </li>
                    </ul>
                    <h2 className="m-2 mt-10 text-lg font-bold">
                      Example Prompts
                    </h2>
                    <ul className="list-inside list-disc px-4 text-left text-gray-700">
                      <li className="my-2">
                        You are a business expert, specializing in ESG
                        compliance, providing insight to your clients. Give a
                        one paragraph description of COMPANY and their
                        commitments to ESG.
                      </li>
                      <li className="my-2">
                        You are a business inight expert. Give a one paragraph
                        description of COMPANY and their primary products and
                        services.{" "}
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              {isLoading && (
                <div className="mb-4 text-center">
                  <span className="animate-pulse text-gray-600">
                    Loading...
                  </span>
                </div>
              )}
              <div className="m-6 rounded-lg bg-gray-900 shadow-md">
                {companyResults.length > 0 && (
                  <div className="text-center">
                    <button
                      onClick={downloadCSV}
                      className="focus:shadow-outline m-5 rounded bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-700 focus:outline-none"
                    >
                      Download CSV
                    </button>
                  </div>
                )}
                <div style={{ maxHeight: 600, overflowY: "auto" }}>
                  {companyResults.map((company) => (
                    <div key={company.name} className="m-4">
                      <h3 className="text-lg font-bold text-gray-300">
                        {company.name}
                      </h3>
                      <p className="font-mono text-gray-400">
                        {company.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OpenAIForm;
