import { GoogleGenAI } from '@google/genai';

export async function runChat(prompt: string) {
  const apiKey = 'api_key';
  const ai = new GoogleGenAI({ apiKey });

  const messages = [
    { role: 'user', content: prompt }
  ];

  const contents = messages.map(msg => ({
    role: msg.role,
    parts: [{ text: msg.content }]
  }));

  const response = await ai.models.generateContentStream({
    model: 'gemini-2.5-flash-preview-04-17',
    config: { responseMimeType: 'text/plain' },
    contents,
  });

  let result = '';
  for await (const chunk of response) {
    result += chunk.text;
  }

  return result;
}
