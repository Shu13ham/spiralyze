document.addEventListener("DOMContentLoaded", function () {
  startAutoPlay();
});

// JavaScript for slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll(".testimonial.slide");
const totalSlides = slides.length;
const slideWidth = slides[0].clientWidth;

function moveSlide(n) {
  const slideOffset = -n * slideWidth;
  document.querySelector(
    ".slides"
  ).style.transform = `translateX(${slideOffset}px)`;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  moveSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  moveSlide(currentSlide);
}

document.querySelector(".prev").addEventListener("click", prevSlide);
document.querySelector(".next").addEventListener("click", nextSlide);

function startAutoPlay() {
  autoPlayTimer = setInterval(function () {
    moveSlide(1);
  }, 5000); // Adjust autoplay interval (in milliseconds)
}

function stopAutoPlay() {
  clearInterval(autoPlayTimer);
}

let startX = 0;
let endX = 0;

function startDrag(event) {
  stopAutoPlay();
  startX = event.touches[0].clientX;
}

function drag(event) {
  endX = event.touches[0].clientX;
}

function endDrag() {
  const sensitivity = 50; // Adjust this value to control the sensitivity of the drag
  const dragDistance = startX - endX;

  if (dragDistance > sensitivity) {
    moveSlide(1); // Move to next slide
  } else if (dragDistance < -sensitivity) {
    moveSlide(-1); // Move to previous slide
  }

  startAutoPlay();
}

document.querySelectorAll('.info-card-router').forEach((card) => {
  card.addEventListener('mouseover', (event) => {
    event.currentTarget.querySelector('.on-hover-para').classList.add('d-block');
    event.currentTarget.querySelector('.on-hover-para').classList.remove('d-none');
    event.currentTarget.querySelector('.info-card-router .info-icon img').classList.add('d-block');
    event.currentTarget.querySelector('.info-card-router .info-icon img').classList.remove('d-none');
  });

  card.addEventListener('mouseout', (event) => {
    event.currentTarget.querySelector('.on-hover-para').classList.add('d-none');
    event.currentTarget.querySelector('.on-hover-para').classList.remove('d-block');
    event.currentTarget.querySelector('.info-card-router .info-icon img').classList.add('d-none');
    event.currentTarget.querySelector('.info-card-router .info-icon img').classList.remove('d-block');
  });
});