const presentation = document.getElementById("presentation");
const slides = document.querySelectorAll(".slide-page");

let currentSlide = 0;
let touchStartX = 0;
let touchEndX = 0;

function showSlide(index) {
  if (index < 0 || index >= slides.length) return;

  slides[currentSlide].classList.remove("active");
  currentSlide = index;
  slides[currentSlide].classList.add("active");
}

function nextSlide() {
  if (currentSlide < slides.length - 1) {
    showSlide(currentSlide + 1);
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    showSlide(currentSlide - 1);
  }
}

/* Navigasi keyboard laptop */
document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowRight") {
    nextSlide();
  }

  if (event.key === "ArrowLeft") {
    prevSlide();
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();

    if (!document.fullscreenElement) {
      presentation.requestFullscreen();
    }
  }

  if (event.key === "ArrowDown") {
    event.preventDefault();

    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }
});

/* Navigasi swipe HP */
presentation.addEventListener("touchstart", function(event) {
  touchStartX = event.changedTouches[0].screenX;
});

presentation.addEventListener("touchend", function(event) {
  touchEndX = event.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeDistance = touchEndX - touchStartX;

  if (swipeDistance < -50) {
    nextSlide();
  }

  if (swipeDistance > 50) {
    prevSlide();
  }
}

/* Klik kanan slide = next, klik kiri slide = previous */
presentation.addEventListener("click", function(event) {
  const middle = window.innerWidth / 2;

  if (event.clientX > middle) {
    nextSlide();
  } else {
    prevSlide();
  }
});

presentation.addEventListener("dblclick", function () {
  if (!document.fullscreenElement) {
    presentation.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

/* =========================================================
   FIX TINGGI LAYAR HP
   Menggunakan window.innerHeight agar slide tidak tertutup address bar browser.
========================================================= */
function setAppHeight() {
  document.documentElement.style.setProperty("--app-height", window.innerHeight + "px");
}

setAppHeight();
window.addEventListener("resize", setAppHeight);
window.addEventListener("orientationchange", function () {
  setTimeout(setAppHeight, 300);
});
