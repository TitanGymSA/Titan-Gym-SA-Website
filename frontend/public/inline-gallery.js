(() => {
  function initializeInlineGalleries() {
    for (const gallery of document.querySelectorAll("[data-inline-gallery]")) {
      if (gallery.dataset.inlineGalleryReady === "true") continue;
      const slides = [...gallery.querySelectorAll("[data-media-slide]")];
      const thumbnails = [...gallery.querySelectorAll("[data-media-thumbnail]")];
      if (!slides.length) continue;
      gallery.dataset.inlineGalleryReady = "true";
      const status = gallery.querySelector("[data-media-status]");
      const thumbnailStrip = gallery.querySelector(".inline-media-gallery__thumbnails");
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
      let currentIndex = 0;

      // Touch keeps native scrolling and page gestures. Mouse dragging begins
      // after a small movement, so a normal click still selects a thumbnail.
      if (thumbnailStrip) {
        let drag;
        let suppressClick = false;
        thumbnailStrip.addEventListener("pointerdown", (event) => {
          if (event.pointerType !== "mouse" || event.button !== 0 || !event.isPrimary) return;
          suppressClick = false;
          drag = { pointerId: event.pointerId, x: event.clientX, scrollLeft: thumbnailStrip.scrollLeft, moved: false };
        });
        thumbnailStrip.addEventListener("pointermove", (event) => {
          if (!drag || event.pointerId !== drag.pointerId) return;
          if (event.buttons !== 1) { finishDrag(event); return; }
          const distance = event.clientX - drag.x;
          if (!drag.moved && Math.abs(distance) < 6) return;
          if (!drag.moved) {
            drag.moved = true;
            thumbnailStrip.setPointerCapture(event.pointerId);
            thumbnailStrip.classList.add("is-dragging");
          }
          event.preventDefault();
          thumbnailStrip.scrollLeft = drag.scrollLeft - distance;
        });
        function finishDrag(event) {
          if (!drag || event.pointerId !== drag.pointerId) return;
          suppressClick = drag.moved;
          drag = undefined;
          thumbnailStrip.classList.remove("is-dragging");
          if (thumbnailStrip.hasPointerCapture(event.pointerId)) thumbnailStrip.releasePointerCapture(event.pointerId);
        }
        thumbnailStrip.addEventListener("pointerup", finishDrag);
        thumbnailStrip.addEventListener("pointercancel", finishDrag);
        thumbnailStrip.addEventListener("lostpointercapture", finishDrag);
        thumbnailStrip.addEventListener("pointerleave", (event) => {
          if (drag && !drag.moved) finishDrag(event);
        });
        thumbnailStrip.addEventListener("click", (event) => {
          if (!suppressClick || event.detail === 0) return;
          suppressClick = false;
          event.preventDefault();
          event.stopPropagation();
        }, true);
        thumbnailStrip.addEventListener("dragstart", (event) => event.preventDefault());
      }

      function updatePlayback() {
        slides.forEach((slide, index) => {
          const video = slide.querySelector("video");
          if (!video) return;
          if (index === currentIndex && !reducedMotion.matches && !document.hidden) {
            video.play().catch(() => {});
          } else video.pause();
        });
      }

      function showSlide(index, announce = true) {
        currentIndex = (index + slides.length) % slides.length;
        slides.forEach((slide, slideIndex) => {
          slide.hidden = slideIndex !== currentIndex;
          slide.setAttribute("aria-hidden", String(slideIndex !== currentIndex));
        });
        thumbnails.forEach((thumbnail, thumbnailIndex) => {
          thumbnail.setAttribute("aria-pressed", String(thumbnailIndex === currentIndex));
        });
        if (announce) status.textContent = `Slide ${currentIndex + 1} of ${slides.length}`;
        updatePlayback();
      }

      gallery.querySelector("[data-media-previous]").addEventListener("click", () => showSlide(currentIndex - 1));
      gallery.querySelector("[data-media-next]").addEventListener("click", () => showSlide(currentIndex + 1));
      thumbnails.forEach((thumbnail, index) => thumbnail.addEventListener("click", () => showSlide(index)));
      gallery.addEventListener("keydown", (event) => {
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          showSlide(currentIndex + (event.key === "ArrowRight" ? 1 : -1));
        }
      });
      reducedMotion.addEventListener("change", updatePlayback);
      document.addEventListener("visibilitychange", updatePlayback);
      showSlide(0, false);
    }
  }

  window.addEventListener("titan-inline-gallery-ready", initializeInlineGalleries);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initializeInlineGalleries, { once: true });
  else initializeInlineGalleries();
})();
