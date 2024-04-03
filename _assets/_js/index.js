document.addEventListener('DOMContentLoaded', function() {
    startAutoPlay();
});

let currentIndex = 0;
let autoPlayTimer;

function moveSlide(offset) {
  const slides = document.querySelectorAll('.slide');
  currentIndex = (currentIndex + offset + slides.length) % slides.length;
  const displacement = -100 * currentIndex;
  document.querySelector('.slides').style.transform = `translateX(${displacement}%)`;
}

function startAutoPlay() {
  autoPlayTimer = setInterval(function() {
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
