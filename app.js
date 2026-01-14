const messages = document.getElementById("messages");
const input = document.getElementById("input");
const sendBtn = document.getElementById("send");

function addMsg(text, isUser) {
  const div = document.createElement("div");
  div.className = "msg " + (isUser ? "user" : "bot");
  div.innerHTML = text.replace(/\n/g, "<br>");
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  input.value = "";
  addMsg(text, true);
  addMsg("⏳...", false);

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();
    messages.lastChild.remove();
    addMsg(data.reply || "❌ لم تصل إجابة", false);

  } catch {
    messages.lastChild.remove();
    addMsg("❌ خطأ في الاتصال", false);
  }
}

sendBtn.onclick = sendMessage;
input.onkeydown = e => {
  if (e.key === "Enter") sendMessage();
};


