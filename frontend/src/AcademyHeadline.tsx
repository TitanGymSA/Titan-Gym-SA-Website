import { useEffect } from "react";

export function AcademyHeadline() {
  useEffect(() => {
    window.dispatchEvent(new Event("titan-academy-headline-ready"));
  }, []);

  return (
    <h1 className="academy-headline" id="academy-title">
      <span className="visually-hidden">Big futures, strong foundations</span>
      <svg data-academy-headline="" viewBox="0 0 640 320" aria-hidden="true" focusable="false">
        <text data-word="big" x="0" y="36" fontSize="48" transform="translate(0 112) rotate(-90)">BIG</text>
        <text data-word="futures" x="52" y="112" fontSize="136">FUTURES</text>
        <text data-word="strong" x="0" y="244" fontSize="163">STRONG</text>
        <text data-word="foundations" x="0" y="320" fontSize="85">FOUNDATIONS</text>
      </svg>
    </h1>
  );
}
