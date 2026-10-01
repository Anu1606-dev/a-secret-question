/* =========================================================
   A SECRET QUESTION
   Bengali Registry Marriage Edition
   script.js
   ========================================================= */


/* =========================================================
   1. PAGE NAVIGATION
   ========================================================= */

const pages = {
  decision: document.getElementById("page-decision"),
  declaration: document.getElementById("page-declaration"),
  terms: document.getElementById("page-terms"),
  registration: document.getElementById("page-registration"),
  certificate: document.getElementById("page-certificate"),
  party: document.getElementById("page-party"),
  gift: document.getElementById("page-gift"),
};


function showPage(page) {
  Object.values(pages).forEach((currentPage) => {
    currentPage.classList.remove("active");
  });

  page.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}


/* =========================================================
   2. CURRENT DATE
   ========================================================= */

const currentDateElement = document.getElementById("currentDate");

function setCurrentDate() {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  currentDateElement.textContent = `${day}.${month}.${year}`;
}

setCurrentDate();


/* =========================================================
   3. PAGE 1 — "LET ME BREATHE" BUTTON
   ========================================================= */

const obviouslyYes = document.getElementById("obviouslyYes");
const letMeBreathe = document.getElementById("letMeBreathe");
const decisionWarning = document.getElementById("decisionWarning");

const decisionMessages = [
  "NO!! You should have thought about this earlier! 😭",
  "Too late. WE WILL DO IT RIGHT NOW!! 💍",
  "You cannot escape Anushka's decisions. 😌",
  "Nice try. But absolutely NO. 😂",
  "The registry office has already been informed. 👀",
  "Sir, please stop trying to escape. 💀",
  "This button is unfortunately unavailable. ❤️",
  "You really thought that would work? 😭",
];

let escapeCount = 0;


/*
 * Move the button somewhere inside the visible screen.
 */
function moveBreatheButton() {
  const button = letMeBreathe;

  const buttonWidth = button.offsetWidth;
  const buttonHeight = button.offsetHeight;

  const padding = 20;

  const maxX =
    window.innerWidth - buttonWidth - padding;

  const maxY =
    window.innerHeight - buttonHeight - padding;

  const randomX =
    Math.max(
      padding,
      Math.floor(Math.random() * maxX)
    );

  const randomY =
    Math.max(
      padding,
      Math.floor(Math.random() * maxY)
    );

  button.style.position = "fixed";
  button.style.left = `${randomX}px`;
  button.style.top = `${randomY}px`;

  button.style.zIndex = "9999";

  escapeCount++;

  decisionWarning.textContent =
    decisionMessages[
      (escapeCount - 1) % decisionMessages.length
    ];
}


/*
 * Desktop users:
 * move before they can click it.
 */
letMeBreathe.addEventListener(
  "mouseenter",
  moveBreatheButton
);


/*
 * Mobile users:
 * touching the button should also make it escape.
 */
letMeBreathe.addEventListener(
  "touchstart",
  (event) => {
    event.preventDefault();
    moveBreatheButton();
  },
  { passive: false }
);


/*
 * Just in case someone somehow manages to click it.
 */
letMeBreathe.addEventListener("click", (event) => {
  event.preventDefault();

  moveBreatheButton();
});


/* =========================================================
   4. PAGE 1 → PAGE 2
   ========================================================= */

obviouslyYes.addEventListener("click", () => {
  showPage(pages.declaration);
});


/* =========================================================
   5. PAGE 2 → PAGE 3
   ========================================================= */

const declarationContinue =
  document.getElementById("declarationContinue");

declarationContinue.addEventListener("click", () => {
  showPage(pages.terms);
});


/* =========================================================
   6. PAGE 3 — TERMS & CONDITIONS
   ========================================================= */

const agreeTerms =
  document.getElementById("agreeTerms");

const disagreeTerms =
  document.getElementById("disagreeTerms");

const termsMessage =
  document.getElementById("termsMessage");


const termsMessages = [
  "Disagreement detected. Nice try. 😌",
  "Unfortunately, this option is not available.",
  "The bride has rejected your request. 😂",
  "Sir, please read the terms again. ❤️",
  "There is no escape from this marriage. 💍",
];


let termsEscapeCount = 0;


/*
 * Make the DISAGREE button escape.
 */
