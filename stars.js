const container = document.getElementById("dot-container");

const STAR_COUNT = 80;
const MIN_SIZE = 5;
const MAX_SIZE = 15;

let stars = [];

function createStars() {
  container.innerHTML = "";
  stars = [];

  for (let i = 0; i < STAR_COUNT; i++) {

    const star = document.createElement("div");
    star.classList.add("dot");

    const size = randomBetween(MIN_SIZE, MAX_SIZE);

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    star.style.width = size + "px";
    star.style.height = size + "px";
    star.style.left = x + "px";
    star.style.top = y + "px";

    container.appendChild(star);

    stars.push({
      el: star,
      baseSize: size,
      twinkleSpeed: randomBetween(0.002, 0.006),
      phase: Math.random() * Math.PI * 2
    });
  }
}

function animateStars() {
  stars.forEach(star => {

    star.phase += star.twinkleSpeed;

    // Smooth sinusoidal opacity
    const opacity = 0.4 + Math.sin(star.phase) * 0.4;
    star.el.style.opacity = Math.min(opacity, 0.8);

    // Subtle size pulse
    const scale = 0.9 + Math.sin(star.phase) * 0.1;
    star.el.style.transform = `scale(${scale})`;
  });

  requestAnimationFrame(animateStars);
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

createStars();
animateStars();

window.addEventListener("resize", createStars);

// subtle parallax (calm)
window.addEventListener("scroll", () => {
  container.style.transform = `translateY(${window.scrollY * 0.1}px)`;
});
