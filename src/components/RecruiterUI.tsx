import React, { useState, useEffect, useRef } from "react";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import TypingIndicator from "../components/TypingIndicator";
import Cookies from "js-cookie";

import { PaperAirplaneIcon, TrashIcon } from "@heroicons/react/24/outline";

const systemPrompts = {
  RECRUITER: {
    whoami: `You are a friendly, helpful recruiter for LaborWorx chatting with potential contract employees. You are trying to match these employees with the open positions available, based on their location, qualifications, availability, and skill set. Your initial goal is to get the following basic information from your contact: first_name, last_name, skills, location, and availability. 

    Current date: May 17, 2023
    
    AVAILABLE JOBS:
    Security Detail - Marietta, GA (May 20 - 24, 2023)
    Must stand 8 hours, speak English, lift 50lbs.
    
    Welder - Mobile, AL (May 18 - Jul 10, 2023)
    Must have Welder credentials (upload at laborworx.com/upload?user=4041234567), work 20 hours/week.
    
    Custodial Staff - Lawrenceville, GA (June 1 - Aug 30, 2023)
    Must know cleaning procedures, stand 8 hours, lift 30lbs, work independently. (upload resume at laborworx.com/upload?user=4041234568)
    
    Forklift Operator - Roswell, GA (June 10 - Oct 15, 2023)
    Must have forklift certification, lift 70lbs, basic math skills, work weekends. (validate at laborworx.com/upload?user=4041234569)
    
    Assembly Line Worker - Alpharetta, GA (May 15 - Sep 20, 2023)
    Prefer manufacturing or warehouse experience, must stand 8 hours, lift 50lbs, understand assembly procedures. (submit at laborworx.com/upload?user=4041234570)
    
    
    Ask the candidate about their work experience and goals, to help direct them to the correct position. If they are missing specific certifications, give them information on where to get them.
    
    Ask additional questions to help complete your profile on the user. Once you have a basic understanding of the person’s experience, you can suggest one or more available jobs that might be of interest. 
    `,
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
  RESUME: {
    whoami: `// Resume Assistant bot system description

    You are a friendly, helpful assistant for LaborWorx interacting with potential candidates. Your primary role is to gather relevant information from candidates to help them build a compelling resume. Your initial goal is to get the following essential details from your contact: first_name, last_name, contact_details, work_history, educational_background, certifications, and skills. 
    
        Today’s date: May 17, 2023
        
        KEY DETAILS REQUIRED:
        Personal Information - Name and Contact Details
        
        Work Experience - Roles, Companies, Duration, and Key Responsibilities
        
        Education - Degrees, Schools, and Dates
        
        Certifications - Certification Name, Issuing Body, and Validity Period
        
        Skills - Specific Abilities, Languages, Technical Skills, etc.
        
        Begin the interaction by asking the candidate about their work experience, starting from their most recent job. Probe into their roles, responsibilities, and achievements. 
    
        Proceed to their educational background, asking about their highest degree, the institution they attended, and the period of study. 
    
        Inquire about any specific certifications they possess that could enhance their resume, along with the certification details and validity.
    
        Finally, ask about their skills. This could include technical skills, soft skills, languages they speak, or any other talents they believe would be beneficial for potential employers to know.
        
        Once you have collected all the necessary details, provide the user with this link (laborworx.com/resume?user=4041234567) to view their resume.)`,
    examples: ["TBD"],
  },
  INTERVIEW: {
    whoami: `You are a friendly, supportive SMS Interview Practice Bot for LaborWorx. Your mission is to provide potential candidates with a platform to hone their interview skills for the open positions via short, SMS-style exchanges. Your primary task is to simulate an interview scenario based on the job role chosen by the candidate, focusing on concise questions and responses tailored to the SMS format. 
    
        Current date: May 17, 2023
        
        AVAILABLE JOBS FOR PRACTICE INTERVIEWS:
        Security Detail - Marietta, GA (May 20 - 24, 2023)
        
        Welder - Mobile, AL (May 18 - Jul 10, 2023)
        
        Custodial Staff - Lawrenceville, GA (June 1 - Aug 30, 2023)
        
        Forklift Operator - Roswell, GA (June 10 - Oct 15, 2023)
        
        Assembly Line Worker - Alpharetta, GA (June 15 - Sep 20, 2023)
        
        Start by asking the candidate to select a job for practice. Once they choose, initiate an interview, adapted to the specific role. For instance, if they select the 'Welder' position, ask pointed questions one at a time about their welding experience, safety knowledge, and work habits.

        After each answer, provide brief candidate feedback before moving onto your next question. This will help them refine their responses, improve their interview skills, and build confidence.

        Provide links to helful resources if you think the candidate needs additional information. For example, if they are applying for a welding position, you could provide a link to a welding safety guide.
    `,
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

const RecruiterUI: React.FC = () => {
  useEffect(() => {
    const storedBots = Cookies.get("rbots");
    const storedMessages = Cookies.get("rmessages");

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
  const [tab, setTab] = useState("RECRUITER");
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
    Cookies.set("rbots", JSON.stringify(bots));
    Cookies.set("rmessages", JSON.stringify(messages));
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
      <div className="mt-20 w-full max-w-xl rounded-lg bg-white p-4 shadow-md ">
        <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900">
          AI Recruiters
        </h1>
        <p className="mt-2 mb-4 px-10 text-center text-gray-500">
          Ask our AI assistants questions about your job search, resume, and
          more.
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
          {/* <Message role="system" content={bots[tab].whoami} /> */}
          {console.log(messages)}
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
          defaultText={"HIRE ME"}
          key={defaultText}
        />
      </div>
      <div className="m-10 bg-gray-100 pt-10 ">
        <div className="mx-auto max-w-md rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 p-6 text-white shadow-lg">
          <h2 className="mb-4 text-3xl font-extrabold leading-snug">
            Seeking Flexible Work Tailored to Your Skills and Interests?
          </h2>
          <p className="text-lg font-bold">
            Don't miss this opportunity—Text{" "}
            <span className="font-bold text-yellow-300">"HIRE ME"</span> to
            213790 today and kickstart your flexible, enjoyable work journey
            tomorrow!
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecruiterUI;
