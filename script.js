$(document).ready(function() {
    var envelope = $('#envelope');
    var btn_open = $("#open");
    var btn_reset = $('#reset');
    var overlay = $('.overlay');
    var isExpanded = false;

    btn_open.on("click", function() {
        if(!envelope.hasClass('open')) {
            envelope.addClass('open').removeClass('close');
        }
    });

    btn_reset.on("click", function() {
        if(envelope.hasClass('expanded')) {
            returnLetter();
        } else {
            envelope.removeClass('open').addClass('close');
        }
    });


    envelope.on("click", function() {
        if(envelope.hasClass('open') && !envelope.hasClass('expanded') && !isExpanded) {
            envelope.addClass('expanded');
            overlay.fadeIn(300);
            isExpanded = true;
        } else if(envelope.hasClass('expanded') && isExpanded) {
            returnLetter();
        }
    });


    overlay.on("click", returnLetter);

    function returnLetter() {
        envelope.addClass('returning');
        
        setTimeout(function() {
            envelope.removeClass('expanded returning');
            overlay.fadeOut(300);
            isExpanded = false;
        }, 800); 
    }
});

(function() {
  const overlay = document.getElementById('rotate-overlay');

 
  const MOBILE_WIDTH_MAX = 900; 

  function isMobileWidth() {
    return window.innerWidth <= MOBILE_WIDTH_MAX;
  }


  function isLandscape() {
    
    return window.innerWidth > window.innerHeight;
  }


function updateOverlay() {
  const isMobile = window.innerWidth <= 768;
  if (isMobile && !isLandscape()) {
    overlay.style.display = 'flex';
    overlay.setAttribute('aria-hidden', 'false');
    
  } else {
    overlay.style.display = 'none';
    overlay.setAttribute('aria-hidden', 'true');
  }
}


const continueBtn = document.getElementById('continue-portrait');
if (continueBtn) {
  continueBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
  });
}


  window.addEventListener('load', updateOverlay, { passive: true });

 
  window.addEventListener('resize', function() {
    
    clearTimeout(window.__rotateDebounce);
    window.__rotateDebounce = setTimeout(updateOverlay, 120);
  }, { passive: true });


  window.addEventListener('orientationchange', function() {
    setTimeout(updateOverlay, 200);
  }, { passive: true });


  overlay.addEventListener('touchmove', function(e) {

    e.preventDefault();
  }, { passive: false });

})();



