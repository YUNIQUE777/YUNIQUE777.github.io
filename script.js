  // Disable right-click
  window.addEventListener('contextmenu', e => e.preventDefault());

  // Disable specific key combinations
  window.addEventListener('keydown', e => {
    if (
      e.key === "F12" ||
      (e.ctrlKey && e.key === "u") ||
      (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase()))
    ) {
      e.preventDefault();
    }
  });

const correct = ["73", "99", "01111001", "2", "TE9WRQ==", "suraksha"];
let solved = [false, false, false, false, false, false];

function check(index, inputId) {
  const val = document.getElementById(inputId).value.trim();
  const resultId = "r" + (index === 5 ? 3 : (index < 2 ? index + 1 : index + 2)) + "r";

  if (index === 5) {
    if (val.toLowerCase() === correct[index]) {
      solved[index] = true;
      document.getElementById(resultId).innerText = "✅ Nah Bro It is lumanti after all!!";
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
