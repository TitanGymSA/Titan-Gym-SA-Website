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
