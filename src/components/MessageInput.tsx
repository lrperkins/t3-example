import React, { useState } from "react";

interface MessageInputProps {
  onSend: (message: string) => void;
  defaultText: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSend,
  defaultText = "",
}) => {
  const [input, setInput] = useState(defaultText);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() !== "") {
      onSend(input);
      setInput("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 flex w-full items-center gap-3 rounded-lg "
    >
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full rounded-lg border px-4 py-2 focus:border-blue-300 focus:outline-none focus:ring"
        placeholder="Type your message..."
        maxLength={3000}
      />

      <button
        type="submit"
        className="rounded-lg bg-blue-500 px-4 py-2 text-white"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
