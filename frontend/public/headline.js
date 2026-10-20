(() => {
  function fitHeadlines() {
    const context = document.createElement("canvas").getContext("2d");
    if (!context) return;
    for (const svg of document.querySelectorAll("[data-titan-headline]")) {
      const words = {};
      for (const text of svg.querySelectorAll("text[data-word]")) {
        const font = getComputedStyle(text);
        context.font = `${font.fontStyle} ${font.fontWeight} 100px ${font.fontFamily}`;
        const ink = context.measureText(text.textContent);
        // SVG getBBox includes font-cell space; use visible glyph edges so
        // adjacent words sit close without changing their proportions.
        words[text.dataset.word] = { text, box: {
          x: -ink.actualBoundingBoxLeft,
          y: -ink.actualBoundingBoxAscent,
          width: ink.actualBoundingBoxLeft + ink.actualBoundingBoxRight,
          height: ink.actualBoundingBoxAscent + ink.actualBoundingBoxDescent,
        } };
      }
      const { make, feeling, good, connector, routine } = words;
      if (![make, feeling, good, connector, routine].every((word) => word.box.width > 0)) continue;

      function place(word, x, top, scale = 1) {
        word.text.setAttribute("font-size", String(100 * scale));
        word.text.setAttribute("x", String(x - word.box.x * scale));
        word.text.setAttribute("y", String(top - word.box.y * scale));
        return top + word.box.height * scale;
      }

      const stackGap = 4;
      const goodScale = (feeling.box.height - stackGap) /
        (good.box.height + good.box.width / connector.box.width * connector.box.height);
      const goodWidth = good.box.width * goodScale;
      const goodX = feeling.box.width + 12;
      const width = goodX + goodWidth;
      const unitsPerPixel = width / (svg.clientWidth || width);
      const makeBottom = place(make, 2 * unitsPerPixel, 0, .30);
      const mainTop = makeBottom + 1;
      const mainBottom = place(feeling, 0, mainTop);
      place(good, goodX, mainTop, goodScale);
      const connectorScale = goodWidth / connector.box.width * .95;
      const connectorWidth = connector.box.width * connectorScale;
      place(connector, goodX + (goodWidth - connectorWidth) / 2,
        mainBottom - connector.box.height * connectorScale, connectorScale);
      const bottom = place(routine, 0, mainBottom + 4, width / routine.box.width);
      svg.setAttribute("viewBox", `0 0 ${width} ${bottom}`);
    }
  }

  window.addEventListener("titan-headline-ready", fitHeadlines);
  window.addEventListener("resize", fitHeadlines);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fitHeadlines, { once: true });
  else fitHeadlines();
  document.fonts.ready.then(fitHeadlines);
})();
