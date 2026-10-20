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
