// Create a new OpenAI API client
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Retrieve the user messages from the request body
const messages = req.body;

if (!messages || !Array.isArray(messages)) {
  res.status(400).json({ error: "Invalid request: messages should be an array" });
  return;
}

// Format the user messages
const openaiMessages = messages.map((message) => ({
  role: message.role,
  content: message.content,
}));

// Call the OpenAI API to generate a response
try {
  const completion = await openai.createChatCompletion({
    messages: openaiMessages,
    temperature: 0.7,
    max_tokens: 1500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    model: "gpt-3.5-turbo",
  });

  // Send the response back to the client
  const response = completion?.data?.choices[0]?.message?.content;
  res.status(200).json({ role: "assistant", content: response });
} catch (error) {
  console.error(error);
  res.status(500).json({ error: "An error occurred while processing the request" });
}