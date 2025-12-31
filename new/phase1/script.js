const scene1 = document.getElementById("scene1");
const scene2 = document.getElementById("scene2");

/* Scene 1 after silence */
setTimeout(() => {
  scene1.classList.remove("hidden");
}, 1500);

/* Move to fake choice */
setTimeout(() => {
  scene1.classList.add("hidden");
  scene2.classList.remove("hidden");
}, 4500);

/* COUNTDOWN */
function startCountdown() {
  scene2.classList.add("hidden");

  const screen = document.getElementById("countdownScreen");
  const number = document.getElementById("countNumber");

  screen.style.display = "flex";
  let count = 3;

  const timer = setInterval(() => {
    number.textContent = count;
    number.style.animation = "none";
    number.offsetHeight;
    number.style.animation = "pop 1s ease-in-out";

    count--;

    if (count < 0) {
      clearInterval(timer);
      screen.style.display = "none";

      window.location.href = "celebration.html";
      
    }
  }, 1000);
}
