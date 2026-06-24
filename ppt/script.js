const presentation = document.getElementById("presentation");
const slides = document.querySelectorAll(".slide-page");
let currentSlide = 0;

function showSlide(index) {
  slides[currentSlide].classList.remove("active");
  currentSlide = index;
  slides[currentSlide].classList.add("active");
}

document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowRight") {
    if (currentSlide < slides.length - 1) {
      showSlide(currentSlide + 1);
    }
  }

  if (event.key === "ArrowLeft") {
    if (currentSlide > 0) {
      showSlide(currentSlide - 1);
    }
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