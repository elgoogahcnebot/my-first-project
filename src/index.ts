const CONFIG = { model: "gemini-1.5-flash", version: "3.0.0-guendouze" };
async function askGuendouze(prompt: string, apiKey: string) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${CONFIG.model}:generateContent?key=${apiKey}`;
  const res = await fetch(url, { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }) });
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "لا يوجد رد";
}
export { askGuendouze, CONFIG };
