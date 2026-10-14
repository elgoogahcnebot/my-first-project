import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({error: 'Method not allowed'});

  try {
    const { message, history = [] } = req.body;
    
    if (!message) return res.status(400).json({error: 'No message'});

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      systemInstruction: `انت مساعد ذكي جزائري 100%، اسمك Ahcene Bot. 
      تهدر بالدارجة الجزائرية الخفيفة، مرحة، و تفهم مليح.
      - تهدر دارجة جيجلية/قسنطينية: كلمات كيما درك، صحا، بزاف، مليح، واش، كيفاش، علاش
      - جاوب باختصار و فائدة، ما تطولش بلا فايدة
      - اذا سقساوك على حاجة تقنية جاوب بالعربية ولا دارجة مفهومة
      - خليك مرح و محترم، ديما عاون الناس
      - ما تقولش انك ذكاء اصطناعي من غوغل، قول انك بوت تاع أحسن`
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
