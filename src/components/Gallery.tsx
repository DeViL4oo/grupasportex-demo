import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { Img, asset, imageMeta } from "./Img";
import type { GalleryItem } from "../data/site";

type Props = {
  items: GalleryItem[];
  columns?: 2 | 3;
  className?: string;
};

/** Siatka zdjęć z lightboxem: nawigacja klawiaturą, przywrócenie fokusu, Esc. */
export function GalleryGrid({ items, columns = 3, className = "" }: Props) {
  const [active, setActive] = useState<number | null>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const open = (i: number) => {
    lastFocused.current = document.activeElement as HTMLElement;
    setActive(i);
  };
  const close = useCallback(() => {
    setActive(null);
    lastFocused.current?.focus();
  }, []);
  const step = useCallback(
    (dir: number) => {
      setActive((current) => {
        if (current === null) return current;
        return (current + dir + items.length) % items.length;
      });
    },
    [items.length]
  );

  useEffect(() => {
    if (active === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
      } else if (e.key === "Tab") {
        // prosta pułapka fokusu w obrębie dialogu
        const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        );
        if (!nodes || nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [active, close, step]);

  const current = active !== null ? items[active] : null;
  const currentMeta = current ? imageMeta(current.image) : undefined;

  return (
    <>
      <div
        className={`columns-2 gap-3 sm:gap-4 ${
          columns === 3 ? "lg:columns-3" : "lg:columns-2"
        } ${className}`}
      >
        {items.map((item, i) => {
          const meta = imageMeta(item.image);
          return (
            <figure key={item.id} className="mb-3 break-inside-avoid sm:mb-4">
              <button
                type="button"
                onClick={() => open(i)}
                className="group media-zoom relative block w-full overflow-hidden bg-graphite text-left"
                aria-label={`Powiększ zdjęcie: ${item.title}`}
              >
                <span
                  className="block w-full"
                  style={{ aspectRatio: meta ? meta.ratio : 1.5 }}
                >
                  <Img
                    name={item.image}
                    alt={item.alt}
                    sizes="(min-width: 1024px) 33vw, 50vw"
                  />
                </span>
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90"
                />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                  <span className="text-[0.6875rem] uppercase tracking-[0.14em] text-white/85">
                    {item.title}
                  </span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-white/25 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Expand className="h-3 w-3" aria-hidden="true" />
                  </span>
                </span>
              </button>
            </figure>
          );
        })}
      </div>

      {current && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Zdjęcie: ${current.title}`}
          className="fixed inset-0 z-[80] flex flex-col bg-ink/97 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
            <div className="min-w-0">
              <p className="truncate text-sm text-white">{current.title}</p>
              <p className="mt-1 text-[0.625rem] uppercase tracking-[0.16em] text-steel-dark">
                {(active ?? 0) + 1} / {items.length}
              </p>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/20 text-white transition-colors hover:border-brand hover:text-brand"
              aria-label="Zamknij powiększenie"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center p-4 sm:p-8">
            <button
              type="button"
              onClick={() => step(-1)}
              className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 bg-ink/60 text-white transition-colors hover:border-brand hover:text-brand sm:left-6"
              aria-label="Poprzednie zdjęcie"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <img
              src={asset(currentMeta?.sources.at(-1)?.src ?? "")}
              alt={current.alt}
              className="max-h-full max-w-full object-contain"
            />
            <button
              type="button"
              onClick={() => step(1)}
              className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 bg-ink/60 text-white transition-colors hover:border-brand hover:text-brand sm:right-6"
              aria-label="Następne zdjęcie"
            >
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
