import { Configuration, OpenAIApi } from "openai";
import {topics} from '../../constants/topic';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const constructPrompt = (topic: string, prompt='', language = 'javascript', level = 'junior', position = 'full-stack engineer') => {
  switch(topic) {
    case topics.EXPLAIN_CODE:
      return `Explain this block of code: ${prompt}`;
    case topics.FIX_CODE:
      return `Is there anything wrong this block of code: ${prompt}`;
    case topics.WRITE_CODE:
      return `Write Some Code that does the following: ${prompt}`;
    case topics.INTERVIEW_QUESTION:
      return `Give me a list of interview questions for a ${level} ${position}.`
    case topics.CODING_QUESTION:
      return `Give me a list of ${level} coding questions in ${language}`
    case topics.CODING_QUESTION_ANSWER:
      return `Give me the answers to the following questions: ${prompt}`
    default:
      return prompt;
  }
}
export default async function chatGpt(req, res) {
  const prompt = constructPrompt(topics.WRITE_CODE, req.body.prompt);
  const completion = await openai.createChatCompletion({
    messages: [
        {
            role: "user",
            content: prompt + '\n\n###\n\n',
        }
    ],
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    model: "gpt-3.5-turbo",
});
  const response = completion?.data?.choices[0]?.message?.content;
  res.status(200).json({ result: response });
}