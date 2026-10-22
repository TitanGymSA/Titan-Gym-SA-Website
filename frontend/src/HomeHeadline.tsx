import { useEffect } from "react";

export function HomeHeadline() {
  useEffect(() => {
    window.dispatchEvent(new Event("titan-headline-ready"));
  }, []);

  return (
    <h1>
      <span className="visually-hidden">Make feeling good part of your routine</span>
      <svg className="home-hero__headline-art" data-titan-headline="" viewBox="0 0 640 234" aria-hidden="true" focusable="false">
        <text data-word="make" x="2" y="29" fontSize="36">MAKE</text>
        <text data-word="feeling" x="0" y="120" fontSize="120">FEELING</text>
        <text data-word="good" x="420" y="89" fontSize="80">GOOD</text>
        <text data-word="connector" x="425" y="119" fontSize="30">PART OF YOUR</text>
        <text data-word="routine" x="0" y="230" fontSize="140">ROUTINE</text>
      </svg>
    </h1>
  );
}
