"""Generate checked-in responsive assets; normal static builds need no Python."""

from io import BytesIO
from json import dumps
from pathlib import Path

from PIL import Image, ImageOps


FRONTEND = Path(__file__).resolve().parents[1]
IMAGES = FRONTEND / "public" / "images"
OUTPUT = IMAGES / "responsive"
WIDTHS = (480, 960, 1440, 1920, 2560)
BRAND_WIDTHS = {
    "Logo_Dark_V2_w_Text.png": (96, 192, 288),
    "logo-horizontal.png": (300, 600, 900),
    "logo-mark.png": (32, 64, 128),
    "texas-sports-academy-logo.png": (240, 480, 720),
}


def encode(image, destination, *, icc_profile, lossless=False):
    destination.parent.mkdir(parents=True, exist_ok=True)
    buffer = BytesIO()
    image.save(
        buffer, format="WEBP", quality=85, method=6,
        lossless=lossless, icc_profile=icc_profile,
    )
    data = buffer.getvalue()
    if not destination.exists() or destination.read_bytes() != data:
        destination.write_bytes(data)
    return {
        "src": "./images/" + destination.relative_to(IMAGES).as_posix(),
        "width": image.width,
        "height": image.height,
    }


def main():
    manifest = {}
    for source in sorted(IMAGES.rglob("*")):
        if not source.is_file() or OUTPUT in source.parents:
            continue
        if source.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp"}:
            continue
        relative = source.relative_to(IMAGES)
        stem = relative.stem.lower().replace("_", "-")
        destination = OUTPUT / relative.parent
        with Image.open(source) as raw:
            image = ImageOps.exif_transpose(raw)
            profile = raw.info.get("icc_profile", b"")
            if image.mode not in {"RGB", "RGBA"}:
                image = image.convert("RGBA" if image.has_transparency_data else "RGB")
            widths = BRAND_WIDTHS.get(relative.as_posix(), WIDTHS)
            is_logo = relative.as_posix() in BRAND_WIDTHS
            candidates = sorted({min(width, image.width) for width in widths})
            variants = []
            for width in candidates:
                height = max(1, round(image.height * width / image.width))
                resized = image.resize((width, height), Image.Resampling.LANCZOS)
                variants.append(encode(
                    resized, destination / f"{stem}-{width}.webp",
                    icc_profile=profile, lossless=is_logo,
                ))
            side = min(192, image.width, image.height)
            # Logos must keep all lettering; only gallery photos use square crops.
            thumbnail = (
                ImageOps.contain(image, (side, side), Image.Resampling.LANCZOS)
                if is_logo else ImageOps.fit(image, (side, side), Image.Resampling.LANCZOS)
            )
            manifest["./images/" + relative.as_posix()] = {
                "width": image.width, "height": image.height,
                "variants": variants,
                "thumbnail": encode(
                    thumbnail, destination / f"{stem}-thumb.webp", icc_profile=profile,
                    lossless=is_logo,
                ),
            }
    # One asset per line keeps this generated lookup easy to review.
    entries = [f"  {dumps(key)}: {dumps(value)}" for key, value in manifest.items()]
    (FRONTEND / "src" / "image-manifest.json").write_text(
        "{\n" + ",\n".join(entries) + "\n}\n", encoding="utf-8",
    )
    count = sum(len(asset["variants"]) + 1 for asset in manifest.values())
    print(f"Generated {count} WebP files for {len(manifest)} source images.")


if __name__ == "__main__":
    main()
