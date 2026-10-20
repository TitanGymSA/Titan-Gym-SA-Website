import { useId } from "react";

type ArrowDirection = "right" | "left" | "up" | "down" | "up-right";

export function ArrowIcon({ direction = "right" }: { direction?: ArrowDirection }) {
  return (
    <svg className={`icon icon--arrow icon--arrow-${direction}`} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M0 0h24v24H0z" fill="none" />
      <path fill="currentColor" d="M9.31 6.71a.996.996 0 0 0 0 1.41L13.19 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L10.72 6.7c-.38-.38-1.02-.38-1.41.01" />
    </svg>
  );
}

const phonePath = "M10.77 14.3L9.7 13.21c-.78-.78-1.17-1.16-1.32-1.64a2 2 0 0 1-.08-.67c.02-.5.3-.98.86-1.92c.43-.73.65-1.1.7-1.5a2 2 0 0 0 0-.54a4 4 0 0 0-.69-1.49L7.8 3.08c-.47-.8-.7-1.2-1.1-1.31s-.8.12-1.61.58l-1.14.64c-.46.26-.69.4-.93.68c-.24.3-.3.48-.4.83c-.63 1.97-1.22 6.7 4.47 12.4c5.69 5.68 10.42 5.11 12.4 4.49c.36-.12.54-.17.83-.41c.3-.24.43-.48.7-.94l.63-1.14c.46-.8.69-1.21.58-1.61s-.51-.63-1.32-1.1l-2.4-1.4c-.72-.41-1.08-.62-1.47-.68a2 2 0 0 0-.57 0c-.4.06-.75.28-1.47.7c-.93.57-1.4.85-1.9.87a2 2 0 0 1-.7-.08c-.47-.15-.85-.54-1.62-1.3";

export function EmailIcon() {
  return (
    <svg className="icon icon--email" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
      <path d="M0 0h12v12H0z" fill="none" />
      <path fill="currentColor" d="M11 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm0 1.707L6.715 7.002a1 1 0 0 1-1.419.002L1 2.707v6.585l2.146-2.146a.5.5 0 1 1 .708.708L1.706 10h8.587L8.146 7.854a.5.5 0 1 1 .708-.708L11 9.293zM10.293 2H1.707l4.298 4.298z" />
    </svg>
  );
}

export function PhoneIcon() {
  return (
    <svg className="icon icon--phone" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M0 0h24v24H0z" fill="none" />
      <g fill="none">
        <path fill="currentColor" d={phonePath} opacity=".2" />
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={phonePath} />
      </g>
    </svg>
  );
}

export function InstagramIcon() {
  return (
    <svg className="icon icon--instagram" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M0 0h24v24H0z" fill="none" />
      <g fill="none">
        <path stroke="currentColor" strokeWidth="2" d="M3 11c0-3.771 0-5.657 1.172-6.828S7.229 3 11 3h2c3.771 0 5.657 0 6.828 1.172S21 7.229 21 11v2c0 3.771 0 5.657-1.172 6.828S16.771 21 13 21h-2c-3.771 0-5.657 0-6.828-1.172S3 16.771 3 13z" />
        <circle cx="16.5" cy="7.5" r="1.5" fill="currentColor" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      </g>
    </svg>
  );
}

export function FacebookIcon() {
  const clipId = useId();
  return (
    <svg className="icon icon--facebook" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M0 0h24v24H0z" fill="none" />
      <g fill="none">
        <g clipPath={`url(#${clipId})`}>
          <path fill="currentColor" fillRule="evenodd" d="M0 12.067C0 18.034 4.333 22.994 10 24v-8.667H7V12h3V9.333c0-3 1.933-4.666 4.667-4.666c.866 0 1.8.133 2.666.266V8H15.8c-1.467 0-1.8.733-1.8 1.667V12h3.2l-.533 3.333H14V24c5.667-1.006 10-5.966 10-11.933C24 5.43 18.6 0 12 0S0 5.43 0 12.067" clipRule="evenodd" />
        </g>
        <defs><clipPath id={clipId}><path fill="currentColor" d="M0 0h24v24H0z" /></clipPath></defs>
      </g>
    </svg>
  );
}

export function YouTubeIcon() {
  return (
    <svg className="icon icon--youtube" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M0 0h16v16H0z" fill="none" />
      <path fill="currentColor" d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104l.022.26l.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105l-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006l-.087-.004l-.171-.007l-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103l.003-.052l.008-.104l.022-.26l.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007l.172-.006l.086-.003l.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
    </svg>
  );
}
