import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  // IMPORT OPENAI_API_KEY FROM .ENV
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: req.body.prompt + '\n\n###\n\n',
    max_tokens: 3000,
    temperature: 0,
    top_p: 1.0,
    frequency_penalty: 0,
    presence_penalty: 0.0,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}
