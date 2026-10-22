import type { ImgHTMLAttributes } from "react";
import manifest from "./image-manifest.json";

type ImageVariant = { src: string; width: number; height: number };
type ImageAsset = { width: number; height: number; variants: ImageVariant[]; thumbnail: ImageVariant };
const images: Record<string, ImageAsset> = manifest;

export function imageAsset(src: string): ImageAsset {
  const asset = images[src];
  if (!asset) throw new Error(`Missing responsive image: ${src}. Run scripts/generate-images.py.`);
  return asset;
}

export function imageVariant(src: string, preferredWidth = 960): ImageVariant {
  const { variants } = imageAsset(src);
  return variants.find((variant) => variant.width >= preferredWidth) ?? variants[variants.length - 1];
}

export function responsiveImageProps(src: string, sizes: string, preferredWidth = 960) {
  const asset = imageAsset(src);
  return {
    src: imageVariant(src, preferredWidth).src,
    srcSet: asset.variants.map((variant) => `${variant.src} ${variant.width}w`).join(", "),
    sizes,
    width: asset.width,
    height: asset.height,
  };
}

type ResponsiveImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "sizes" | "width" | "height"> & {
  src: string;
  sizes: string;
  preferredWidth?: number;
};

export function ResponsiveImage({ src, sizes, preferredWidth, ...props }: ResponsiveImageProps) {
  return <img {...responsiveImageProps(src, sizes, preferredWidth)} {...props} />;
}
