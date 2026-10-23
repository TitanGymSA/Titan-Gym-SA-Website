(() => {
  function fitAcademyHeadlines() {
    const context = document.createElement("canvas").getContext("2d");
    if (!context) return;
    for (const svg of document.querySelectorAll("[data-academy-headline]")) {
      const words = {};
      for (const text of svg.querySelectorAll("text[data-word]")) {
        const font = getComputedStyle(text);
        context.font = `${font.fontStyle} ${font.fontWeight} 100px ${font.fontFamily}`;
        const ink = context.measureText(text.textContent);
        words[text.dataset.word] = {
          text,
          left: -ink.actualBoundingBoxLeft,
          top: -ink.actualBoundingBoxAscent,
          width: ink.actualBoundingBoxLeft + ink.actualBoundingBoxRight,
          height: ink.actualBoundingBoxAscent + ink.actualBoundingBoxDescent,
        };
      }
      const { big, futures, strong, foundations } = words;
      if (![big, futures, strong, foundations].every((word) => word && word.width > 0 && word.height > 0)) continue;

      function place(word, x, top, scale) {
        word.text.setAttribute("font-size", String(100 * scale));
        word.text.setAttribute("x", String(x - word.left * scale));
        word.text.setAttribute("y", String(top - word.top * scale));
        return top + word.height * scale;
      }

      // Rotate visible ink, then fit each lower line by size without stretching glyphs.
      const gap = 6;
      const bigScale = futures.height / big.width;
      const bigWidth = big.height * bigScale;
      place(big, 0, 0, bigScale);
      big.text.setAttribute("transform", `translate(0 ${futures.height}) rotate(-90)`);
      place(futures, bigWidth + gap, 0, 1);
      const width = bigWidth + gap + futures.width;
      const strongBottom = place(strong, 0, futures.height + gap, width / strong.width);
      const bottom = place(foundations, 0, strongBottom + gap, width / foundations.width);
      svg.setAttribute("viewBox", `0 0 ${width} ${bottom}`);
    }
  }

  window.addEventListener("titan-academy-headline-ready", fitAcademyHeadlines);
  window.addEventListener("resize", fitAcademyHeadlines);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fitAcademyHeadlines, { once: true });
  else fitAcademyHeadlines();
  document.fonts.ready.then(fitAcademyHeadlines);
})();
