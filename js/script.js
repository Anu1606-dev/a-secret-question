document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     PAGE NAVIGATION
  ========================================================= */

  const pages = [
    "decision",
    "declaration",
    "terms",
    "registration",
    "certificate",
    "party",
    "gift",
  ];

  function showPage(pageName) {
    pages.forEach((page) => {
      const section = document.getElementById(`page-${page}`);

      if (section) {
        section.classList.toggle("active", page === pageName);
      }
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /* =========================================================
     ELEMENTS
  ========================================================= */

  const currentDate = document.getElementById("currentDate");
  const currentTime = document.getElementById("currentTime");

  const obviouslyYes = document.getElementById("obviouslyYes");
  const letMeBreathe = document.getElementById("letMeBreathe");
  const decisionWarning = document.getElementById("decisionWarning");

  const declarationContinue =
    document.getElementById("declarationContinue");

  const agreeTerms = document.getElementById("agreeTerms");
  const disagreeTerms = document.getElementById("disagreeTerms");
  const termsMessage = document.getElementById("termsMessage");

  const fullName = document.getElementById("fullName");
  const nameMessage = document.getElementById("nameMessage");

  const fingerprintBtn =
    document.getElementById("fingerprintBtn");

  const scanProgress =
    document.getElementById("scanProgress");

  const progressFill =
    document.getElementById("progressFill");

  const scanText =
    document.getElementById("scanText");

  const fingerprintMessage =
    document.getElementById("fingerprintMessage");

  const finalizeBtn =
    document.getElementById("finalizeBtn");

  const certificateDate =
    document.getElementById("certificateDate");

  const confettiContainer =
    document.getElementById("confettiContainer");

  const giftReveal =
    document.getElementById("giftReveal");

  const openGift =
    document.getElementById("openGift");

  const kissContainer =
    document.getElementById("kissContainer");

  const kissMessage =
    document.getElementById("kissMessage");


  /* =========================================================
     LIVE DATE + TIME
  ========================================================= */

  function updateDateTime() {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();

    currentDate.textContent = `${day}.${month}.${year}`;

    currentTime.textContent = now.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  }

  // Show immediately when page opens
  updateDateTime();

  // Keep the clock updated
  setInterval(updateDateTime, 1000);


  /* =========================================================
     PAGE 1 — BIG DECISION
  ========================================================= */

  obviouslyYes.addEventListener("click", () => {
    showPage("declaration");
  });


  /* =========================================================
     MOVING "LET ME BREATHE" BUTTON
  ========================================================= */

  const decisionMessages = [
    "NO!! You should have thought about this earlier! 😭",
    "WE WILL DO IT RIGHT NOW!! 💍",
    "There is no escape route. 🙂",
    "Nice try. Now press the correct button. ❤️",
    "You cannot escape Anushka. 😌",
  ];

  function moveDecisionButton() {
    const button = letMeBreathe;

    if (!button) return;

    button.style.position = "fixed";
    button.style.zIndex = "9999";

    const rect = button.getBoundingClientRect();

    const margin = 15;

    const maxX = Math.max(
      margin,
      window.innerWidth - rect.width - margin
    );

    const maxY = Math.max(
      margin,
      window.innerHeight - rect.height - margin
    );

    const randomX =
      margin + Math.random() * (maxX - margin);

    const randomY =
      margin + Math.random() * (maxY - margin);

    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;

    const randomMessage =
      decisionMessages[
        Math.floor(Math.random() * decisionMessages.length)
      ];

    decisionWarning.textContent = randomMessage;
  }

  letMeBreathe.addEventListener(
    "mouseenter",
    moveDecisionButton
  );

  letMeBreathe.addEventListener(
    "touchstart",
    (event) => {
      event.preventDefault();
      moveDecisionButton();
    },
    { passive: false }
  );

  letMeBreathe.addEventListener(
    "click",
    (event) => {
      event.preventDefault();
      moveDecisionButton();
    }
  );


  /* =========================================================
     PAGE 2 — DECLARATION
  ========================================================= */

  declarationContinue.addEventListener("click", () => {
    showPage("terms");
  });


  /* =========================================================
     PAGE 3 — TERMS & CONDITIONS
  ========================================================= */

  const termsMessages = [
    "I DISAGREE is currently unavailable. 😌",
    "That button has resigned from its position.",
    "Please select the only legally acceptable option. ❤️",
    "Nice attempt. Try agreeing. 💍",
    "Nope. That option does not exist anymore. 😂",
  ];

  function moveDisagreeButton() {
    const button = disagreeTerms;

    if (!button) return;

    button.style.position = "fixed";
    button.style.zIndex = "9999";

    const rect = button.getBoundingClientRect();

    const margin = 15;

    const maxX = Math.max(
      margin,
      window.innerWidth - rect.width - margin
    );

    const maxY = Math.max(
      margin,
      window.innerHeight - rect.height - margin
    );

    const randomX =
      margin + Math.random() * (maxX - margin);

    const randomY =
      margin + Math.random() * (maxY - margin);

    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;

    const randomMessage =
      termsMessages[
        Math.floor(Math.random() * termsMessages.length)
      ];

    termsMessage.textContent = randomMessage;
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


  agreeTerms.addEventListener("click", () => {
    showPage("registration");
  });


  /* =========================================================
     PAGE 4 — NAME VERIFICATION
  ========================================================= */

  const correctName = "debangan paulchowdhury";

  let nameVerified = false;
  let fingerprintVerified = false;
  let scanning = false;

  function normalizeName(value) {
    return value
      .trim()
      .replace(/\s+/g, " ")
      .toLowerCase();
  }

  function checkFinalButton() {
    if (
      nameVerified &&
      fingerprintVerified &&
      !scanning
    ) {
      finalizeBtn.classList.remove("hidden");
    } else {
      finalizeBtn.classList.add("hidden");
    }
  }

  fullName.addEventListener("input", () => {
    const enteredName = normalizeName(fullName.value);

    if (enteredName === "") {
      nameVerified = false;
      nameMessage.textContent = "";
    } else if (enteredName === correctName) {
      nameVerified = true;

      nameMessage.textContent =
        "Identity verified. That is definitely him. 😌❤️";
    } else {
      nameVerified = false;

      nameMessage.textContent =
        "Hmm... that does not match the groom's registered name. 👀";
    }

    checkFinalButton();
  });


  /* =========================================================
     PAGE 4 — FINGERPRINT SCAN
  ========================================================= */

  fingerprintBtn.addEventListener("click", () => {
    if (scanning || fingerprintVerified) {
      return;
    }

    scanning = true;

    fingerprintBtn.classList.add("scanning");

    scanProgress.classList.remove("hidden");

    fingerprintMessage.textContent = "";

    progressFill.style.width = "0%";

    checkFinalButton();

    let progress = 0;

    const scanMessages = [
      "Reading fingerprint...",
      "Analyzing fingerprint...",
      "Comparing identity...",
      "Checking husband database...",
      "Checking Anushka's approval...",
      "Almost done...",
      "Verification complete. ❤️",
    ];

    const scanInterval = setInterval(() => {
      progress += 4;

      if (progress > 100) {
        progress = 100;
      }

      progressFill.style.width = `${progress}%`;

      const messageIndex = Math.min(
        Math.floor(progress / 16),
        scanMessages.length - 1
      );

      scanText.textContent =
        scanMessages[messageIndex];

      if (progress >= 100) {
        clearInterval(scanInterval);

        scanning = false;
        fingerprintVerified = true;

        fingerprintBtn.classList.remove("scanning");

        fingerprintBtn.disabled = true;

        fingerprintBtn.innerHTML = `
          <span>✅</span>
          <small>VERIFIED</small>
        `;

        fingerprintMessage.textContent =
          "Fingerprint accepted. Your fate is now officially sealed. 💍";

        checkFinalButton();
      }
    }, 100);
  });


  /* =========================================================
     PAGE 4 → PAGE 5
     FINALIZE MARRIAGE
  ========================================================= */

  finalizeBtn.addEventListener("click", () => {
    if (!nameVerified || !fingerprintVerified) {
      return;
    }

    const now = new Date();

    const dateText = now.toLocaleDateString(
      undefined,
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );

    const timeText = now.toLocaleTimeString(
      undefined,
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }
    );

    certificateDate.textContent =
      `Registered on ${dateText} at ${timeText}`;

    showPage("certificate");


    /* =====================================================
       CERTIFICATE → PARTY
    ===================================================== */

    setTimeout(() => {
      showPage("party");

      createConfetti();

      /* ================================================
         SHOW GIFT AFTER A SHORT DELAY
      ================================================= */

      setTimeout(() => {
        giftReveal.classList.remove("hidden");
      }, 1200);

    }, 3500);
  });


  /* =========================================================
     PAGE 6 — OPEN GIFT
  ========================================================= */

  openGift.addEventListener("click", () => {
    showPage("gift");

    createKisses();

    /* Message appears after 2 seconds */

    setTimeout(() => {
      kissMessage.classList.remove("hidden");
    }, 2000);
  });


  /* =========================================================
     CONFETTI
  ========================================================= */

  function createConfetti() {
    confettiContainer.innerHTML = "";

    const numberOfPieces = 90;

    for (let i = 0; i < numberOfPieces; i++) {
      const piece = document.createElement("span");

      piece.className = "confetti";

      piece.style.left =
        `${Math.random() * 100}%`;

      piece.style.animationDuration =
        `${2.5 + Math.random() * 2.5}s`;

      piece.style.animationDelay =
        `${Math.random() * 1.5}s`;

      piece.style.setProperty(
        "--drift",
        `${-120 + Math.random() * 240}px`
      );

      /*
        Only decorative colors.
        Red + gold matches the wedding theme.
      */

      piece.style.background =
        Math.random() > 0.5
          ? "#8f1d2c"
          : "#b58a3b";

      piece.style.transform =
        `rotate(${Math.random() * 360}deg)`;

      confettiContainer.appendChild(piece);
    }
  }


  /* =========================================================
     PAGE 7 — FLOATING KISSES
  ========================================================= */

  function createKisses() {
    kissContainer.innerHTML = "";

    const kissEmojis = [
      "💋",
      "❤️",
      "💕",
      "💖",
      "💗",
      "😘",
      "💋",
    ];

    const numberOfKisses = 45;

    for (let i = 0; i < numberOfKisses; i++) {
      const kiss = document.createElement("span");

      kiss.className = "kiss";

      kiss.textContent =
        kissEmojis[
          Math.floor(
            Math.random() * kissEmojis.length
          )
        ];

      kiss.style.left =
        `${Math.random() * 100}%`;

      kiss.style.animationDuration =
        `${4 + Math.random() * 5}s`;

      kiss.style.animationDelay =
        `${Math.random() * 3}s`;

      kiss.style.fontSize =
        `${1.1 + Math.random() * 1.3}rem`;

      kissContainer.appendChild(kiss);
    }
  }


  /* =========================================================
     START ON PAGE 1
  ========================================================= */

  showPage("decision");
});