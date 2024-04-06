document.addEventListener("DOMContentLoaded", function () {
  startAutoPlay();
});

// JavaScript for slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll(".testimonial.slide");
const totalSlides = slides.length;
const slideWidth = slides[0].clientWidth;
let currentSlideIndex = 0;

// Create dots for each slide
slides.forEach((slide, index) => {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  if (index === 0) {
      dot.classList.add('active');
  }
  dot.addEventListener('click', () => {
      showSlide(index);
  });
  document.querySelector('.counter').appendChild(dot);
});

// Function to show slide by index
function showSlide(index) {
  slides.forEach((slide, i) => {
    if (i === index) {
      document.querySelector('.counter').children[i].classList.add('active');
    } else {
      document.querySelector('.counter').children[i].classList.remove('active');
    }
  });
}

function moveSlide(n) {
  const slideOffset = -n * slideWidth;
  document.querySelector(
    ".slides"
  ).style.transform = `translateX(${slideOffset}px)`;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  moveSlide(currentSlide);
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  moveSlide(currentSlide);
  showSlide(currentSlide);
}

document.querySelector(".prev").addEventListener("click", prevSlide);
document.querySelector(".next").addEventListener("click", nextSlide);

function startAutoPlay() {
  autoPlayTimer = setInterval(function () {
    moveSlide(1);
  }, 50000); // Adjust autoplay interval (in milliseconds)
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
    event.currentTarget.querySelector('.info-card-router .info-icon').classList.add('d-block');
    event.currentTarget.querySelector('.info-card-router .info-icon').classList.remove('d-none');
  });

  card.addEventListener('mouseout', (event) => {
    event.currentTarget.querySelector('.on-hover-para').classList.add('d-none');
    event.currentTarget.querySelector('.on-hover-para').classList.remove('d-block');
    event.currentTarget.querySelector('.info-card-router .info-icon').classList.add('d-none');
    event.currentTarget.querySelector('.info-card-router .info-icon').classList.remove('d-block');
  });
});

document.querySelectorAll('.banner-form form input').forEach(inputField => {
  inputField.addEventListener('focus', () => {
    if (document.querySelector(`label[for="${inputField.id}"]`)) {
      document.querySelector(`label[for="${inputField.id}"]`).classList.add('focused');
    }
    const dropdown = inputField.nextElementSibling;
    if (document.querySelector(`label[for="${dropdown.id}"]`)) {
      document.querySelector(`label[for="${dropdown.id}"]`).classList.add('focused');
    }
  });

  inputField.addEventListener('blur', () => {
    if (document.querySelector(`label[for="${inputField.id}"]`)) {
      document.querySelector(`label[for="${inputField.id}"]`).classList.remove('focused');
    }
    const dropdown = inputField.nextElementSibling;
    if (document.querySelector(`label[for="${dropdown.id}"]`)) {
      document.querySelector(`label[for="${dropdown.id}"]`).classList.remove('focused');
    }
  });
});

function validateForm() {
  var form = document.querySelector("form");
  var elements = form.elements;
  var isValid = true;

  for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      if (element.tagName === "INPUT" || element.tagName === "SELECT") {
          if (element.hasAttribute("required") && element.value.trim() === "") {
              isValid = false;
              element.classList.add("invalid");
          } else {
              element.classList.remove("invalid");
          }
      }
  }

  if (isValid) {
      // Form is valid, you can submit it
      // form.submit();
  } else {
      // Form is invalid, do something (like show error message)
      // alert("Please fill in all required fields.");
  }
}