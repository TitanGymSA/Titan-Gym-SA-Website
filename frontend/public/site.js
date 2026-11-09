const menuButton = document.querySelector(".menu-toggle");
const navigation = document.getElementById("primary-navigation");

function setMenuOpen(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  navigation.classList.toggle("site-nav--open", open);
}

menuButton.addEventListener("click", () => {
  setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
});

const membershipSection = document.getElementById("membership");
if (membershipSection) {
  for (const link of document.querySelectorAll('a[href="#membership"], a[href="./index.html#membership"]')) {
    link.addEventListener("click", (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      setMenuOpen(false);
      history.replaceState(null, "", "#membership");
      membershipSection.focus({ preventScroll: true });
      membershipSection.scrollIntoView({ behavior: "instant", block: "start" });
    });
  }
}

if (document.getElementById("gallery")) {
  for (const link of document.querySelectorAll('a[href="#gallery"]')) {
    link.addEventListener("click", (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      setMenuOpen(false);
    });
  }
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuButton.focus();
  }
});

// The production site is static HTML, so handle expanded coaching cards here
// instead of relying on React event handlers that are not hydrated in production.
document.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target : event.target?.parentElement;
  if (!target) return;
  const offer = target.closest(".coaching-offer");
  if (!offer?.open || target.closest("summary")) return;
  if (target.closest("a, button, input, select, textarea, [contenteditable='true']")) return;
  offer.open = false;
});

// Request nearby lazy images early while retaining responsive candidate selection.
if (typeof IntersectionObserver !== "undefined") {
  const imageObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.loading = "eager";
      imageObserver.unobserve(entry.target);
    }
  }, { rootMargin: "600px 0px" });
  for (const image of document.querySelectorAll('img[loading="lazy"]')) {
    imageObserver.observe(image);
  }
}
