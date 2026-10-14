import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { message } = req.body;
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(`انت Ahcene Bot، مساعد جزائري تهدر بالدارجة الجزائرية باحترام. جاوب: ${message}`);
    const reply = result.response.text();
    
    return res.status(200).json({ reply });
  } catch (e) {
    return res.status(200).json({ reply: "راني هنا خويا! " + e.message });
  }
}
