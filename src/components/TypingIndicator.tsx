import React from "react";

const TypingIndicator = () => {
  return (
    <div className="m-2 mr-10 w-20 rounded-lg rounded-bl-none bg-gray-200 px-4 py-2 text-black">
      <div className="typing-indicator ">
        <div className="typing-indicator-dot"></div>
        <div className="typing-indicator-dot"></div>
        <div className="typing-indicator-dot"></div>
      </div>
    </div>
  );
};

export default TypingIndicator;
