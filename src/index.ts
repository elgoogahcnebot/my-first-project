export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function sendMessage(history: ChatMessage[], userInput: string) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ history, userInput })
  });
  return response.json();
}

if (typeof window !== 'undefined') {
  const input = document.querySelector('#chat-input') as HTMLInputElement;
  const btn = document.querySelector('#send-btn');
  const box = document.querySelector('#chat-box');

  async function handleSend() {
    if (!input || !input.value.trim()) return;
    const text = input.value;
    input.value = '';
    if (box) box.innerHTML += `<div class='user'>${text}</div>`;
    const data = await sendMessage([], text);
    if (box) box.innerHTML += `<div class='ai'>${data.reply}</div>`;
  }

  btn?.addEventListener('click', handleSend);
  input?.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSend(); });
}
