import manifest from "../data/images.json";

type Entry = {
  alt: string;
  width: number;
  height: number;
  ratio: number;
  sources: { w: number; src: string }[];
  fallback: string;
};

const images = manifest as Record<string, Entry>;

/** Ścieżka do zasobu z public/ z uwzględnieniem base path (GitHub Pages). */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL || "/";
  return `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

type ImgProps = {
  name: string;
  alt?: string;
  sizes?: string;
  imgClassName?: string;
  priority?: boolean;
  width?: number;
  height?: number;
};

/**
 * Obraz responsywny: srcset WebP, wymiary zapobiegające CLS,
 * lazy loading poza pierwszym ekranem.
 */
export function Img({
  name,
  alt,
  sizes = "100vw",
  imgClassName = "",
  priority = false,
  width,
  height,
}: ImgProps) {
  const entry = images[name];
  if (!entry) {
    if (import.meta.env.DEV) console.warn(`Brak obrazu w manifeście: ${name}`);
    return null;
  }
  const srcSet = entry.sources
    .map((s) => `${asset(s.src)} ${s.w}w`)
    .join(", ");
  const w = width ?? entry.width;
  const h = height ?? entry.height;

  return (
    <img
      src={asset(entry.fallback)}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt ?? entry.alt}
      width={w}
      height={h}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
      className={`h-full w-full object-cover ${imgClassName}`}
    />
  );
}

export function imageAlt(name: string): string {
  return images[name]?.alt ?? "";
}

export function imageMeta(name: string): Entry | undefined {
  return images[name];
}
