import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { message } = req.body;
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      systemInstruction: "انت Ahcene Bot، مساعد جزائري ذكي يهدر دارجة جزائرية. ذكي بزاف وخفيف الظل."
    });
    const result = await model.generateContent(message);
    return res.status(200).json({ reply: result.response.text() });
  } catch (e) {
    return res.status(200).json({ reply: "ايرور: " + e.message });
  }
}
