(() => {
  function initializeGallery() {
    const gallery = document.getElementById("gallery");
    if (!gallery || gallery.dataset.galleryReady === "true") return;
    const dialog = gallery.querySelector(".gallery-viewer");
    const thumbnails = [...document.querySelectorAll(".gallery-thumbnail")];
    if (!dialog || !thumbnails.length) return;
    gallery.dataset.galleryReady = "true";

    const image = dialog.querySelector("[data-gallery-image]");
    const status = dialog.querySelector("[data-gallery-status]");
    let currentIndex = 0;
    let opener;

    function showPhoto(index) {
      currentIndex = (index + thumbnails.length) % thumbnails.length;
      const photo = thumbnails[currentIndex].dataset;
      image.src = photo.gallerySrc;
      image.alt = photo.galleryAlt;
      status.textContent = `Photo ${currentIndex + 1} of ${thumbnails.length}: ${photo.galleryAlt}`;
    }

    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener("click", () => {
        if (dialog.open) return;
        opener = thumbnail;
        showPhoto(index);
        dialog.showModal();
      });
    });

    dialog.querySelector("[data-gallery-close]").addEventListener("click", () => dialog.close());
    dialog.querySelector("[data-gallery-previous]").addEventListener("click", () => showPhoto(currentIndex - 1));
    dialog.querySelector("[data-gallery-next]").addEventListener("click", () => showPhoto(currentIndex + 1));
    dialog.addEventListener("keydown", (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        showPhoto(currentIndex + (event.key === "ArrowRight" ? 1 : -1));
      }
    });
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        event.stopPropagation();
        dialog.close();
      }
    });
    dialog.addEventListener("close", () => opener?.focus({ preventScroll: true }));
  }

  window.addEventListener("titan-gallery-ready", initializeGallery);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initializeGallery, { once: true });
  else initializeGallery();
})();
