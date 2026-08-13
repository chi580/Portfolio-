// Break each hero word into per-letter spans that slide/settle into place,
// echoing the puzzle-tile mechanic of the featured project.
document.querySelectorAll(".tileWord").forEach((wordEl) => {
  const word = wordEl.dataset.word || "";
  let delay = 0;
  word.split("").forEach((ch) => {
    const span = document.createElement("span");
    span.className = "tileChar";
    span.style.animationDelay = delay + "ms";
    span.textContent = ch === " " ? "\u00A0" : ch;
    wordEl.appendChild(span);
    delay += 35;
  });
});
