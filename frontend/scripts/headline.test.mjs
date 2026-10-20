import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";
import { test } from "node:test";

const script = await readFile(new URL("../public/headline.js", import.meta.url), "utf8");

for (const widthFactor of [1, 1.35]) {
  test(`headline packs visible letters without overlap at font width factor ${widthFactor}`, async () => {
    const specs = {
      make: ["MAKE", 205, 74, 0], feeling: ["FEELING", 440, 74, 1],
      good: ["GOOD", 310, 74, 2], connector: ["PART OF YOUR", 620, 73, 0],
      routine: ["ROUTINE", 500, 74, 2],
    };
    const nodes = Object.entries(specs).map(([key, [label]]) => ({
      dataset: { word: key }, textContent: label, attributes: {},
      setAttribute(name, value) { this.attributes[name] = Number(value); },
    }));
    const svg = { clientWidth: 800, querySelectorAll: () => nodes, setAttribute() {} };
    runInNewContext(script, {
      window: { addEventListener() {} },
      getComputedStyle: () => ({ fontStyle: "normal", fontWeight: "700", fontFamily: "Impact" }),
      document: {
        readyState: "complete", fonts: { ready: Promise.resolve() },
        querySelectorAll: () => [svg],
        createElement: () => ({ getContext: () => ({
          measureText(label) {
            const [, width, ascent, descent] = Object.values(specs).find(([text]) => text === label);
            return { actualBoundingBoxLeft: 2, actualBoundingBoxRight: width * widthFactor - 2,
              actualBoundingBoxAscent: ascent, actualBoundingBoxDescent: descent };
          },
        }) }),
      },
    });
    await Promise.resolve();
    const rects = Object.fromEntries(nodes.map((node) => {
      const [, width, ascent, descent] = specs[node.dataset.word];
      const scale = node.attributes["font-size"] / 100;
      const x = node.attributes.x - 2 * scale;
      const y = node.attributes.y - ascent * scale;
      return [node.dataset.word, { x, y, width: width * widthFactor * scale,
        height: (ascent + descent) * scale, bottom: y + (ascent + descent) * scale }];
    }));
    const { make, feeling, good, connector, routine } = rects;
    const close = (a, b) => assert.ok(Math.abs(a - b) < .001, `${a} must match ${b}`);
    assert.ok(make.height < feeling.height * .35);
    close((make.x - feeling.x) * svg.clientWidth / (good.x + good.width - feeling.x), 2);
    assert.ok(feeling.y - make.bottom > 0 && feeling.y - make.bottom <= 2);
    assert.ok(good.height < feeling.height * .8);
    close(good.y, feeling.y);
    close(connector.x + connector.width / 2, good.x + good.width / 2);
    assert.ok(connector.width < good.width && connector.width >= good.width * .85);
    close(connector.bottom, feeling.bottom);
    assert.ok(connector.y > good.bottom);
    assert.ok(good.x > feeling.x + feeling.width);
    close(routine.x, feeling.x);
    close(routine.x + routine.width, good.x + good.width);
    assert.ok(routine.y - feeling.bottom > 0 && routine.y - feeling.bottom <= 5);
  });
}
