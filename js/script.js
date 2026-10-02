document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     CONFIG
  ========================================================= */

  const CORRECT_NAME = "debanganpaulchowdhury";


  /* =========================================================
     PAGE REFERENCES
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


  /* =========================================================
     ELEMENT REFERENCES
  ========================================================= */

  const currentDate = document.getElementById("currentDate");
  const currentTime = document.getElementById("currentTime");

  const obviouslyYes = document.getElementById("obviouslyYes");
  const letMeBreathe = document.getElementById("letMeBreathe");
  const decisionWarning = document.getElementById("decisionWarning");

  const declarationContinue =
    document.getElementById("declarationContinue");

  const agreeTerms =
    document.getElementById("agreeTerms");

  const disagreeTerms =
    document.getElementById("disagreeTerms");

  const termsMessage =
    document.getElementById("termsMessage");

  const fullName =
    document.getElementById("fullName");

  const nameMessage =
    document.getElementById("nameMessage");

  const fingerprintBtn =
    document.getElementById("fingerprintBtn");

  const scanProgress =
    document.getElementById("scanProgress");

  const scanText =
    document.getElementById("scanText");

  const fingerprintMessage =
    document.getElementById("fingerprintMessage");

  const finalizeBtn =
    document.getElementById("finalizeBtn");

  const giftReveal =
    document.getElementById("giftReveal");

  const openGift =
    document.getElementById("openGift");

  const kissContainer =
    document.getElementById("kissContainer");

  const kissMessage =
    document.getElementById("kissMessage");

  const confettiContainer =
    document.getElementById("confettiContainer");


  /* =========================================================
     STATE
  ========================================================= */

  let currentPage = "decision";

  let nameVerified = false;
  let fingerprintVerified = false;
  let fingerprintScanning = false;

  let partyStarted = false;
  let giftOpened = false;

  let certificateTimestamp = null;


  /* =========================================================
     PAGE NAVIGATION
  ========================================================= */

  function showPage(pageName) {
    Object.values(pages).forEach((page) => {
      if (!page) return;

      page.classList.remove("active");
      page.setAttribute("aria-hidden", "true");
    });

    const targetPage = pages[pageName];

    if (!targetPage) return;

    targetPage.classList.add("active");
    targetPage.setAttribute("aria-hidden", "false");

    currentPage = pageName;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }


  /* =========================================================
     CURRENT DATE + TIME
  ========================================================= */

  function updateDateTime() {
    const now = new Date();

    if (currentDate) {
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();

      currentDate.textContent =
        `${day}.${month}.${year}`;
    }

    if (currentTime) {
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      currentTime.textContent =
        `${hours}:${minutes}:${seconds}`;
    }
  }

  updateDateTime();

  setInterval(updateDateTime, 1000);


  /* =========================================================
     PAGE 1 — DECISION
  ========================================================= */

  if (obviouslyYes) {
    obviouslyYes.addEventListener("click", () => {
      showPage("declaration");
    });
  }


  /* =========================================================
     MOVING "LET ME BREATHE" BUTTON
  ========================================================= */

  function moveBreathingButton() {
    if (!letMeBreathe) return;

    const buttonRect =
      letMeBreathe.getBoundingClientRect();

    const padding = 20;

    const maxX =
      Math.max(
        padding,
        window.innerWidth -
          buttonRect.width -
          padding
      );

    const maxY =
      Math.max(
        padding,
        window.innerHeight -
          buttonRect.height -
          padding
      );

    const randomX =
      Math.floor(
        Math.random() * maxX
      );

    const randomY =
      Math.floor(
        Math.random() * maxY
      );

    letMeBreathe.style.position = "fixed";
    letMeBreathe.style.left = `${randomX}px`;
    letMeBreathe.style.top = `${randomY}px`;
    letMeBreathe.style.zIndex = "9999";

    if (decisionWarning) {
      const messages = [
        "NO!! You should have thought about it earlier! 😭",
        "WE WILL DO IT RIGHT NOW!! 💍",
        "There is no escape. 😌",
        "Nice try. 😂",
        "Absolutely not.",
        "Too late now. ❤️",
        "The registry office has decided. 😭",
        "Sir, please cooperate. 💍",
        "You cannot escape your destiny. 😂",
      ];

      decisionWarning.textContent =
        messages[
          Math.floor(
            Math.random() * messages.length
          )
        ];
    }
  }

  if (letMeBreathe) {
    letMeBreathe.addEventListener(
      "mouseenter",
      moveBreathingButton
    );

    letMeBreathe.addEventListener(
      "touchstart",
      (event) => {
        event.preventDefault();
        moveBreathingButton();
      },
      { passive: false }
    );

    letMeBreathe.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        moveBreathingButton();
      }
    );
  }


  /* =========================================================
     PAGE 2 — DECLARATION
  ========================================================= */

  if (declarationContinue) {
    declarationContinue.addEventListener(
      "click",
      () => {
        showPage("terms");
      }
    );
  }


  /* =========================================================
     PAGE 3 — TERMS
  ========================================================= */

  if (agreeTerms) {
    agreeTerms.addEventListener(
      "click",
      () => {
        if (termsMessage) {
          termsMessage.textContent =
            "Excellent. Your decision has been officially recorded. 😌❤️";
        }

        agreeTerms.disabled = true;

        setTimeout(() => {
          showPage("registration");
        }, 900);
      }
    );
  }


  /* =========================================================
     MOVING "I DISAGREE" BUTTON
  ========================================================= */

  function moveDisagreeButton() {
    if (!disagreeTerms) return;

    const buttonRect =
      disagreeTerms.getBoundingClientRect();

    const padding = 15;

    const maxX =
      Math.max(
        padding,
        window.innerWidth -
          buttonRect.width -
          padding
      );

    const maxY =
      Math.max(
        padding,
        window.innerHeight -
          buttonRect.height -
          padding
      );

    const randomX =
      Math.floor(
        Math.random() * maxX
      );

    const randomY =
      Math.floor(
        Math.random() * maxY
      );

    disagreeTerms.style.position = "fixed";
    disagreeTerms.style.left = `${randomX}px`;
    disagreeTerms.style.top = `${randomY}px`;
    disagreeTerms.style.zIndex = "9999";

    if (termsMessage) {
      const messages = [
        "That button is unavailable. 😌",
        "You already know the answer.",
        "Nice attempt. 😂",
        "I DISAGREE button says NO.",
        "Please stop trying. 😭",
        "Marriage Department has rejected this option.",
      ];

      termsMessage.textContent =
        messages[
          Math.floor(
            Math.random() * messages.length
          )
        ];
    }
  }

  if (disagreeTerms) {
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
  }


  /* =========================================================
     PAGE 4 — NAME NORMALIZATION
     
     IMPORTANT:
     This handles different ways of typing the name.

     Examples:

     Debangan Paulchowdhury
     DEBANGAN PAULCHOWDHURY
     debangan paulchowdhury
     DeBaNgAn PaUlChOuDhUrY
     DEBANGANPAULCHOWDHURY
     debangan    paulchowdhury
     Debangan-Paulchowdhury
     Debangan_Paulchowdhury
     Debangan.Paulchowdhury
     " Debangan Paulchowdhury "
  ========================================================= */

  function normalizeName(value) {
    if (!value) {
      return "";
    }

    return value
      .normalize("NFKC")
      .trim()
      .toLowerCase()
      .replace(/[^a-z]/g, "");
  }


  /* =========================================================
     NAME VERIFICATION
  ========================================================= */

  function checkName() {
    if (!fullName || !nameMessage) {
      return;
    }

    const rawValue = fullName.value;
    const normalizedValue =
      normalizeName(rawValue);

    /*
      Compare only normalized alphabetic characters.

      So:

      "DEBANGAN PAUL CHOWDHURY"

      becomes:

      "debanganpaulchowdhury"

      and:

      "Debangan Paulchowdhury"

      also becomes:

      "debanganpaulchowdhury"
    */

    if (
      normalizedValue === CORRECT_NAME
    ) {
      nameVerified = true;

      nameMessage.textContent =
        "Identity verified. Very suspiciously accurate. 😌❤️";

      nameMessage.classList.remove("error");
      nameMessage.classList.add("success");

      fullName.classList.remove("invalid");
      fullName.classList.add("valid");

      updateFinalizeButton();

      return;
    }


    /* Empty input */

    if (normalizedValue.length === 0) {
      nameVerified = false;

      nameMessage.textContent = "";

      fullName.classList.remove("valid");
      fullName.classList.remove("invalid");

      updateFinalizeButton();

      return;
    }


    /* Incorrect input */

    nameVerified = false;

    nameMessage.textContent =
      "Hmm... that's not the groom's name. Try again. 👀";

    nameMessage.classList.remove("success");
    nameMessage.classList.add("error");

    fullName.classList.remove("valid");
    fullName.classList.add("invalid");

    updateFinalizeButton();
  }


  if (fullName) {
    fullName.addEventListener(
      "input",
      checkName
    );

    fullName.addEventListener(
      "blur",
      checkName
    );
  }


  /* =========================================================
     PAGE 4 — FINGERPRINT SCAN
  ========================================================= */

  function updateFinalizeButton() {
    if (!finalizeBtn) return;

    if (
      nameVerified &&
      fingerprintVerified
    ) {
      finalizeBtn.classList.remove("hidden");
    } else {
      finalizeBtn.classList.add("hidden");
    }
  }


  function startFingerprintScan() {
    if (
      fingerprintScanning ||
      fingerprintVerified
    ) {
      return;
    }

    fingerprintScanning = true;

    if (scanProgress) {
      scanProgress.classList.remove("hidden");
    }

    if (fingerprintMessage) {
      fingerprintMessage.textContent = "";
      fingerprintMessage.classList.remove("success");
      fingerprintMessage.classList.remove("error");
    }

    if (fingerprintBtn) {
      fingerprintBtn.disabled = true;
      fingerprintBtn.classList.add("scanning");
    }

    const progressFill =
      document.querySelector(
        ".progress-fill"
      );

    let progress = 0;

    const scanMessages = [
      "Scanning fingerprint...",
      "Checking identity...",
      "Comparing with husband database...",
      "Analyzing romantic commitment...",
      "Checking suspicious levels of love...",
      "Verification almost complete...",
    ];

    let messageIndex = 0;

    if (scanText) {
      scanText.textContent =
        scanMessages[0];
    }

    const interval =
      setInterval(() => {
        progress += 5;

        if (progressFill) {
          progressFill.style.width =
            `${progress}%`;
        }

        if (
          progress % 15 === 0 &&
          messageIndex <
            scanMessages.length - 1
        ) {
          messageIndex++;

          if (scanText) {
            scanText.textContent =
              scanMessages[messageIndex];
          }
        }

        if (progress >= 100) {
          clearInterval(interval);

          fingerprintScanning = false;
          fingerprintVerified = true;

          if (scanText) {
            scanText.textContent =
              "Fingerprint verified successfully. ❤️";
          }

          if (fingerprintMessage) {
            fingerprintMessage.textContent =
              "Fingerprint accepted. You are officially suspiciously husband-like. 😂💍";

            fingerprintMessage.classList.add(
              "success"
            );
          }

          if (fingerprintBtn) {
            fingerprintBtn.classList.remove(
              "scanning"
            );

            fingerprintBtn.classList.add(
              "verified"
            );
          }

          updateFinalizeButton();
        }
      }, 100);
  }


  if (fingerprintBtn) {
    fingerprintBtn.addEventListener(
      "click",
      startFingerprintScan
    );
  }


  /* =========================================================
     CERTIFICATE TIMESTAMP
  ========================================================= */

  function getFormattedTimestamp() {
    const now = new Date();

    const day =
      String(now.getDate()).padStart(2, "0");

    const month =
      String(now.getMonth() + 1).padStart(
        2,
        "0"
      );

    const year =
      now.getFullYear();

    const hours =
      String(now.getHours()).padStart(
        2,
        "0"
      );

    const minutes =
      String(now.getMinutes()).padStart(
        2,
        "0"
      );

    const seconds =
      String(now.getSeconds()).padStart(
        2,
        "0"
      );

    return `${day}.${month}.${year} at ${hours}:${minutes}:${seconds}`;
  }


  /* =========================================================
     PAGE 5 — CERTIFICATE BUTTON
     
     IMPORTANT FIX #2:
     The certificate no longer automatically changes
     to the party page.

     We create a "Continue to Celebration" button
     dynamically so the user can read the complete
     certificate first.
  ========================================================= */

  function createCertificateContinueButton() {
    const certificatePage =
      pages.certificate;

    if (!certificatePage) {
      return;
    }

    /*
      Don't create the button more than once.
    */

    let existingButton =
      document.getElementById(
        "certificateContinue"
      );

    if (existingButton) {
      return;
    }

    existingButton =
      document.createElement("button");

    existingButton.id =
      "certificateContinue";

    existingButton.type = "button";

    existingButton.className =
      "btn btn-primary certificate-continue-btn";

    existingButton.textContent =
      "CONTINUE TO CELEBRATION 🎉";

    existingButton.addEventListener(
      "click",
      () => {
        showPartyPage();
      }
    );


    /*
      Put the button AFTER the certificate,
      not inside the certificate border.
      
      This prevents it from disturbing the
      actual certificate design.
    */

    certificatePage.appendChild(
      existingButton
    );
  }


  /* =========================================================
     SHOW PARTY PAGE
  ========================================================= */

  function showPartyPage() {
    if (partyStarted) {
      return;
    }

    partyStarted = true;

    showPage("party");

    startConfetti();

    /*
      Gift appears AFTER the user reaches
      the celebration page.
    */

    setTimeout(() => {
      if (giftReveal) {
        giftReveal.classList.remove(
          "hidden"
        );
      }
    }, 1500);
  }


  /* =========================================================
     PAGE 4 → PAGE 5
     
     FINALIZE MARRIAGE
  ========================================================= */

  if (finalizeBtn) {
    finalizeBtn.addEventListener(
      "click",
      () => {
        if (
          !nameVerified ||
          !fingerprintVerified
        ) {
          return;
        }

        certificateTimestamp =
          getFormattedTimestamp();

        /*
          If your certificate contains a timestamp
          element, update it.
        */

        const certificateTime =
          document.getElementById(
            "certificateTime"
          );

        if (certificateTime) {
          certificateTime.textContent =
            certificateTimestamp;
        }

        showPage("certificate");

        /*
          Create the manual continuation button.

          NO automatic timeout here.

          The certificate will stay visible
          until HE clicks the button.
        */

        createCertificateContinueButton();
      }
    );
  }


  /* =========================================================
     CONFETTI
  ========================================================= */

  function startConfetti() {
    if (!confettiContainer) {
      return;
    }

    confettiContainer.innerHTML = "";

    const pieces = 90;

    for (let i = 0; i < pieces; i++) {
      const piece =
        document.createElement("span");

      piece.className =
        "confetti-piece";

      const randomLeft =
        Math.random() * 100;

      const randomDelay =
        Math.random() * 2;

      const randomDuration =
        2.5 + Math.random() * 3;

      const randomRotation =
        Math.random() * 360;

      piece.style.left =
        `${randomLeft}%`;

      piece.style.animationDelay =
        `${randomDelay}s`;

      piece.style.animationDuration =
        `${randomDuration}s`;

      piece.style.transform =
        `rotate(${randomRotation}deg)`;

      /*
        A few different shapes/sizes.
      */

      const size =
        5 + Math.random() * 8;

      piece.style.width =
        `${size}px`;

      piece.style.height =
        `${size * 1.4}px`;

      confettiContainer.appendChild(
        piece
      );
    }

    /*
      Clean up after animation.
    */

    setTimeout(() => {
      if (confettiContainer) {
        confettiContainer.innerHTML = "";
      }
    }, 7000);
  }


  /* =========================================================
     PAGE 6 — OPEN GIFT
  ========================================================= */

  if (openGift) {
    openGift.addEventListener(
      "click",
      () => {
        if (giftOpened) {
          return;
        }

        giftOpened = true;

        showPage("gift");

        startKisses();

        /*
          The final message appears after
          2 seconds.
        */

        setTimeout(() => {
          if (kissMessage) {
            kissMessage.classList.remove(
              "hidden"
            );
          }
        }, 2000);
      }
    );
  }


  /* =========================================================
     PAGE 7 — FLOATING KISSES
  ========================================================= */

  function startKisses() {
    if (!kissContainer) {
      return;
    }

    kissContainer.innerHTML = "";

    /*
      Initial kisses
    */

    for (let i = 0; i < 25; i++) {
      createKiss(true);
    }

    /*
      Keep generating kisses.
    */

    let kissCount = 0;

    const kissInterval =
      setInterval(() => {
        if (currentPage !== "gift") {
          clearInterval(kissInterval);
          return;
        }

        createKiss(false);

        kissCount++;

        if (kissCount >= 80) {
          clearInterval(kissInterval);
        }
      }, 350);
  }


  function createKiss(initial) {
    if (!kissContainer) {
      return;
    }

    const kiss =
      document.createElement("span");

    kiss.className = "floating-kiss";

    kiss.textContent = [
      "💋",
      "❤️",
      "💕",
      "💗",
      "😘",
      "💖",
    ][
      Math.floor(
        Math.random() * 6
      )
    ];

    const left =
      Math.random() * 100;

    const size =
      18 + Math.random() * 24;

    const duration =
      4 + Math.random() * 5;

    const delay =
      initial
        ? Math.random() * 4
        : 0;

    kiss.style.left =
      `${left}%`;

    kiss.style.fontSize =
      `${size}px`;

    kiss.style.animationDuration =
      `${duration}s`;

    kiss.style.animationDelay =
      `${delay}s`;

    kissContainer.appendChild(
      kiss
    );

    /*
      Remove it after animation so the DOM
      doesn't become unnecessarily huge.
    */

    setTimeout(() => {
      kiss.remove();
    }, (duration + delay) * 1000 + 500);
  }


  /* =========================================================
     RESET / SAFETY
  ========================================================= */

  window.addEventListener(
    "resize",
    () => {
      /*
        If the moving button is currently outside
        the viewport after resizing, bring it back.
      */

      if (
        currentPage === "decision" &&
        letMeBreathe
      ) {
        const rect =
          letMeBreathe.getBoundingClientRect();

        if (
          rect.right > window.innerWidth ||
          rect.bottom > window.innerHeight
        ) {
          moveBreathingButton();
        }
      }

      if (
        currentPage === "terms" &&
        disagreeTerms
      ) {
        const rect =
          disagreeTerms.getBoundingClientRect();

        if (
          rect.right > window.innerWidth ||
          rect.bottom > window.innerHeight
        ) {
          moveDisagreeButton();
        }
      }
    }
  );


  /* =========================================================
     START
  ========================================================= */

  showPage("decision");
});