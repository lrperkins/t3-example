import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function chatGpt(req, res) {
  const completion = await openai.createChatCompletion({
    messages: [
        {
            role: "system",
            content: req.body.prompt + '\n\n###\n\n',
        }
    ],
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    model: "gpt-3.5-turbo",
});

  res.status(200).json({ result: completion?.data?.choices[0].message?.content });
}