
// To run this code you need to install the following dependencies:
// npm install @google/generative-ai dotenv

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import process from 'process'; // Import process for environment variables and stdout

// Load environment variables from .env file if it exists
dotenv.config();

async function generate() {
    // Access your API key as an environment variable
    const apiKey = "AIzaSyBT5CaPUr5iN2bqfWESgIzL3lu2YTPODbM";

    if (!apiKey) {
        console.error("GEMINI_API_KEY environment variable not set.");
        process.exit(1); // Exit if the API key is not found
    }

    // Initialize the Generative AI client
    const genAI = new GoogleGenerativeAI(apiKey);

    // Specify the model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-04-17" });

    // Define the content for the prompt
    const promptText = "Generate a simple \"Hello, World!\" program in Javascript. Provide only the code, no explanation.";

    const contents = [
        {
            role: "user",
            parts: [
                { text: promptText },
            ],
        },
    ];

    // Define generation configuration
    const generationConfig = {
        responseMimeType: "text/plain",
    };

    console.log("Streaming response:");

    try {
        // Call the model's streaming method
        const streamingResult = await model.generateContentStream({
            contents: contents,
            generationConfig: generationConfig,
        });

        // Iterate over the streamed chunks and print the text
        for await (const chunk of streamingResult.stream) {
            // Use process.stdout.write to print without adding a newline at the end,
            // similar to Python's print(..., end="")
            process.stdout.write(chunk.text());
        }
        console.log(); // Print a final newline after the stream ends

    } catch (error) {
        console.error("Error generating content:", error);
    }
}

// Run the async generate function
generate();