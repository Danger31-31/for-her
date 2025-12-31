let current = "screen-password";
const correctPassword = "draculla";
const secretPassword = "boss";

let tapCount = 0;
let longPressTimer = null;
let legendUnlocked = false;

/* SCREEN SWITCH */
function show(id){
  document.getElementById(current).classList.remove("active");
  document.getElementById(id).classList.add("active");
  current = id;

  if(id === "screen-letter" && legendUnlocked){
    document.getElementById("legendBonus").style.display = "block";
  }
}

/* PASSWORD CHECK */
function checkPassword(){
  const val = document.getElementById("passwordInput").value.trim();
  const music = document.getElementById("bgMusic");

  if(val === correctPassword){
    confetti();
    music?.play();
    show("screen-tap");

  }else if(val === secretPassword){
    legendUnlocked = true;
    confetti();
    music?.play();
    show("screen-legend");

  }else{
    alert("Wrong code 😅 Try again");
  }
}

/* DOM READY */
document.addEventListener("DOMContentLoaded",()=>{

  document.body.addEventListener("click",e=>{
    tapCount++;
    tapGlow(e);

    if(tapCount === 10){
      document.getElementById("bonus").style.display="block";
      confetti();
    }
  });

  document.getElementById("screen-tap")
    ?.addEventListener("click",()=>show("screen-gift"));

  document.querySelector(".gift")
    ?.addEventListener("click",()=>{
      confetti();
      show("screen-letter");
    });

  const letter=document.getElementById("screen-letter");
  if(letter){
    letter.addEventListener("mousedown",startLongPress);
    letter.addEventListener("touchstart",startLongPress);
    letter.addEventListener("mouseup",cancelLongPress);
    letter.addEventListener("touchend",cancelLongPress);
  }
});

/* LONG PRESS */
function startLongPress(){
  longPressTimer=setTimeout(()=>{
    document.querySelector(".secret-long").style.display="block";
    confetti();
  },2000);
}
function cancelLongPress(){ clearTimeout(longPressTimer); }

/* TAP GLOW */
function tapGlow(e){
  const g=document.createElement("div");
  g.className="tap-glow";
  g.style.left=e.clientX+"px";
  g.style.top=e.clientY+"px";
  document.body.appendChild(g);
  setTimeout(()=>g.remove(),600);
}

/* SECRET BUTTON */
function unlockSecret(){
  document.getElementById("secret").style.display="block";
  confetti();
}

function nextScreen(id){ show(id); }
function restart(){ location.reload(); }

/* CONFETTI */
function confetti(){
  for(let i=0;i<30;i++){
    const c=document.createElement("div");
    c.style.position="fixed";
    c.style.width="8px";
    c.style.height="8px";
    c.style.background=`hsl(${Math.random()*360},100%,50%)`;
    c.style.left=Math.random()*100+"vw";
    c.style.top="-10px";
    c.style.zIndex="9999";
    document.body.appendChild(c);

    let fall=setInterval(()=>c.style.top=(c.offsetTop+5)+"px",20);
    setTimeout(()=>{clearInterval(fall);c.remove();},2000);
  }
}
let memIndex = 0;
const memories = document.querySelectorAll(".memory");

function showMemory(i){
  memories.forEach(m => m.classList.remove("active"));
  memories[i].classList.add("active");
}

function nextMemory(){
  memIndex = (memIndex + 1) % memories.length;
  showMemory(memIndex);
}

function prevMemory(){
  memIndex = (memIndex - 1 + memories.length) % memories.length;
  showMemory(memIndex);
}

/* TAP IMAGE TO SHOW CAPTION */
document.addEventListener("DOMContentLoaded",()=>{
  document.querySelectorAll(".memory img").forEach(img=>{
    img.addEventListener("click",()=>{
      const cap = img.nextElementSibling;
      cap.style.display = cap.style.display === "block" ? "none" : "block";
    });
  });
});
const randomMemories = [
  "Everything",
  "Behen Kiske hai/Bhai Kiske Hai.",
  "You Showed up When it Mattered.",
  "The Day i got You."
];

function randomMemory(){
  const p = document.getElementById("randomText");
  p.innerText = randomMemories[Math.floor(Math.random()*randomMemories.length)];
  p.style.display = "block";
  confetti();
}
let voicePlayed = false;

function playVoice(){
  if(voicePlayed) return;
  document.getElementById("voiceNote").play();
  voicePlayed = true;
}
let awarenessTimer = setTimeout(()=>{
  const t = document.getElementById("awarenessText");
  if(t) t.style.opacity = "1";
}, 10000); // 15 seconds
function delayedAction(){
  setTimeout(()=>{
    document.getElementById("delayedMsg").style.display="block";
    confetti();
  },5000); // 5 sec delay
}
function quizAnswer(ans){
  const r = document.getElementById("quizResult");
  if(ans==="yes") r.innerText="or krtu jao 🤍";
  if(ans==="sometimes") r.innerText="jndo bolke nai krtu zyada";
  if(ans==="no") r.innerText="ab to krna padta";
  confetti();
}
window.addEventListener("beforeunload",(e)=>{
  e.preventDefault();
  e.returnValue = "You’re always welcome back.";
});
const music = document.getElementById("bgMusic");

music.addEventListener("loadedmetadata", () => {
  music.currentTime = 30; // skip first 30 seconds
  music.play();
});
const bgMusic = document.getElementById("bgMusic");
  const voiceNote = document.getElementById("voiceNote");

  // Start background music from 30 sec
  bgMusic.addEventListener("loadedmetadata", () => {
    bgMusic.currentTime = 30;
    bgMusic.volume = 1; // full volume
    bgMusic.play();
  });

  function fadeVolume(audio, target, duration = 500) {
    const step = 0.05;
    const interval = duration / (Math.abs(audio.volume - target) / step);

    const fade = setInterval(() => {
      if (audio.volume < target) {
        audio.volume = Math.min(audio.volume + step, target);
      } else {
        audio.volume = Math.max(audio.volume - step, target);
      }

      if (audio.volume === target) clearInterval(fade);
    }, interval);
  }

  function playVoice() {
    // Lower background music
    fadeVolume(bgMusic, 0.2, 600); // duck to 20%

    voiceNote.currentTime = 0;
    voiceNote.play();

    // Restore music after voice ends
    voiceNote.onended = () => {
      fadeVolume(bgMusic, 1, 800); // back to full
    };
  }
  function showAwareness(choice) {
    const text = document.getElementById("awarenessText");
    text.style.opacity = "1";

    if (choice === 'yes') {
      text.innerText = "Right Choice...The Password is BOSS";
    } else {
      text.innerText = "You Lost the Password";
    }
  }