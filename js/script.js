// =========================================
// A SECRET QUESTION
// Interactive Story
// =========================================

const screens = document.querySelectorAll(".screen");

// =========================================
// SCREEN SWITCHER
// =========================================

function showScreen(id) {
  screens.forEach((screen) => {
    screen.classList.remove("active");
  });

  const nextScreen = document.getElementById(id);

  if (nextScreen) {
    nextScreen.classList.add("active");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}

// =========================================
// SCREEN 1 — FAKE CHAT
// =========================================

const chatMessages = document.querySelectorAll(".hidden-message");

const chatContinue = document.getElementById("chatContinue");

chatMessages.forEach((message) => {
  const delay = Number(message.dataset.delay);

  setTimeout(() => {
    message.classList.add("show");
  }, delay);
});

setTimeout(() => {
  chatContinue.classList.remove("hidden-action");
}, 4300);

chatContinue.addEventListener("click", () => {
  showScreen("terms-screen");
});

// =========================================
// SCREEN 2 — TERMS & CONDITIONS
// =========================================

const agreeBtn = document.getElementById("agreeBtn");
const disagreeBtn = document.getElementById("disagreeBtn");
const termsMessage = document.getElementById("termsMessage");

let disagreeCount = 0;

disagreeBtn.addEventListener("click", () => {
  disagreeCount++;

  if (disagreeCount === 1) {
    termsMessage.textContent = "Hmm... interesting choice. 🤨";
  }

  if (disagreeCount === 2) {
    termsMessage.textContent = "That option appears to be unavailable. 😭";
  }

  if (disagreeCount >= 3) {
    termsMessage.textContent = "Please stop fighting the system. 😂";
  }

  // Make the button playfully move
  const maxX = 80;
  const maxY = 25;

  const randomX = Math.floor(Math.random() * (maxX * 2 + 1)) - maxX;

  const randomY = Math.floor(Math.random() * (maxY * 2 + 1)) - maxY;

  disagreeBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
});

agreeBtn.addEventListener("click", () => {
  showScreen("mission-screen");
});

// =========================================
// SCREEN 3 — SECRET MISSION
// =========================================

const secretObjects = document.querySelectorAll(".secret-object");

const missionMessage = document.getElementById("missionMessage");

const missionContinue = document.getElementById("missionContinue");

let foundSecret = false;

secretObjects.forEach((object) => {
  object.addEventListener("click", () => {
    const type = object.dataset.object;

    if (type === "lock") {
      missionMessage.textContent =
        "🔐 Nope. Too obvious. Try something else. 👀";
    } else if (type === "flower") {
      missionMessage.textContent = "🌷 Pretty... but this isn't the secret.";
    } else if (type === "letter") {
      foundSecret = true;

      missionMessage.innerHTML =
        "💌 <strong>You found the clue.</strong><br>" +
        "Sometimes the obvious thing is exactly where you should look.";

      missionContinue.classList.remove("hidden");
    }
  });
});

missionContinue.addEventListener("click", () => {
  showScreen("final-chat-screen");

  startFinalChat();
});

// =========================================
// SCREEN 4 — FINAL CHAT
// =========================================

let finalChatStarted = false;

function startFinalChat() {
  if (finalChatStarted) return;

  finalChatStarted = true;

  const typing = document.getElementById("typing");

  const realQuestionBtn = document.getElementById("realQuestionBtn");

  setTimeout(() => {
    typing.style.display = "none";
  }, 1800);

  setTimeout(() => {
    realQuestionBtn.classList.remove("hidden");
  }, 2200);
}

document.getElementById("realQuestionBtn").addEventListener("click", () => {
  showScreen("question-screen");
});

// =========================================
// SCREEN 5 — FINAL QUESTION
// =========================================

const yesBtn = document.getElementById("yesBtn");

const obviouslyBtn = document.getElementById("obviouslyBtn");

yesBtn.addEventListener("click", showResult);

obviouslyBtn.addEventListener("click", showResult);

// =========================================
// SCREEN 6 — RESULT
// =========================================

function showResult() {
  showScreen("result-screen");

  const video = document.querySelector(".gif-result");

  if (video) {
    video.play().catch(() => {});
  }

  createCelebration();
}

// =========================================
// HEART CELEBRATION
// =========================================

function createCelebration() {
  const container = document.getElementById("celebrationHearts");

  const hearts = ["❤️", "💗", "💖", "💕", "💞", "💓", "🌷", "✨"];

  for (let i = 0; i < 30; i++) {
    const heart = document.createElement("span");

    heart.classList.add("celebration-heart");

    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

    heart.style.left = `${Math.random() * 100}%`;

    heart.style.animationDelay = `${Math.random() * 1.5}s`;

    heart.style.fontSize = `${1 + Math.random() * 1.4}rem`;

    container.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 4500);
  }
}
