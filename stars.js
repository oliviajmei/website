// reusable animated star background

(function () {

  const existing = document.getElementById("dot-container");
  if (existing) existing.remove();

  const container = document.createElement("div");
  container.id = "dot-container";
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "0";
  container.style.width = "100%";
  container.style.height = "100%";
  container.style.pointerEvents = "none";
  container.style.zIndex = "-1";
  container.style.willChange = "transform";

  document.body.appendChild(container);

  const STAR_COUNT = 70;
  const stars = [];

  function createStar() {
    const star = document.createElement("div");
    const size = Math.random() * 10 + 5;

    star.style.position = "absolute";
    star.style.borderRadius = "50%";
    star.style.background = "white";
    star.style.width = size + "px";
    star.style.height = size + "px";
    star.style.left = Math.random() * 100 + "vw";
    star.style.top = Math.random() * 200 + "vh";
    star.style.opacity = Math.random() * 0.5 + 0.3; // capped at 0.8
    star.style.transition = "opacity 2s ease-in-out";

    container.appendChild(star);
    stars.push(star);
  }

  function twinkle() {
    stars.forEach(star => {
      const newOpacity = Math.random() * 0.5 + 0.3;
      star.style.opacity = newOpacity;
    });
  }

  function init() {
    for (let i = 0; i < STAR_COUNT; i++) {
      createStar();
    }

    setInterval(twinkle, 3000);
  }

  window.addEventListener("scroll", () => {
    container.style.transform = `translateY(${window.scrollY * 0.15}px)`;
  });

  window.addEventListener("resize", () => {
    container.innerHTML = "";
    stars.length = 0;
    init();
  });

  init();

})();
