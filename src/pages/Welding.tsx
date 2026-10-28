import { Img } from "../components/Img";
import { Reveal } from "../components/Reveal";
import { CTASection, NoteBox, PageIntro, RelatedServices, SectionHead } from "../components/ui";
import { useSeo, serviceJsonLd } from "../lib/seo";
import { pageMeta } from "../data/meta";
import { gallery } from "../data/site";

const methods = [
  {
    code: "131",
    name: "MIG",
    desc: "Spawanie łukowe drutem elektrodowym litym w osłonie gazu obojętnego.",
  },
  {
    code: "141",
    name: "TIG",
    desc: "Spawanie z dodatkiem drutu lub pręta litego — metoda TIG.",
  },
];

const finishing = [
  {
    title: "Surowe",
    text: "Elementy przekazywane bez dodatkowej obróbki powierzchni.",
  },
  {
    title: "Śrutowane",
    text: "Oczyszczenie powierzchni strumieniem ściernym przed dalszym procesem.",
  },
  {
    title: "Zabezpieczone powłoką",
    text: "Malowanie proszkowe w lakierni ALCOLOR lub powłoki nakładane u podwykonawców.",
  },
];

export default function Welding() {
  useSeo({
    ...pageMeta["/spawanie-konstrukcji-stalowych"],
    path: "/spawanie-konstrukcji-stalowych",
    image: "images/welding-800.webp",
    jsonLd: serviceJsonLd(
      "Spawanie i konstrukcje stalowe",
      "Spawanie MIG i TIG stali węglowej, nierdzewnej oraz aluminium. Konstrukcje stalowe według dokumentacji klienta.",
      "/spawanie-konstrukcji-stalowych"
    ),
  });

  const photos = [
    gallery.find((g) => g.category === "welding"),
    gallery.find((g) => g.id === "g17"),
    gallery.find((g) => g.id === "g18"),
  ].filter(Boolean) as typeof gallery;

  return (
    <>
      <PageIntro
        parent="Usługi"
        label="Spawanie i konstrukcje"
        no="03"
        title={
          <>
            KONSTRUKCJE
            <br /> STALOWE
          </>
        }
        lead="Spawanie stali węglowej, aluminium oraz nierdzewnej. Konstrukcje wykonujemy w całości w naszym zakładzie, według powierzonej dokumentacji — a gdy jej brakuje, pomagamy ją stworzyć."
      />

      <section className="bg-ink pb-20 pt-4 lg:pb-28">
        <div className="wrap">
          <div className="grid gap-3 lg:grid-cols-12 lg:gap-4">
            <Reveal className="lg:col-span-8">
              <figure className="relative">
                <div className="relative aspect-[16/9] overflow-hidden bg-graphite">
                  <Img
                    name="welding"
                    alt="Spawanie konstrukcji stalowej w hali produkcyjnej"
                    priority
                    sizes="(min-width: 1024px) 66vw, 100vw"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent"
                  />
                </div>
                <figcaption className="mt-3 text-[0.625rem] uppercase tracking-[0.16em] text-steel-dark">
                  Spawanie / zakład produkcyjny Grupy Sportex
                </figcaption>
              </figure>
            </Reveal>

            <div className="grid gap-3 lg:col-span-4">
              {methods.map((m, i) => (
                <Reveal key={m.code} delay={i * 70} className="border border-white/10 bg-graphite-2 p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="num text-3xl text-brand">{m.code}</span>
                    <span className="text-[0.625rem] uppercase tracking-[0.18em] text-steel">
                      {m.name}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-steel">{m.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-graphite-2 py-20 lg:py-28">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHead
                dark
                no="01"
                label="Zakres"
                title={
                  <>
                    OD DOKUMENTACJI
                    <br /> DO DOSTAWY
                  </>
                }
                align="stack"
              />
            </div>

            <div className="space-y-6 text-[0.9375rem] leading-relaxed text-steel lg:col-span-6 lg:col-start-7">
              <Reveal>
                <p>
                  Wykonujemy konstrukcje stalowe według dokumentacji dostarczonej przez klienta.
                  Jeżeli dokumentacji nie ma, nasi konstruktorzy pomagają ją przygotować — od
                  koncepcji po rysunki wykonawcze.
                </p>
              </Reveal>
              <Reveal delay={60}>
                <p>
                  Konstrukcje powstają w 100% w naszym zakładzie produkcyjnym. Do klienta
                  dostarczamy je w zależności od zapotrzebowania: surowe, śrutowane lub
                  zabezpieczone powłoką malarską.
                </p>
              </Reveal>
              <Reveal delay={100}>
                <p>
                  Przy udziale sprawdzonych podwykonawców realizujemy również cynkowanie ogniowe,
                  galwaniczne oraz natryskowe.
                </p>
              </Reveal>
            </div>
          </div>

          <ul className="mt-14 grid gap-px bg-white/10 md:grid-cols-3">
            {finishing.map((f, i) => (
              <Reveal as="li" key={f.title} delay={i * 60} className="bg-graphite-2 p-6 lg:p-8">
                <span className="num text-[0.625rem] text-brand-soft">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display-md mt-4 text-white">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel">{f.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-light py-20 text-ink lg:py-28">
        <div className="wrap">
          <SectionHead
            no="02"
            label="Galeria"
            title="ELEMENTY I KONSTRUKCJE"
            intro="Zdjęcia z hali produkcyjnej: spawanie, profile przygotowane do obróbki oraz detal konstrukcyjny."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
            {photos.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <figure>
                  <div className="relative aspect-[4/3] overflow-hidden bg-graphite">
                    <Img name={p.image} alt={p.alt} sizes="(min-width: 1024px) 33vw, 50vw" />
                  </div>
                  <figcaption className="mt-3 text-[0.625rem] uppercase tracking-[0.14em] text-graphite/70">
                    {p.title}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <div className="mt-8">
            <NoteBox>
              Konstrukcje wykonujemy wyłącznie na podstawie dokumentacji lub uzgodnionego zakresu —
              szczegóły techniczne ustalamy indywidualnie.
            </NoteBox>
          </div>
        </div>
      </section>

      <RelatedServices current="/spawanie-konstrukcji-stalowych" />
      <CTASection />
    </>
  );
}
