import React, { useState, useEffect, useRef } from "react";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import TypingIndicator from "../components/TypingIndicator";
import Cookies from "js-cookie";

import { PaperAirplaneIcon, TrashIcon } from "@heroicons/react/24/outline";

const systemPrompts = {
  FRED: {
    whoami: `Hello! I'm a Front End AI developer assistant. I'll help you write .tsx files in React, Next.js, typescript and Tailwind. Give me an example file if you'd like me to follow any existing patterns`,
    examples: [
      `
    import React, { useState } from "react";
    
    interface Props {
      name: string;
      age: number;
    }
    
    const ExampleComponent: React.FC<Props> = ({ name, age }) => {
      const [count, setCount] = useState<number>(0);
    
      const handleClick = () => {
        setCount(count + 1);
      };
    
      return (
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4">Hello, {name}!</h1>
          <p className="text-lg mb-4">You are {age} years old.</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClick}
          >
            Click me!
          </button>
          <p>You've clicked the button {count} times.</p>
        </div>
      );
    };
    
    export default ExampleComponent;
    `,
    ],
  },
  BEN: {
    whoami: `Hello! I'm a Back End AI developer assistant. I'll help you write code in node, next.js, typescript and Tailwind. Give me an example file if you'd like me to follow any existing patterns.`,
    examples: [
      `typescript
    import { createRouter, createTRPCClient } from 'trpc';
    import { z } from 'zod';
    
    const appRouter = createRouter()
      .query('hello', {
        input: z.string(),
        async resolve({ input }) {
          return \`Hello, \${input}!\`;
        },
      });
    
    const client = createTRPCClient({
      url: '/api/trpc',
    });
    
    const message = await client.query('hello', { input: 'world' });
    console.log(message);
    `,
    ],
  },
  ELLIOT: {
    whoami: `I'm an expert in your custom UI system. Feed me a couple of examples, and I'll help you write similar components in the future.`,
    examples: ["TBD"],
  },
  PROFESSOR: {
    whoami: `Need help understanding a new technology or concept? I'm here to help. I'll provide helpful tips and resources for whatever you ask me about, and help you understand the technology in question. Just shoot me questions and I'll do my best to answer them!`,
    examples: [
      `// first we need to import react
    import React from "react"`,
    ],
  },
};

