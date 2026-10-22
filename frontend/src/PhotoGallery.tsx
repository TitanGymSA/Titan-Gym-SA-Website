import { useEffect } from "react";
import { SectionHeading } from "./components";
import { ArrowIcon } from "./Icons";
import { gallery } from "./siteData";
import { ResponsiveImage, responsiveImageProps } from "./ResponsiveImage";

export function PhotoGallery() {
  useEffect(() => {
    window.dispatchEvent(new Event("titan-gallery-ready"));
  }, []);

  return (
    <section className="section section--dark home-gallery" id="gallery" tabIndex={-1} aria-label="Inside Titan Gym photo gallery">
      <div className="container">
        <SectionHeading eyebrow="Inside Titan Gym" title="Take a look around" />
        <div className="gallery-mosaic">
          {gallery.map((photo, index) => {
            const viewerImage = responsiveImageProps(photo.src, "calc(100vw - 60px)", 1920);
            return (
              <div className={`gallery-tile gallery-tile--${index + 1}`} key={photo.src}>
                <button className="gallery-thumbnail" type="button" data-gallery-src={viewerImage.src} data-gallery-srcset={viewerImage.srcSet} data-gallery-width={viewerImage.width} data-gallery-height={viewerImage.height} data-gallery-alt={photo.alt} aria-label={`Enlarge photo: ${photo.alt}`} aria-haspopup="dialog" aria-controls="gallery-viewer">
                  <ResponsiveImage src={photo.src} sizes={index === 0 ? "(max-width: 760px) calc(100vw - 28px), 60vw" : "(max-width: 760px) 50vw, 42vw"} alt="" loading="lazy" decoding="async" />
                </button>
              </div>
            );
          })}
        </div>
        <dialog className="gallery-viewer" id="gallery-viewer" aria-label="Gym photo viewer" aria-describedby="gallery-viewer-status">
          <button className="gallery-viewer__close" type="button" data-gallery-close="" aria-label="Close photo">×</button>
          <div className="gallery-viewer__stage">
            <button className="gallery-viewer__arrow gallery-viewer__arrow--previous" type="button" data-gallery-previous="" aria-label="Previous photo"><ArrowIcon direction="left" /></button>
            <ResponsiveImage data-gallery-image="" src={gallery[0].src} sizes="calc(100vw - 60px)" preferredWidth={1920} alt={gallery[0].alt} loading="lazy" decoding="async" />
            <button className="gallery-viewer__arrow gallery-viewer__arrow--next" type="button" data-gallery-next="" aria-label="Next photo"><ArrowIcon /></button>
          </div>
          <p className="gallery-viewer__status" id="gallery-viewer-status" data-gallery-status="" aria-live="polite" aria-atomic="true" />
        </dialog>
      </div>
    </section>
  );
}