function moveDisagreeButton() {
  const button = disagreeTerms;

  const buttonWidth = button.offsetWidth;
  const buttonHeight = button.offsetHeight;

  const padding = 15;

  const maxX =
    window.innerWidth - buttonWidth - padding;

  const maxY =
    window.innerHeight - buttonHeight - padding;

  const randomX =
    Math.max(
      padding,
      Math.floor(Math.random() * maxX)
    );

  const randomY =
    Math.max(
      padding,
      Math.floor(Math.random() * maxY)
    );

  button.style.position = "fixed";
  button.style.left = `${randomX}px`;
  button.style.top = `${randomY}px`;

  button.style.zIndex = "9999";

  termsEscapeCount++;

  termsMessage.textContent =
    termsMessages[
      (termsEscapeCount - 1) %
        termsMessages.length
    ];
}


disagreeTerms.addEventListener(
  "mouseenter",
  moveDisagreeButton
);


disagreeTerms.addEventListener(
  "touchstart",
  (event) => {
    event.preventDefault();
    moveDisagreeButton();
  },
  { passive: false }
);


disagreeTerms.addEventListener(
  "click",
  (event) => {
    event.preventDefault();
    moveDisagreeButton();
  }
);


/*
 * Agree → Registration
 */
agreeTerms.addEventListener("click", () => {
  showPage(pages.registration);
});


/* =========================================================
   7. PAGE 4 — NAME VERIFICATION
   ========================================================= */

const fullNameInput =
  document.getElementById("fullName");

const nameMessage =
  document.getElementById("nameMessage");

const fingerprintBtn =
  document.getElementById("fingerprintBtn");

const fingerprintMessage =
  document.getElementById("fingerprintMessage");

const scanProgress =
  document.getElementById("scanProgress");

const scanText =
  document.getElementById("scanText");

const finalizeBtn =
  document.getElementById("finalizeBtn");


const correctName =
  "Debangan Paulchowdhury";


let nameVerified = false;
let fingerprintVerified = false;
let scanning = false;


/*
 * Normalize names so accidental extra spaces
 * or capitalization differences don't cause failure.
 */
function normalizeName(name) {
  return name
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}


fullNameInput.addEventListener("input", () => {
  const enteredName = normalizeName(
    fullNameInput.value
  );

  if (!enteredName) {
    nameMessage.textContent = "";
    nameVerified = false;
    updateFinalizeButton();
    return;
  }

  if (
    enteredName ===
    normalizeName(correctName)
  ) {
    nameVerified = true;

    nameMessage.textContent =
      "✓ Identity verified. Welcome, Mr. Husband. 😌";

    nameMessage.style.color =
      "#6b7d48";
  } else {
    nameVerified = false;

    nameMessage.textContent =
      "Hmm... that is not the registered groom. 👀";

    nameMessage.style.color =
      "#8f1d2c";
  }

  updateFinalizeButton();
});


/* =========================================================
   8. FINGERPRINT SCANNER
   ========================================================= */

fingerprintBtn.addEventListener("click", () => {

  if (scanning || fingerprintVerified) {
    return;
  }

  scanning = true;

  fingerprintBtn.classList.add("scanning");

  fingerprintBtn.disabled = true;

  scanProgress.classList.remove("hidden");

  scanText.textContent =
    "Scanning fingerprint...";


  /*
   * Fake scanning sequence
   */
  setTimeout(() => {
    scanText.textContent =
      "Reading biometric information... 🖐️";
  }, 700);


  setTimeout(() => {
    scanText.textContent =
      "Comparing with husband database... 👀";
  }, 1400);


  setTimeout(() => {
    scanText.textContent =
      "Identity confirmed. ❤️";
  }, 2000);


  setTimeout(() => {

    fingerprintVerified = true;
    scanning = false;

    fingerprintBtn.classList.remove(
      "scanning"
    );

    fingerprintBtn.innerHTML = `
      <span>✓</span>
      <small>VERIFIED</small>
    `;

    fingerprintBtn.style.borderStyle =
      "solid";

    fingerprintBtn.style.background =
      "rgba(107, 125, 72, 0.10)";

    fingerprintMessage.textContent =
      "✓ Fingerprint accepted. The registry office approves. 💍";

    fingerprintMessage.style.color =
      "#6b7d48";

    updateFinalizeButton();

  }, 2400);
});


/* =========================================================
   9. ENABLE FINALIZE BUTTON
   ========================================================= */

function updateFinalizeButton() {

  if (
    nameVerified &&
    fingerprintVerified
  ) {
    finalizeBtn.classList.remove("hidden");
  } else {
    finalizeBtn.classList.add("hidden");
  }

}