const CustomForm: React.FC<Props> = ({
  onSubmit,
  defaultName = "",
  defaultWhoami = "",
  defaultExamples = [""],
  handleExample,
}) => {
  const [name, setName] = useState(defaultName);
  const [whoami, setWhoami] = useState(defaultWhoami);
  const [examples, setExamples] = useState<string[]>(defaultExamples);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({
      name,
      whoami,
      examples,
    });
  };

  const addExample = () => {
    setExamples([...examples, ""]);
  };

  const updateExample = (index: number, value: string) => {
    const updatedExamples = [...examples];
    updatedExamples[index] = value;
    setExamples(updatedExamples);
  };

  const removeExample = (index: number) => {
    const updatedExamples = examples.filter((_, i) => i !== index);
    setExamples(updatedExamples);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded border border-gray-300 p-2"
        />
      </div>
      <div>
        <label htmlFor="whoami" className="block text-sm font-medium">
          Whoami
        </label>
        <textarea
          id="whoami"
          rows={8}
          value={whoami}
          onChange={(e) => setWhoami(e.target.value)}
          className="mt-1 block w-full rounded border border-gray-300 p-2"
        />
      </div>
      <div>
        <label htmlFor="examples" className="block text-sm font-medium">
          Examples
        </label>
        {examples.map((example, index) => (
          <div key={index} className="mt-2 flex items-center space-x-2">
            <textarea
              id={`example-${index}`}
              value={example}
              onChange={(e) => updateExample(index, e.target.value)}
              className="shadow-mdp-2 flex-grow rounded border border-gray-600 bg-gray-900 p-4 text-gray-100"
              rows={10}
              maxLength={3000}
            />
            <div className="flex flex-col items-center justify-center space-y-2">
              <button
                type="button"
                onClick={() => removeExample(index)}
                className="clear-both  rounded py-1 px-0 font-semibold text-red-500 hover:text-red-600"
              >
                <TrashIcon style={{ height: 16 }} />
              </button>
              <br></br>

              <button
                type="button"
                onClick={() => handleExample(example)}
                className="block rounded py-1 px-0 font-semibold text-green-700 hover:text-green-600"
              >
                <PaperAirplaneIcon style={{ height: 18 }} />
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addExample}
          className="mt-2 rounded py-1 px-2 font-semibold text-blue-500 hover:text-blue-600"
        >
          New Example +
        </button>
      </div>
      <button
        type="submit"
        className="rounded bg-blue-500 py-2 px-4 font-semibold text-white hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

const buttonGroupClasses = {
  first:
    "justify-center flex-1 relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-indigo-500 focus:z-10 hover:text-white",
  middle:
    "justify-center flex-1 relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-indigo-500 focus:z-10 hover:text-white",
  last: "justify-center flex-1 relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-indigo-500 focus:z-10 hover:text-white",
};

interface IMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const AssistiveIntel: React.FC = () => {
  useEffect(() => {
    const storedBots = Cookies.get("bots");
    const storedMessages = Cookies.get("messages");

    if (storedBots) {
      setBots(JSON.parse(storedBots));
    } else {
      setBots(systemPrompts);
    }

    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    } else {
      setMessages(
        Object.keys(systemPrompts).reduce(
          (acc, prompt) => ({ ...acc, [prompt]: [] }),
          {}
        )
      );
    }

    scrollToBottom();
  }, []);
  const [loading, setLoading] = useState(false);
  const [bots, setBots] = useState(systemPrompts);
  const [tab, setTab] = useState("FRED");
  const [defaultText, setDefaultText] = useState("");
  const [messages, setMessages] = useState<Record<string, IMessage[]>>(
    Object.keys(bots).reduce((acc, prompt) => ({ ...acc, [prompt]: [] }), {})
  );
  const handleTabChange = (tab: string) => {
    setTab(tab);
  };
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const saveToCookie = () => {
    Cookies.set("bots", JSON.stringify(bots));
    Cookies.set("messages", JSON.stringify(messages));
  };

  const handleSubmit = (values: {
    name: string;
    whoami: string;
    examples: string[];
  }) => {
    setBots({ ...bots, [values.name]: values });
    setMessages({ ...messages, [values.name]: [] });
    saveToCookie();
  };

  const sendMessage = async (content: string) => {
    // Create a new message object
    const newMessage: IMessage = { role: "user", content };
    // Add the new message to the existing messages in state
    setMessages((prevMessages) => ({
      ...prevMessages,
      [tab]: [...prevMessages[tab], newMessage],
    }));
    // Set loading to true to display the loading indicator
    setLoading(true);

    try {
      // Call the /api/chatgpt endpoint with the messages as the body
      const response = await fetch("/api/chatgpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([
          { role: "system", content: bots[tab].whoami },
          ...messages[tab],
          newMessage,
        ]),
      });
      // Get the response from the /api/chatgpt endpoint
      const data = await response.json();

      // Add the response from the /api/chatgpt endpoint to the messages in state
      setMessages((prevMessages) => ({
        ...prevMessages,
        [tab]: [
          ...prevMessages[tab],
          { role: data.role, content: data.content },
        ],
      }));

      // Set loading to false to stop displaying the loading indicator
      setLoading(false);
    } catch (error) {
      console.error("Error while sending message:", error);
      setLoading(false);
    }
  };

  const handleSetDefaultText = (text: string) => {
    const formattedText = `Here is an example of how I want you to write your code: ${text}
    
    Just respond with 'I understand'`;
    setDefaultText(formattedText);
  };
  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-100 px-10">
      <div className="mt-20 w-1/2 rounded-lg bg-white p-4 shadow-md ">
        <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900">
          Your AI Workforce
        </h1>
        <p className="mt-2 mb-4 px-10 text-center text-gray-500">
          Build your own team of specialized AI agents to help with literally
          everything.
        </p>
        <div className="isolate flex w-full rounded-md shadow-sm">
          {/* // This code maps through each assistant in bots and returns a button element for each one
// The button element has a key value of the assistant name, a className value that toggles between the first, middle, and last button styles, and an onClick value that calls handleTabChange with the assistant name as an argument
// The button text is the assistant name with underscores replaced with spaces */}

          {Object.keys(bots).map((assistant, index) => (
            <button
              key={assistant}
              className={`
            ${
              tab === assistant ? "bg-indigo-600 text-white" : "text-slate-500"
            } ${
                index === 0
                  ? buttonGroupClasses.first
                  : index === Object.values(bots).length - 1
                  ? buttonGroupClasses.last
                  : buttonGroupClasses.middle
              }`}
              onClick={() => handleTabChange(assistant)}
            >
              {assistant.replace(/_/g, " ")}
            </button>
          ))}
        </div>
        <div style={{ maxHeight: 500 }} className="mt-4 overflow-y-auto">
          <Message role="system" content={bots[tab].whoami} />
          {messages[tab].map(
            (msg, index) =>
              msg.role !== "system" && (
                <Message key={index} role={msg.role} content={msg.content} />
              )
          )}

          {loading && <TypingIndicator />}
          <div ref={messagesEndRef}></div>
        </div>
        <MessageInput
          onSend={sendMessage}
          defaultText={defaultText}
          key={defaultText}
        />
      </div>
      <div className="mb-4 mt-20 ml-10 w-1/2 max-w-2xl rounded-lg bg-white p-4 shadow-md">
        <h1 className="ml-10 text-center text-3xl font-bold tracking-tight text-gray-900">
          Bot Training
        </h1>
        <div>
          <CustomForm
            key={tab}
            onSubmit={handleSubmit}
            defaultName={tab}
            defaultWhoami={bots[tab].whoami}
            defaultExamples={bots[tab].examples}
            handleExample={handleSetDefaultText}
          />
        </div>
      </div>
    </div>
  );
};

export default AssistiveIntel;
