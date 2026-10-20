import { useEffect } from "react";
import { ArrowIcon } from "./Icons";

type MediaSlide =
  | { kind: "image"; src: string; alt: string; fit?: "contain" | "cover" }
  | { kind: "video"; src: string; poster: string; alt: string; width: number; height: number; fit?: "contain" | "cover" };

export function InlineMediaGallery({ title, slides, placeholder = false }: { title: string; slides: readonly MediaSlide[]; placeholder?: boolean }) {
  useEffect(() => {
    window.dispatchEvent(new Event("titan-inline-gallery-ready"));
  }, []);

  return (
    <article className="feature-card feature-card--primary inline-media-gallery" data-inline-gallery="" role="region" aria-roledescription="carousel" aria-label={title}>
      <h3>{title}</h3>
      <div className="feature-card__media">
        {slides.map((slide, index) => (
          <div className="inline-media-gallery__slide" data-media-slide="" key={slide.src} hidden={index !== 0} aria-hidden={index !== 0} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${slides.length}`}>
            {slide.kind === "video" ? (
              <video autoPlay={index === 0} loop muted playsInline preload="none" poster={slide.poster} width={slide.width} height={slide.height} aria-label={slide.alt} style={slide.fit === "contain" ? { objectFit: "contain", objectPosition: "center" } : undefined}>
                <source src={slide.src} type="video/mp4" media="(prefers-reduced-motion: no-preference)" />
              </video>
            ) : <img src={slide.src} alt={slide.alt} loading="lazy" decoding="async" style={slide.fit === "contain" ? { objectFit: "contain", objectPosition: "center" } : undefined} />}
          </div>
        ))}
        <button className="inline-media-gallery__arrow inline-media-gallery__arrow--previous" type="button" data-media-previous="" aria-label={`Previous ${title.toLowerCase()} photo or video`}><ArrowIcon direction="left" /></button>
        <button className="inline-media-gallery__arrow inline-media-gallery__arrow--next" type="button" data-media-next="" aria-label={`Next ${title.toLowerCase()} photo or video`}><ArrowIcon /></button>
      </div>
      <div className="inline-media-gallery__thumbnails" role="group" aria-label={`${title} thumbnails`}>
        {slides.map((slide, index) => (
          <button className="inline-media-gallery__thumbnail" type="button" data-media-thumbnail="" key={slide.src} aria-label={`Show ${slide.kind === "video" ? "video" : "photo"} ${index + 1}: ${slide.alt}`} aria-pressed={index === 0}>
            <img src={slide.kind === "video" ? slide.poster : slide.src} alt="" loading="lazy" decoding="async" draggable={false} />
          </button>
        ))}
      </div>
      {placeholder && <p className="inline-media-gallery__placeholder">Placeholder images — replace before publishing</p>}
      <p className="inline-media-gallery__status" data-media-status="" aria-live="polite" aria-atomic="true" />
    </article>
  );
}
