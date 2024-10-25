import OpenAI from "openai/index.mjs";
import openaiKey from "../env";

// Create a new instance of the OpenAI class
const openai = new OpenAI({apiKey: openaiKey });
// Create a function that sends a message to the OpenAI API
export default async function SendMessage(messageArray) {
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: messageArray,
    });

    // Extract the AI's reply from the response
    const result = response.choices[0]?.message?.content || "";
    // Return the AI's reply
    return { role: "assistant", content: result };
}