document.addEventListener("DOMContentLoaded", () => {
  
  const rewindScreen = document.getElementById("rewind-screen");
  const startScreen = document.getElementById("start-screen");
  const loadingScreen = document.getElementById("loading-screen");
  const finishScreen = document.getElementById("finish-screen");
  const yearDisplay = document.getElementById("year-display");
  const startBtn = document.getElementById("start-journey");
  const finishBtn = document.getElementById("finish-journey");
  const imgElement = loadingScreen ? loadingScreen.querySelector(".yes") : null;

  
  let messageDisplay = document.getElementById("rewind-message");
  if (!messageDisplay && loadingScreen) {
    messageDisplay = document.createElement("div");
    messageDisplay.id = "rewind-message";
    messageDisplay.style.marginTop = "15px";
    messageDisplay.style.fontSize = "16px";
    messageDisplay.style.fontWeight = "400";
    messageDisplay.style.textAlign = "center";
    messageDisplay.style.color = "#fff";
    messageDisplay.style.minHeight = "50px";
    loadingScreen.querySelector(".loading-content").appendChild(messageDisplay);
  }

  
  let nextBtn = document.getElementById("next-year");
  if (!nextBtn && loadingScreen) {
    nextBtn = document.createElement("button");
    nextBtn.textContent = "Lanjut!?";
    nextBtn.id = "next-year";
    nextBtn.style.marginTop = "25px";
    loadingScreen.querySelector(".loading-content").appendChild(nextBtn);
  }

  let finishRewindBtn = document.getElementById("finish-rewind");
  if (!finishRewindBtn && loadingScreen) {
    finishRewindBtn = document.createElement("button");
    finishRewindBtn.textContent = "Lanjut?? Dikit lagi kok!!";
    finishRewindBtn.id = "finish-rewind";
    finishRewindBtn.style.marginTop = "25px";
    finishRewindBtn.style.display = "none";
    loadingScreen.querySelector(".loading-content").appendChild(finishRewindBtn);
  }

  
  const rewindSteps = [
    { year: 14, img: "i1.jpg", msg: "From the first breath of our words, a quiet stillness bloomed, as if my heart had finally found its ancient home." },
    { year: "Februari", img: "yay.png", msg: "The hours now lean toward the grace of our shared thoughts, the golden sanctuary of every passing day." },
    { year: 2026, img: "bandage.gif", msg: "Though life may drift us to distant horizons, the tide of my soul will forever find its way back to you. 💫" },
  ];

  let current = 0;
  let typingInterval = null;

  
  function showOnlyScreen(screenToShow) {
    [startScreen, loadingScreen, finishScreen].forEach(s => {
      if (!s) return;
      if (s === screenToShow) s.classList.add("active");
      else s.classList.remove("active");
    });
  }

  
  function openRewindContainer() {
    if (rewindScreen) {
      rewindScreen.classList.add("active");
      
      rewindScreen.style.display = "";
    }
    
    const envelopeWrap = document.querySelector(".envelope-wrapper");
    if (envelopeWrap) envelopeWrap.style.display = "none";
    
    const rotate = document.getElementById("rotate-overlay");
    if (rotate) rotate.style.display = "none";
  }

  
  function restoreEnvelope() {
    const envelopeWrap = document.querySelector(".envelope-wrapper");
    if (envelopeWrap) envelopeWrap.style.display = "";
  }

  
  function updateDisplay() {
    
    if (typingInterval) {
      clearInterval(typingInterval);
      typingInterval = null;
    }
    const step = rewindSteps[current];
    if (!step) return;

    
    if (yearDisplay) yearDisplay.textContent = step.year;
    if (imgElement) {
      imgElement.style.opacity = "0";
      
      setTimeout(() => {
        imgElement.src = step.img;
        imgElement.style.opacity = "1";
      }, 120);
    }

    
    typeMessage(step.msg);

    
    if (step.year === 2026) {
      if (nextBtn) nextBtn.style.display = "none";
      if (finishRewindBtn) finishRewindBtn.style.display = "inline-block";
    } else {
      if (nextBtn) nextBtn.style.display = "inline-block";
      if (finishRewindBtn) finishRewindBtn.style.display = "none";
    }
  }

  
  function typeMessage(text) {
    if (!messageDisplay) return;
    messageDisplay.textContent = "";
    let idx = 0;
    typingInterval = setInterval(() => {
      if (idx < text.length) {
        messageDisplay.textContent += text.charAt(idx);
        idx++;
      } else {
        clearInterval(typingInterval);
        typingInterval = null;
      }
    }, 30);
  }

  
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      openRewindContainer();
      showOnlyScreen(loadingScreen);
      current = 0;
      updateDisplay();
    });
  }

  
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (current < rewindSteps.length - 1) {
        current++;
        updateDisplay();
      }
    });
  }
  
  if (finishRewindBtn) {
    finishRewindBtn.addEventListener("click", () => {
      showOnlyScreen(finishScreen);

      
      const finishMsg = finishScreen.querySelector("h2");
      if (finishMsg) {
        finishMsg.textContent = "Even in silence, the thought of you is enough to make my world feel complete. ✨";
      }

      
      if (finishBtn) finishBtn.style.display = "inline-block";
    });
  }

  
  if (finishBtn) {
    finishBtn.addEventListener("click", () => {
      
      [startScreen, loadingScreen, finishScreen].forEach(s => s?.classList.remove("active"));
      rewindScreen?.classList.remove("active");

      
      const envelopeWrap = document.querySelector(".envelope-wrapper");
      if (envelopeWrap) envelopeWrap.style.display = "";

      
      const overlay = document.querySelector(".overlay");
      if (overlay) overlay.style.display = "none";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  
  const rewindAgainBtnMain = document.getElementById("rewind-again") || document.getElementById("rewind-btn");
  if (rewindAgainBtnMain) {
    rewindAgainBtnMain.addEventListener("click", () => {
      
      const envelopeWrap = document.querySelector(".envelope-wrapper");
      if (envelopeWrap) envelopeWrap.style.display = "none";

      
      openRewindContainer();
      showOnlyScreen(loadingScreen);
      current = 0;
      updateDisplay();
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
    const envelope = document.getElementById("envelope");
    if (!envelope) return;

    let isDragging = false;
    let rotateX = 0;
    let rotateY = 0;
    let lastX = 0;
    let lastY = 0;

    envelope.style.cursor = "grab";

    envelope.addEventListener("mousedown", (e) => {
        isDragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
        envelope.style.cursor = "grabbing";

        document.body.classList.add("no-select");
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        const deltaX = e.clientX - lastX;
        const deltaY = e.clientY - lastY;

        rotateY += deltaX * 0.3;
        rotateX -= deltaY * 0.3;

        rotateX = Math.max(-20, Math.min(20, rotateX));
        rotateY = Math.max(-30, Math.min(30, rotateY));

        envelope.style.transform =
            `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        lastX = e.clientX;
        lastY = e.clientY;
    });



    document.addEventListener("mouseup", () => {
        isDragging = false;
        envelope.style.cursor = "grab";
        document.body.classList.remove("no-select");
    });
});

envelope.addEventListener("touchmove", (e) => {
        const touch = e.touches[0];
        const rect = envelope.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const rotateY = (touch.clientX - centerX) / 15;
        const rotateX = -(touch.clientY - centerY) / 15;

        envelope.style.transform = `
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;
    });

    envelope.addEventListener("touchend", () => {
        envelope.style.transform = "rotateX(0deg) rotateY(0deg)";
    });