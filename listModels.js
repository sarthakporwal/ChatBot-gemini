import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = "AIzaSyBT5CaPUr5iN2bqfWESgIzL3lu2YTPODbM";

async function listModels() {
  const genAI = new GoogleGenerativeAI(API_KEY);

  try {
    const models = await genAI.listModels();
    console.log("Available models:", models);
  } catch (error) {
    console.error("Error listing models:", error);
  }
}

listModels();
