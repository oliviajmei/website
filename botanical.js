(() => {
  const collage = document.createElement("div");
  collage.className = "botanical-collage";
  collage.setAttribute("aria-hidden", "true");
  collage.innerHTML = `
    <img class="botanical-layer lotus" src="images/lotus-veins.jpg" alt="">
    <img class="botanical-layer vine" src="images/climbing-vine.jpg" alt="">
    <img class="botanical-layer birds" src="images/botanical-birds.jpg" alt="">
    <img class="botanical-layer koi" src="images/koi-watercolor.jpg" alt="">`;
  document.body.prepend(collage);

  const leafCount = 8;
  const vine = document.createElement("aside");
  vine.className = "scroll-vine";
  vine.setAttribute("aria-hidden", "true");
  vine.innerHTML = `
    <svg viewBox="0 0 100 1000" preserveAspectRatio="none">
      <path class="vine-stem-track" d="M50 0 C18 105 82 168 45 286 S24 432 54 520 S78 690 43 802 S28 923 50 1000"></path>
      <path class="vine-stem-growth" d="M50 0 C18 105 82 168 45 286 S24 432 54 520 S78 690 43 802 S28 923 50 1000"></path>
    </svg>
    ${Array.from({ length: leafCount }, (_, index) => {
      const side = index % 2 === 0 ? "left" : "right";
      const top = 8 + index * (84 / (leafCount - 1));
      const threshold = (index + 1) / (leafCount + 1);
      return `<span class="growth-leaf ${side}" data-threshold="${threshold}" style="top:${top}%"><img src="images/lotus-veins.jpg" alt=""></span>`;
    }).join("")}`;
  document.body.append(vine);

  const growth = vine.querySelector(".vine-stem-growth");
  const growthLength = growth.getTotalLength();
  growth.style.strokeDasharray = growthLength;
  const leaves = [...vine.querySelectorAll(".growth-leaf")];
  let scheduled = false;

  function updateGrowth() {
    scheduled = false;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
    growth.style.strokeDashoffset = growthLength * (1 - progress);
    leaves.forEach((leaf) => {
      leaf.classList.toggle("is-grown", progress >= Number(leaf.dataset.threshold));
    });
  }

  function scheduleGrowth() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(updateGrowth);
  }

  window.addEventListener("scroll", scheduleGrowth, { passive: true });
  window.addEventListener("resize", scheduleGrowth);
  window.addEventListener("load", scheduleGrowth);
  scheduleGrowth();
})();
