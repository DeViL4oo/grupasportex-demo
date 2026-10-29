import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Img } from "../components/Img";
import { Reveal } from "../components/Reveal";
import {
  CTASection,
  PageIntro,
  RelatedServices,
  SectionHead,
  SpecStrip,
  SpecTable,
} from "../components/ui";
import { useSeo, serviceJsonLd } from "../lib/seo";
import { pageMeta } from "../data/meta";
import { bendingMachine, gallery } from "../data/site";

const formats = [
  {
    code: "3D",
    title: "Model trójwymiarowy",
    text: "Plik SAT, IGES lub PRT z wygiętym detalem — najprostsza droga do wyceny i weryfikacji geometrii.",
  },
  {
    code: "2D",
    title: "Rozwinięcie płaskie",
    text: "Plik DXF lub DWG z zaznaczonymi liniami gięcia i podanym kątem zagięcia każdej krawędzi.",
  },
  {
    code: "INFO",
    title: "Dane materiałowe",
    text: "Gatunek, grubość i rodzaj wykończenia powierzchni blachy oraz liczba sztuk danego detalu.",
  },
];

export default function Bending() {
  useSeo({
    ...pageMeta["/giecie-blach-cnc"],
    path: "/giecie-blach-cnc",
    image: "images/bending-press-640.webp",
    jsonLd: serviceJsonLd(
      "Gięcie blach CNC",
      "Usługi gięcia blach na prasie krawędziowej CNC AM MACHINERY 3100 o nacisku 160 ton.",
      "/giecie-blach-cnc"
    ),
  });

  const bendingGallery = gallery.filter((g) => g.category === "bending");

  return (
    <>
      <PageIntro
        parent="Usługi"
        label="Gięcie blach CNC"
        no="02"
        title={
          <>
            GIĘCIE BLACH
            <br /> NA PRASIE CNC
          </>
        }
        lead="Obróbka plastyczna blach na prasie krawędziowej AM MACHINERY 3100. Sterowanie CNC z symulacją procesu pozwala wprowadzić korektę, zanim detal trafi na stół."
        aside={
          <div className="flex items-end gap-3 border-l border-brand/60 pl-5">
            <p className="num text-5xl leading-none text-white">3100</p>
            <p className="pb-1 text-[0.625rem] uppercase leading-tight tracking-[0.16em] text-steel">
              mm
              <br />
              maks. długość
              <br />
              gięcia
            </p>
          </div>
        }
      />

      <div className="border-y border-white/10 bg-graphite-2">
        <div className="wrap">
          <SpecStrip
            dark
            items={[
              { label: "Długość gięcia", value: "3100", unit: "mm" },
              { label: "Grubość blachy", value: "10", unit: "mm" },
              { label: "Maks. nacisk", value: "160", unit: "t" },
              { label: "Sterowanie", value: "CNC", unit: "z symulacją" },
            ]}
          />
        </div>
      </div>

      <section className="bg-ink py-20 lg:py-28">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <Reveal className="lg:col-span-6">
              <figure className="relative">
                <div className="relative aspect-[4/3] overflow-hidden bg-graphite">
                  <Img
                    name="bending-press-2"
                    alt="Gięcie blachy na prasie krawędziowej CNC"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
                <div
                  aria-hidden="true"
                  className="absolute -left-px top-0 h-full w-px bg-brand/50"
                />
                <figcaption className="mt-3 flex items-center gap-2 text-[0.625rem] uppercase tracking-[0.16em] text-steel-dark">
                  <span className="h-px w-5 bg-brand" aria-hidden="true" />
                  Prasa krawędziowa AM MACHINERY 3100
                </figcaption>
              </figure>
            </Reveal>

            <div className="lg:col-span-5 lg:col-start-8">
              <p className="eyebrow text-brand">Technologia</p>
              <h2 className="display-lg mt-5 text-white">
                SYMULACJA
                <br /> PRZED GIĘCIEM
              </h2>
              <p className="mt-6 text-[0.9375rem] leading-relaxed text-steel">
                Innowacyjny system sterowania CNC, wraz z oprogramowaniem prasy, umożliwia
                przygotowanie wstępnej symulacji gięcia. Ewentualne korekty wprowadzamy jeszcze
                przed wykonaniem elementu — co ogranicza ryzyko błędów i strat materiału.
              </p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-steel">
                Gięcie obejmuje blachy i poszczególne elementy o grubości do 10 mm oraz długości do
                3100 mm, przy nacisku 160 ton. Skomplikowane kształty wykonujemy z wykorzystaniem
                specjalistycznych narzędzi.
              </p>
              <div className="mt-8">
                <SpecTable
                  dark
                  caption="Parametry prasy krawędziowej AM MACHINERY 3100"
                  rows={bendingMachine.specs}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-light py-20 text-ink lg:py-28">
        <div className="wrap">
          <SectionHead
            no="03"
            label="Wycena"
            title="CO PRZYJMUJEMY DO WYCENY"
            intro="Do wyceny gięcia potrzebujemy geometrii detalu oraz danych materiałowych. Poniżej trzy warianty dokumentacji."
          />

          <div className="mt-12 grid gap-px border border-ink/10 bg-ink/10 md:grid-cols-3">
            {formats.map((f, i) => (
              <Reveal key={f.code} delay={i * 60} className="bg-light p-7 lg:p-8">
                <span className="num text-[0.625rem] text-graphite/75">{f.code}</span>
                <h3 className="mt-4 text-lg font-semibold text-ink">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-graphite/70">{f.text}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="border-l-2 border-brand bg-white p-6">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink">
                Zasady przygotowania plików
              </h3>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-graphite/75">
                <li>W jednym pliku rysunku — szkic tylko jednego detalu.</li>
                <li>Na rysunku informacja o materiale: gatunek, grubość, wykończenie powierzchni.</li>
                <li>Podana liczba sztuk danego detalu.</li>
                <li>Przy braku modelu 3D — rozwinięcie z liniami gięcia i kątami.</li>
              </ul>
            </div>
            <div className="flex flex-col justify-between gap-6 bg-ink p-6 text-white">
              <p className="text-sm leading-relaxed text-steel">
                Masz pliki, ale nie wiesz, czy geometria jest poprawna? Prześlij je — zweryfikujemy
                wykonalność i wrócimy z uwagami przed wyceną.
              </p>
              <Link to="/kontakt" className="btn btn-primary self-start">
                Prześlij dokumentację
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-graphite-2 py-20 lg:py-24">
        <div className="wrap">
          <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
            {bendingGallery.slice(0, 3).map((item, i) => (
              <Reveal key={item.id} delay={i * 60}>
                <figure>
                  <div className="relative aspect-[4/3] overflow-hidden bg-graphite">
                    <Img
                      name={item.image}
                      alt={item.alt}
                      sizes="(min-width: 640px) 33vw, 100vw"
                    />
                  </div>
                  <figcaption className="mt-3 text-[0.625rem] uppercase tracking-[0.14em] text-graphite/70">
                    {item.title}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <RelatedServices current="/giecie-blach-cnc" />
      <CTASection />
    </>
  );
}
