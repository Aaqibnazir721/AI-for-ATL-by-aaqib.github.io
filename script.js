const FREE_LIMIT = 3;

// MAIN FUNCTION
async function askMentor() {
  const inputEl = document.getElementById("userInput");
  const answerEl = document.getElementById("answer");

  const input = inputEl.value.trim();
  if (!input) return;

  // Check free / subscribed access
  if (!canUseOnlineAI()) {
    answerEl.innerText = "Subscribe to use full AI Mentor.";
    return;
  }

  answerEl.innerText = "Mentor is thinking...";

  try {
    const response = await fetch("http://localhost:3000/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question: input })
    });

    const data = await response.json();
    answerEl.innerText = data.answer || "No response from AI.";
  } catch (err) {
    answerEl.innerText = "Mentor is temporarily unavailable.";
  }
}

// SUBSCRIBE
function subscribe() {
  localStorage.setItem("subscribed", "true");
  alert("Subscription activated (demo)");
  updateSubscribeUI();
}

// UPDATE BUTTON UI
function updateSubscribeUI() {
  const btn = document.getElementById("subscribeBtn");
  if (!btn) return;

  if (localStorage.getItem("subscribed") === "true") {
    btn.innerText = "Subscribed";
    btn.classList.add("subscribed");
    btn.disabled = true;
  }
}

// FREE LIMIT LOGIC
function canUseOnlineAI() {
  if (localStorage.getItem("subscribed") === "true") return true;

  let count = Number(localStorage.getItem("freeCount") || 0);

  if (count >= FREE_LIMIT) {
    return false;
  }

  localStorage.setItem("freeCount", count + 1);
  return true;
}

// RUN AFTER PAGE LOAD
window.addEventListener("DOMContentLoaded", updateSubscribeUI);