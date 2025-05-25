
const UNLOCK_SECONDS = 100 * 60 * 60;

function getElapsedTime() {
  return parseInt(localStorage.getItem("elapsedTime") || "0");
}

function setElapsedTime(seconds) {
  localStorage.setItem("elapsedTime", seconds.toString());
}

let elapsedTime = getElapsedTime();

const timer = setInterval(() => {
  elapsedTime += 1;
  setElapsedTime(elapsedTime);

  if (elapsedTime >= UNLOCK_SECONDS) {
    window.removeEventListener("contextmenu", blockContextMenu, true);
    window.removeEventListener("keydown", blockKeys, true);
    console.log("🔓 Dev tools and right-click enabled after 100 hours!");
    clearInterval(timer);
  }
}, 1000);

function blockContextMenu(e) {
  e.preventDefault();
}
window.addEventListener("contextmenu", blockContextMenu, true);

function blockKeys(e) {
  if (
    e.key === "F12" || 
    (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
    (e.ctrlKey && e.key === "U")
  ) {
    e.preventDefault();
  }
}
window.addEventListener("keydown", blockKeys, true);

const correct = ["73", "99", "01111001", "2", "TE9WRQ==", "khate"];
let solved = [false, false, false, false, false, false];

function check(index, inputId) {
  const val = document.getElementById(inputId).value.trim();
  const resultId = "r" + (index === 5 ? 3 : (index < 2 ? index + 1 : index + 2)) + "r";

  if (index === 5) {
    if (val.toLowerCase() === correct[index]) {
      solved[index] = true;
      document.getElementById(resultId).innerText = "✅ Correct! You found her name!";
      document.getElementById(inputId).disabled = true;
      document.getElementById(inputId).style.backgroundColor = "#333";
      document.getElementById("final-reveal").style.display = "block";
    } else {
      document.getElementById(resultId).innerText = "❌ Try again.";
    }
    return;
  }

  if (val === correct[index]) {
    solved[index] = true;
    document.getElementById(resultId).innerText = "✅ Correct!";
    document.getElementById(inputId).disabled = true;
    document.getElementById(inputId).style.backgroundColor = "#333";

    const unlockOrder = ["r2", "r4", "r5", "r6", "r3"];
    if (index < 5) {
      const nextId = unlockOrder[index];
      document.getElementById(nextId).classList.remove("hidden"); // 🔄 Reveal next riddle
    }
  } else {
    document.getElementById(resultId).innerText = "❌ Try again.";
  }
}
