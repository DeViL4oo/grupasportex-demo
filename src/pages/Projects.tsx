import { useState } from "react";
import { GalleryGrid } from "../components/Gallery";
import { CTASection, PageIntro } from "../components/ui";
import { useSeo } from "../lib/seo";
import { pageMeta } from "../data/meta";
import { gallery, galleryCategories } from "../data/site";

type Filter = (typeof galleryCategories)[number]["id"];

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("all");

  useSeo({
    ...pageMeta["/realizacje"],
    path: "/realizacje",
    image: "images/sign-cut-1200.webp",
  });

  const items = filter === "all" ? gallery : gallery.filter((g) => g.category === filter);

  return (
    <>
      <PageIntro
        label="Realizacje"
        eyebrow="Galeria prac"
        no="05"
        title={
          <>
            NASZA PRACA
            <br /> W PRAKTYCE
          </>
        }
        lead="Detale, konstrukcje i powłoki — zdjęcia z zakładu produkcyjnego Grupy Sportex. Wybierz kategorię, aby zawęzić widok."
      />

      <section className="bg-ink pb-20 lg:pb-28">
        <div className="wrap">
          <div
            role="group"
            aria-label="Filtr kategorii realizacji"
            className="flex flex-wrap gap-2 border-b border-white/10 pb-6"
          >
            {galleryCategories.map((c) => {
              const active = filter === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setFilter(c.id)}
                  aria-pressed={active}
                  className={`border px-4 py-3 text-[0.6875rem] uppercase tracking-[0.14em] transition-colors ${
                    active
                      ? "border-brand bg-brand text-white"
                      : "border-white/15 text-steel hover:border-white/35 hover:text-white"
                  }`}
                >
                  {c.label}
                  <span className="ml-2 text-[0.5625rem] opacity-60">
                    {c.id === "all" ? gallery.length : gallery.filter((g) => g.category === c.id).length}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="mt-4 text-xs text-steel-dark" aria-live="polite">
            {items.length} {items.length === 1 ? "zdjęcie" : "zdjęć"} w wybranej kategorii
          </p>

          <div className="mt-8">
            <GalleryGrid items={items} />
          </div>

        </div>
      </section>

      <CTASection />
    </>
  );
}
