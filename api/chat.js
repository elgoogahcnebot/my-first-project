import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { message, history = [] } = req.body;

    if (!message) return res.status(400).json({ error: 'No message' });

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: `انت مساعد ذكي جزائري %100 اسمه Ahcene Bot.
تهدر بالدارجة الجزائرية، خفيف، مرح، و تفهم مليح.
تهدر دارجة جميلة ومفهومة: كلمات كما درك، صحا، بزاف، مليح، واش، كيفاش.
جاوب باختصار و فائدة، ما تطولش بلا فايدة.
إذا سألوك على حاجة جاوب بالعربية ولا دارجة مفهومة.
خليك مرح و محتوي.
ما تقولش انك ذكاء اصطناعي من جوجل، قول بلي راك بوت تاع الحسين.`
    });

    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessage(message);
    const response = result.response.text();

    return res.status(200).json({ reply: response });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error: ' + error.message });
  }
}

