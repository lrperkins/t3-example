import React, { useState, useEffect, useRef } from "react";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import TypingIndicator from "../components/TypingIndicator";

const systemPrompts = {
  TECH_QUESTION: `Hello! I'm an AI developer assistant. Feel free to ask me any technical questions, and I'll do my best to help you out.`,
  EXPLAIN_CODE: `As a helpful assistant, I can help you understand blocks of code. Please provide the code you'd like me to explain, and I'll walk you through it.`,
  FIX_CODE: `I'm here to help you fix errors in your code. Please share the problematic code block, and I'll analyze it for any issues or improvements.`,
  WRITE_CODE: `I can write code to help you solve a specific problem. Please describe the problem, and I'll provide you with a solution in code.`,
  INTERVIEW_QUESTION: `Welcome to our virtual interview! I'm a professional developer who will be asking you questions. To get started, please tell describe the role you're interviewing for. (you can paste the job description here)`,
};

const buttonGroupClasses = {
  first:
    "relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-indigo-500 focus:z-10",
  middle:
    "relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-indigo-500 focus:z-10",
  last: "relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-indigo-500 focus:z-10",
};

interface IMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const AssistiveIntel: React.FC = () => {
  const [messages, setMessages] = useState<Record<string, IMessage[]>>(
    Object.keys(systemPrompts).reduce(
      (acc, prompt) => ({ ...acc, [prompt]: [] }),
      {}
    )
  );

  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("TECH_QUESTION");
  const handleTabChange = (tab: string) => {
    setTab(tab);
  };
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

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

    // Call the /api/chatgpt endpoint with the messages as the body
    const response = await fetch("/api/chatgpt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([
        { role: "system", content: systemPrompts[tab] },
        ...messages[tab],
        newMessage,
      ]),
    });
    // Get the response from the /api/chatgpt endpoint
    const data = await response.json();

    // Set loading to false to stop displaying the loading indicator
    setLoading(false);
    // Add the response from the /api/chatgpt endpoint to the messages in state
    setMessages((prevMessages) => ({
      ...prevMessages,
      [tab]: [...prevMessages[tab], { role: data.role, content: data.content }],
    }));
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-100">
      <div className="mt-20 w-full max-w-2xl rounded-lg bg-white p-4 shadow-md ">
        <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900">
          Assistive Intelligence
        </h1>
        <p className="mt-2 mb-4 text-center text-sm text-gray-500">
          Your virtual coding assistant, without the salary or benefits.
        </p>
        <div className="isolate w-full rounded-md shadow-sm">
          {/* // This code maps through each assistant in systemPrompts and returns a button element for each one
// The button element has a key value of the assistant name, a className value that toggles between the first, middle, and last button styles, and an onClick value that calls handleTabChange with the assistant name as an argument
// The button text is the assistant name with underscores replaced with spaces */}

          {Object.keys(systemPrompts).map((assistant, index) => (
            <button
              key={assistant}
              className={`
            ${
              tab === assistant ? "bg-indigo-600 text-white" : "text-slate-300"
            } ${
                index === 0
                  ? buttonGroupClasses.first
                  : index === Object.values(systemPrompts).length - 1
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
          <Message role="system" content={systemPrompts[tab]} />
          {messages[tab].map(
            (msg, index) =>
              msg.role !== "system" && (
                <Message key={index} role={msg.role} content={msg.content} />
              )
          )}

          {loading && <TypingIndicator />}
          <div ref={messagesEndRef}></div>
        </div>
        <MessageInput onSend={sendMessage} />
      </div>
    </div>
  );
};

export default AssistiveIntel;
