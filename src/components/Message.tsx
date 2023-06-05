import React, { useState } from "react";

interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle");

  const handleCopyClick = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopyStatus("copied");

      setTimeout(() => {
        setCopyStatus("idle");
      }, 2000);
    });
  };
  return (
    <div className="relative my-4">
      <pre className="whitespace-pre-wrap rounded bg-gray-800 p-2 font-mono text-sm text-white">
        {code}
      </pre>
      <button
        className="absolute top-1 right-1 rounded bg-white py-1 px-2 text-xs text-gray-600 shadow"
        onClick={handleCopyClick}
      >
        {copyStatus === "idle" ? "Copy" : "Copied"}
      </button>
    </div>
  );
};

interface MessageProps {
  role: "user" | "system" | "assistant";
  content: string;
}

const Message: React.FC<MessageProps> = ({ role, content }) => {
  // const parts = content.split(/(```[\s\S]+?```)/g);
  // try catch for parts
  function splitContent(content: string) {
    try {
      const parts = content.split(/(```[\s\S]+?```)/g);
      return parts;
    } catch (error) {
      console.error(error);
      return [content];
    }
  }

  return (
    <div
      className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`m-2 rounded-lg px-4 py-2 ${
          role === "user"
            ? "ml-10 rounded-br-none bg-blue-500 text-white"
            : "mr-10 rounded-bl-none bg-gray-200 text-black"
        }`}
      >
        {splitContent(content).map((part, index) => {
          if (part.startsWith("```")) {
            const codeContent = part.slice(3, part.length - 3);
            return <CodeBlock key={index} code={codeContent} />;
          } else {
            return <span key={index}>{part}</span>;
          }
        })}
      </div>
    </div>
  );
};

export default Message;
