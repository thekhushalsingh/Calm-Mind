const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const messages = document.getElementById("messages");

function addMessage(text, from = "bot") {
  const div = document.createElement("div");
  div.className = `message ${from}`;
  div.innerHTML = `<span class="bubble">${text}</span>`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userText = input.value.trim();
  if (!userText) return;

  addMessage(userText, "user");
  input.value = "";

  // placeholder bot reply
  const loading = document.createElement("div");
  loading.className = "message bot";
  loading.innerHTML = `<span class="bubble">Typing...</span>`;
  messages.appendChild(loading);
  messages.scrollTop = messages.scrollHeight;

  try {
    const res = await fetch("/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userText }),
    });
    const data = await res.json();
    loading.querySelector(".bubble").innerText = data.reply;
  } catch (err) {
    loading.querySelector(".bubble").innerText =
      "Sorry, something went wrong.";
    console.error("Fetch error:", err);
  }
});
