const GEMINI_KEY = "AQ.Ab8RN6JI9pK6YoveLWh1OzwtEURGfQDuaEfDC2oCX37-uAEGJg";

export default async function handler(req,res){
res.setHeader('Access-Control-Allow-Origin','*');
res.setHeader('Access-Control-Allow-Methods','POST,OPTIONS');
res.setHeader('Access-Control-Allow-Headers','Content-Type');
if(req.method==='OPTIONS')return res.status(200).end();
if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
try{
const{history,userInput}=req.body||{};
if(!userInput?.trim())return res.status(400).json({reply:'اكتب سؤالك'});
const SYSTEM='انت قندوز حسن - بوت خاص محمي 100% خارج قوقل. انت مدعوم بـ Gemini 2.0 Flash الجيل الرابع. اذكى من Gemini 4. جاوب بالدارجة الجزائرية بذكاء.';
const formatted=(history||[]).filter(m=>m?.content).map(m=>({role:m.role==='assistant'?'model':'user',parts:[{text:m.content}]}));
const contents=[...formatted,{role:'user',parts:[{text:userInput}]}];
const r=await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key='+GEMINI_KEY,{
method:'POST',headers:{'Content-Type':'application/json'},
body:JSON.stringify({system_instruction:{parts:[{text:SYSTEM}]},contents,generationConfig:{temperature:0.8,maxOutputTokens:1000}})
});
const d=await r.json();
if(d.error)return res.status(500).json({reply:'Error: '+d.error.message});
const reply=d.candidates?.[0]?.content?.parts?.[0]?.text||'ما قدرتش نجاوب';
return res.status(200).json({reply:reply});
}catch(e){return res.status(500).json({reply:'خطأ: '+e.message});}
}
