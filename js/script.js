/* =========================================================
   A SECRET QUESTION — Interaction Logic
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const pages = [
    "decision",
    "declaration",
    "terms",
    "registration",
    "ring",
    "certificate",
    "party",
    "gift",
  ];

  const $ = (id) => document.getElementById(id);


  /* =========================================================
     ELEMENTS
     ========================================================= */

  const currentDate = $("currentDate");
  const currentTime = $("currentTime");

  const decisionWarning = $("decisionWarning");
  const letMeBreathe = $("letMeBreathe");
  const obviouslyYes = $("obviouslyYes");

  const disagreeTerms = $("disagreeTerms");
  const agreeTerms = $("agreeTerms");

  const fullName = $("fullName");
  const nameMessage = $("nameMessage");

  const fingerprintBtn = $("fingerprintBtn");
  const scanProgress = $("scanProgress");
  const progressFill = $("progressFill");
  const scanText = $("scanText");
  const fingerprintMessage = $("fingerprintMessage");

  const finalizeBtn = $("finalizeBtn");

  const ringReveal = $("ringReveal");
  const certificateDate = $("certificateDate");

  const giftReveal = $("giftReveal");
  const openGift = $("openGift");

  const kissContainer = $("kissContainer");
  const kissMessage = $("kissMessage");


  /* =========================================================
     STATE
     ========================================================= */

  let nameValid = false;
  let fingerprintValid = false;
  let scanning = false;

  let giftTimer = null;

  let ringRevealTimer = null;
  let ringCertificateTimer = null;


  /*
     IMPORTANT:

     We compare ONLY alphabetic characters.

     Therefore all of these work:

     Debangan Paulchowdhury
     DEBANGAN PAUL CHOWDHURY
     debangan paul chowdhury
     DeBaNgAn PaUl ChOuDhUrY
     Debangan     Paul     Chowdhury
     DEBANGANPAULCHOWDHURY

     Punctuation/spaces are also ignored.

     Actual spelling mistakes will NOT be accepted.
  */

  const REQUIRED_NAME = "debanganpaulchowdhury";


  /* =========================================================
     PAGE NAVIGATION
     ========================================================= */

  function showPage(name) {

    pages.forEach((page) => {

      const section = $(`page-${page}`);

      if (!section) return;

      section.classList.toggle(
        "active",
        page === name
      );

    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }


  /* =========================================================
     DATE + TIME
     ========================================================= */

  function updateDateTime() {

    const now = new Date();

    const dd = String(
      now.getDate()
    ).padStart(2, "0");

    const mm = String(
      now.getMonth() + 1
    ).padStart(2, "0");

    const yyyy = now.getFullYear();

    currentDate.textContent =
      `${dd}.${mm}.${yyyy}`;


    currentTime.textContent =
      now.toLocaleTimeString(
        undefined,
        {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }
      );
  }


  updateDateTime();

  setInterval(
    updateDateTime,
    1000
  );


  /* =========================================================
     MOVING BUTTON
     ========================================================= */

  function moveButton(
    button,
    messageElement,
    messages
  ) {

    if (
      !button ||
      button.dataset.moving === "true"
    ) {
      return;
    }

    button.dataset.moving = "true";

    button.style.position = "fixed";
    button.style.zIndex = "9999";


    const move = () => {

      const rect =
        button.getBoundingClientRect();

      const margin = 12;

      const maxX =
        Math.max(
          margin,
          window.innerWidth -
            rect.width -
            margin
        );

      const maxY =
        Math.max(
          margin,
          window.innerHeight -
            rect.height -
            margin
        );

      const x =
        margin +
        Math.random() *
          (maxX - margin);

      const y =
        margin +
        Math.random() *
          (maxY - margin);

      button.style.left =
        `${x}px`;

      button.style.top =
        `${y}px`;
    };


    move();


    const message =
      messages[
        Math.floor(
          Math.random() *
            messages.length
        )
      ];


    messageElement.textContent =
      message;
  }


  /* =========================================================
     PAGE 1
     ========================================================= */

  obviouslyYes.addEventListener(
    "click",
    () => {

      showPage(
        "declaration"
      );

    }
  );


  const decisionMessages = [
    "NO!! You should have thought about this earlier! 😭",
    "WE WILL DO IT RIGHT NOW!! 💍",
    "There is no escape route. 🙂",
    "Nice try. Now press the correct button. ❤️",
  ];


  [
    "mouseenter",
    "touchstart",
    "click",
  ].forEach(
    (eventName) => {

      letMeBreathe.addEventListener(
        eventName,
        (event) => {

          if (
            eventName === "click"
          ) {
            event.preventDefault();
          }

          moveButton(
            letMeBreathe,
            decisionWarning,
            decisionMessages
          );

        },
        {
          passive:
            eventName !== "click",
        }
      );

    }
  );


  /* =========================================================
     PAGE 2
     ========================================================= */

  $(
    "declarationContinue"
  ).addEventListener(
    "click",
    () => {

      showPage("terms");

    }
  );


  /* =========================================================
     PAGE 3
     ========================================================= */

  const termsMessages = [
    "I DISAGREE is currently unavailable. 😌",
    "That button has resigned from its position.",
    "Please select the only legally acceptable option. ❤️",
    "Nice attempt. Try agreeing. 💍",
  ];


  [
    "mouseenter",
    "touchstart",
    "click",
  ].forEach(
    (eventName) => {

      disagreeTerms.addEventListener(
        eventName,
        (event) => {

          if (
            eventName === "click"
          ) {
            event.preventDefault();
          }

          moveButton(
            disagreeTerms,
            $("termsMessage"),
            termsMessages
          );

        },
        {
          passive:
            eventName !== "click",
        }
      );

    }
  );


  agreeTerms.addEventListener(
    "click",
    () => {

      showPage(
        "registration"
      );

    }
  );


  /* =========================================================
     NAME NORMALIZATION
     ========================================================= */

  function normalizeName(value) {

    return value
      .normalize("NFKD")
      .replace(
        /[\u0300-\u036f]/g,
        ""
      )
      .toLowerCase()
      .replace(
        /[^a-z]/g,
        ""
      );
  }


  /* =========================================================
     NAME VERIFICATION
     ========================================================= */

  fullName.addEventListener(
    "input",
    () => {

      const value =
        normalizeName(
          fullName.value
        );


      nameValid =
        value === REQUIRED_NAME;


      /*
         If the user changes the name after
         fingerprint verification, invalidate
         the fingerprint as well.
      */

      if (!nameValid) {

        fingerprintValid = false;

        fingerprintBtn.disabled =
          false;

        fingerprintBtn.classList.remove(
          "scanning"
        );

        fingerprintBtn.innerHTML =
          "<span>🖐️</span><small>CLICK TO SCAN</small>";

        scanProgress.classList.add(
          "hidden"
        );

        if (progressFill) {
          progressFill.style.width = "0%";
        }

      }


      if (!value) {

        nameMessage.textContent = "";

      }

      else if (nameValid) {

        nameMessage.textContent =
          "Identity verified. That is definitely him. 😌❤️";

      }

      else {

        nameMessage.textContent =
          "Hmm... that does not match the groom's registered name. 👀";

      }


      updateFinalizeState();
    }
  );


  /* =========================================================
     FINALIZE BUTTON STATE
     ========================================================= */

  function updateFinalizeState() {

    const ready =
      nameValid &&
      fingerprintValid &&
      !scanning;


    finalizeBtn.classList.toggle(
      "hidden",
      !ready
    );
  }


  /* =========================================================
     FINGERPRINT SCAN
     ========================================================= */

  fingerprintBtn.addEventListener(
    "click",
    () => {

      if (
        !nameValid ||
        scanning ||
        fingerprintValid
      ) {
        return;
      }


      scanning = true;

      fingerprintBtn.classList.add(
        "scanning"
      );

      scanProgress.classList.remove(
        "hidden"
      );

      fingerprintMessage.textContent =
        "";

      progressFill.style.width =
        "0%";

      updateFinalizeState();


      let progress = 0;


      const steps = [
        "Reading fingerprint...",
        "Comparing identity...",
        "Checking husband database...",
        "Confirming Anushka's approval...",
        "Verification complete. ❤️",
      ];


      const timer =
        setInterval(
          () => {

            progress += 4;


            progressFill.style.width =
              `${Math.min(
                progress,
                100
              )}%`;


            const stepIndex =
              Math.min(
                Math.floor(
                  progress / 20
                ),
                steps.length - 1
              );


            scanText.textContent =
              steps[stepIndex];


            if (
              progress >= 100
            ) {

              clearInterval(
                timer
              );


              scanning = false;

              fingerprintValid =
                true;


              fingerprintBtn.classList.remove(
                "scanning"
              );

              fingerprintBtn.disabled =
                true;


              fingerprintBtn.innerHTML =
                "<span>✅</span><small>VERIFIED</small>";


              fingerprintMessage.textContent =
                "Fingerprint accepted. Your fate is now officially sealed. 💍";


              updateFinalizeState();

            }

          },
          100
        );
    }
  );


  /* =========================================================
     PAGE 4 → PAGE 5 RING PAGE
     ========================================================= */

  function startRingPage() {

    /*
       Clear any old timers first.
       This prevents duplicate transitions if
       someone somehow clicks multiple times.
    */

    clearTimeout(
      ringRevealTimer
    );

    clearTimeout(
      ringCertificateTimer
    );


    /*
       Start with the reveal hidden.
    */

    ringReveal.classList.add(
      "hidden"
    );


    /*
       FIRST MESSAGE:

       Wait exactly 5 seconds.
    */

    ringRevealTimer =
      setTimeout(
        () => {

          ringReveal.classList.remove(
            "hidden"
          );


          /*
             SECOND TIMER:

             Give him enough time to read
             the emotional message.

             Then move to certificate.
          */

          ringCertificateTimer =
            setTimeout(
              () => {

                showCertificate();

              },
              4500
            );

        },
        5000
      );
  }


  /* =========================================================
     CERTIFICATE
     ========================================================= */

  function showCertificate() {

    const now = new Date();


    certificateDate.textContent =
      `Registered on ${
        now.toLocaleDateString(
          undefined,
          {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }
        )
      } at ${
        now.toLocaleTimeString(
          undefined,
          {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }
        )
      }`;


    showPage(
      "certificate"
    );


    /*
       IMPORTANT FIX:

       OLD:
       3500ms

       NEW:
       12000ms

       The certificate now remains
       visible for 12 full seconds.
    */

    setTimeout(
      () => {

        showPage("party");

        createConfetti();


        giftTimer =
          setTimeout(
            () => {

              giftReveal.classList.remove(
                "hidden"
              );

            },
            1200
          );

      },
      12000
    );
  }


  /* =========================================================
     PAGE 4 → RING
     ========================================================= */

  finalizeBtn.addEventListener(
    "click",
    () => {

      if (
        !nameValid ||
        !fingerprintValid ||
        scanning
      ) {
        return;
      }


      /*
         Go to the new ring page first.
      */

      showPage(
        "ring"
      );


      startRingPage();

    }
  );


  /* =========================================================
     PARTY → GIFT
     ========================================================= */

  openGift.addEventListener(
    "click",
    () => {

      if (giftTimer) {

        clearTimeout(
          giftTimer
        );

      }


      showPage(
        "gift"
      );


      createKisses();


      setTimeout(
        () => {

          kissMessage.classList.remove(
            "hidden"
          );

        },
        2000
      );

    }
  );


  /* =========================================================
     CONFETTI
     ========================================================= */

  function createConfetti() {

    const container =
      $("confettiContainer");


    container.innerHTML =
      "";


    const pieces = 85;


    for (
      let i = 0;
      i < pieces;
      i++
    ) {

      const piece =
        document.createElement(
          "span"
        );


      piece.className =
        "confetti";


      piece.style.left =
        `${Math.random() * 100}%`;


      piece.style.animationDuration =
        `${2.4 + Math.random() * 2.5}s`;


      piece.style.animationDelay =
        `${Math.random() * 1.4}s`;


      piece.style.setProperty(
        "--drift",
        `${-100 + Math.random() * 200}px`
      );


      piece.style.background =
        Math.random() > 0.5
          ? "#8f1d2c"
          : "#b58a3b";


      piece.style.transform =
        `rotate(${Math.random() * 360}deg)`;


      container.appendChild(
        piece
      );

    }
  }


  /* =========================================================
     KISSES
     ========================================================= */

  function createKisses() {

    kissContainer.innerHTML =
      "";


    const kissEmojis = [
      "💋",
      "❤️",
      "💕",
      "💖",
      "💗",
      "😘",
      "💋",
    ];


    for (
      let i = 0;
      i < 45;
      i++
    ) {

      const kiss =
        document.createElement(
          "span"
        );


      kiss.className =
        "kiss";


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
        `${4 + Math.random() * 5}s`;


      kiss.style.animationDelay =
        `${Math.random() * 3}s`;


      kiss.style.fontSize =
        `${1.1 + Math.random() * 1.3}rem`;


      kissContainer.appendChild(
        kiss
      );

    }
  }

});