/* =========================================================
   10. FINALIZE MARRIAGE
   ========================================================= */

finalizeBtn.addEventListener("click", () => {

  showPage(pages.certificate);

  /*
   * Small delay makes the certificate feel
   * like it is being officially processed.
   */
  setTimeout(() => {
    showPage(pages.party);

    startConfetti();

    /*
     * Gift appears after approximately 1 second.
     */
    setTimeout(() => {
      const giftReveal =
        document.getElementById("giftReveal");

      giftReveal.classList.remove("hidden");
    }, 1200);

  }, 3500);

});


/* =========================================================
   11. CONFETTI
   ========================================================= */

const confettiContainer =
  document.getElementById(
    "confettiContainer"
  );


const celebrationPieces = [
  "❤️",
  "💖",
  "💕",
  "💍",
  "🌸",
  "✨",
  "🎉",
  "🎊",
  "🌺",
  "🤍",
];


function createConfettiPiece() {

  const piece =
    document.createElement("span");

  piece.classList.add("confetti");

  piece.textContent =
    celebrationPieces[
      Math.floor(
        Math.random() *
        celebrationPieces.length
      )
    ];

  piece.style.left =
    `${Math.random() * 100}%`;

  piece.style.animationDuration =
    `${3 + Math.random() * 4}s`;

  piece.style.animationDelay =
    `${Math.random() * 1.5}s`;

  piece.style.fontSize =
    `${0.8 + Math.random() * 1.2}rem`;

  confettiContainer.appendChild(piece);


  /*
   * Remove after animation.
   */
  setTimeout(() => {
    piece.remove();
  }, 8000);
}


function startConfetti() {

  /*
   * Initial burst.
   */
  for (let i = 0; i < 45; i++) {
    setTimeout(() => {
      createConfettiPiece();
    }, i * 40);
  }


  /*
   * Continue gentle celebration.
   */
  const celebrationInterval =
    setInterval(() => {

      for (let i = 0; i < 5; i++) {
        createConfettiPiece();
      }

    }, 700);


  /*
   * Stop after 10 seconds.
   */
  setTimeout(() => {
    clearInterval(
      celebrationInterval
    );
  }, 10000);

}


/* =========================================================
   12. PAGE 6 → GIFT
   ========================================================= */

const openGift =
  document.getElementById("openGift");


openGift.addEventListener("click", () => {

  showPage(pages.gift);

  startKisses();

  /*
   * The final message waits 2 seconds.
   */
  setTimeout(() => {

    const kissMessage =
      document.getElementById(
        "kissMessage"
      );

    kissMessage.classList.remove(
      "hidden"
    );

  }, 2000);

});


/* =========================================================
   13. FLOATING KISSES
   ========================================================= */

const kissContainer =
  document.getElementById(
    "kissContainer"
  );


const kissEmojis = [
  "💋",
  "💋",
  "💋",
  "❤️",
  "💕",
  "💖",
];


function createKiss() {

  const kiss =
    document.createElement("span");

  kiss.classList.add("kiss");

  kiss.textContent =
    kissEmojis[
      Math.floor(
        Math.random() *
        kissEmojis.length
      )
    ];

  kiss.style.left =
    `${Math.random() * 100}%`;

  kiss.style.animationDuration =
    `${4 + Math.random() * 4}s`;

  kiss.style.fontSize =
    `${1.2 + Math.random() * 1.5}rem`;

  kissContainer.appendChild(kiss);


  setTimeout(() => {
    kiss.remove();
  }, 9000);

}


function startKisses() {

  /*
   * Start with a little burst.
   */
  for (let i = 0; i < 20; i++) {

    setTimeout(() => {
      createKiss();
    }, i * 120);

  }


  /*
   * Keep kisses floating.
   */
  setInterval(() => {
    createKiss();
  }, 500);

}


/* =========================================================
   14. PREVENT ACCIDENTAL FORM SUBMISSION
   ========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    /*
     * Enter inside the name input
     * should not reload the page.
     */
    if (
      event.key === "Enter" &&
      document.activeElement ===
        fullNameInput
    ) {
      event.preventDefault();
    }

  }
);


/* =========================================================
   15. INITIAL STATE
   ========================================================= */

showPage(pages.decision);

console.log(
  "💍 Registry Marriage System initialized."
);

console.log(
  "Bride: Ms. Anushka Sarkar ❤️"
);

console.log(
  "Groom: Mr. Debangan Paulchowdhury 💍"
);