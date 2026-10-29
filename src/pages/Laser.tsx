import { Link } from "react-router-dom";
import { ArrowUpRight, CheckCircle2, FileText } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { GalleryGrid } from "../components/Gallery";
import {
  CTASection,
  NoteBox,
  PageIntro,
  PhotoBand,
  RelatedServices,
  SectionHead,
  SpecTable,
} from "../components/ui";
import { useSeo, serviceJsonLd } from "../lib/seo";
import { pageMeta } from "../data/meta";
import { gallery, laserMachines, stock } from "../data/site";

const benefits = [
  "Jakość krawędzi niewymagająca dodatkowej obróbki skrawaniem",
  "Powtarzalność kształtu niezależna od wielkości serii",
  "Brak konieczności wykonywania kosztownego oprzyrządowania",
  "Optymalne rozmieszczenie detali na arkuszu — mniej odpadu",
];

export default function Laser() {
  useSeo({
    ...pageMeta["/ciecie-laserowe"],
    path: "/ciecie-laserowe",
    image: "images/laser-sparks-800.webp",
    jsonLd: serviceJsonLd(
      "Cięcie laserowe blach",
      "Precyzyjne wycinanie detali z blach stalowych, nierdzewnych i aluminiowych na dwóch wycinarkach laserowych.",
      "/ciecie-laserowe"
    ),
  });

  const laserGallery = gallery.filter((g) => g.category === "laser").slice(0, 6);

  return (
    <>
      <PageIntro
        parent="Usługi"
        label="Cięcie laserowe"
        no="01"
        title={
          <>
            CIĘCIE LASEROWE
            <br /> BLACH
          </>
        }
        lead="Wycinamy dowolnie skomplikowane kształty z blach czarnych, nierdzewnych i aluminiowych — z materiału powierzonego lub z własnego magazynu. Dwie wycinarki pozwalają dobrać maszynę do grubości i formatu arkusza."
        aside={
          <div className="border-l border-brand/60 pl-5">
            <p className="num text-4xl text-white">
              25<span className="ml-1 text-base text-steel">mm</span>
            </p>
            <p className="mt-2 text-[0.625rem] uppercase tracking-[0.16em] text-steel">
              Stal czarna — maks. grubość
            </p>
            <p className="mt-5 num text-4xl text-white">
              30<span className="ml-1 text-base text-steel">mm</span>
            </p>
            <p className="mt-2 text-[0.625rem] uppercase tracking-[0.16em] text-steel">
              Stal nierdzewna — maks. grubość
            </p>
          </div>
        }
      />

      <PhotoBand
        image="laser-sparks"
        alt="Wiązka lasera tnie blachę — iskry w hali produkcyjnej"
        caption="Cięcie laserowe / zakład produkcyjny Grupy Sportex"
        priority
      />

      <section className="bg-ink py-20 lg:py-28">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHead
                dark
                no="01"
                label="Technologia"
                title={
                  <>
                    KRAWĘDŹ GOTOWA
                    <br /> BEZ POPRAWEK
                  </>
                }
                align="stack"
              />
              <p className="mt-6 text-[0.9375rem] leading-relaxed text-steel">
                W metodzie cięcia laserem rozdzielenie materiału następuje w procesie miejscowego
                topienia i odparowywania warstwy metalu energią wiązki laserowej. Oddziaływanie
                cieplne na materiał jest ograniczone, a prędkość cięcia wysoka.
              </p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-steel">
                Jakość krawędzi jest tak wysoka, że nie wymaga dodatkowej, pracochłonnej obróbki
                skrawaniem. Technologia pozwala też dodać do detalu elementy ułatwiające dalszą
                obróbkę — bez kosztownego oprzyrządowania.
              </p>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <ul className="divide-y divide-white/10 border-y border-white/10">
                {benefits.map((b, i) => (
                  <Reveal as="li" key={b} delay={i * 50} className="flex items-start gap-4 py-5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                    <span className="text-sm leading-relaxed text-white/90">{b}</span>
                  </Reveal>
                ))}
              </ul>
              <NoteBox>
                Wycena cięcia opiera się na pliku DXF lub DWG — sposób przygotowania plików
                opisujemy niżej.
              </NoteBox>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-graphite-2 py-20 lg:py-28">
        <div className="wrap">
          <SectionHead
            dark
            no="02"
            label="Park maszynowy"
            title="DWIE WYCINARKI, RÓŻNE ZASTOSOWANIA"
            intro="Dobór maszyny zależy od grubości materiału i formatu arkusza. Poniżej pełne parametry obu urządzeń."
            titleId="machines-heading"
          />
          <div className="mt-12 grid gap-px bg-white/10 lg:grid-cols-2">
            {laserMachines.map((m, i) => (
              <Reveal key={m.name} delay={i * 80} className="bg-graphite-2 p-7 lg:p-9">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="num text-[0.625rem] text-brand-soft">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.625rem] uppercase tracking-[0.16em] text-steel-dark">
                    Wycinarka laserowa
                  </span>
                </div>
                <h3 className="display-md mt-4 text-white">{m.name}</h3>
                <p className="num mt-6 text-4xl text-white">
                  {m.power}
                  <span className="ml-2 text-xs uppercase tracking-[0.16em] text-steel">
                    moc źródła
                  </span>
                </p>
                <div className="mt-8">
                  <SpecTable
                    dark
                    caption={`Parametry ${m.name}`}
                    rows={m.specs.filter((s) => s.label !== "Moc źródła")}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-light py-20 text-ink lg:py-28">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHead
                no="03"
                label="Materiał"
                title={
                  <>
                    POWIERZONY
                    <br /> LUB Z MAGAZYNU
                  </>
                }
                align="stack"
              />
              <p className="mt-6 text-sm leading-relaxed text-graphite/75">
                Na miejscu prowadzimy magazyn blach w formacie 3000 × 1500 mm. Istnieje możliwość
                sprowadzenia innych materiałów niż wymienione — zależnie od wielkości zamówienia.
              </p>
            </div>

            <div className="lg:col-span-7">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">Magazyn blach — dostępne materiały i zakresy grubości</caption>
                <thead>
                  <tr className="border-b border-ink/20">
                    <th scope="col" className="pb-3 text-[0.625rem] uppercase tracking-[0.14em] text-graphite/70">
                      Materiał
                    </th>
                    <th scope="col" className="pb-3 text-[0.625rem] uppercase tracking-[0.14em] text-graphite/70">
                      Format
                    </th>
                    <th scope="col" className="pb-3 text-right text-[0.625rem] uppercase tracking-[0.14em] text-graphite/70">
                      Grubość
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stock.map((row) => (
                    <tr key={row.material} className="border-b border-ink/10">
                      <th scope="row" className="py-4 pr-4 text-sm font-medium text-ink">
                        {row.material}
                      </th>
                      <td className="num py-4 pr-4 text-sm text-graphite/75">{row.format}</td>
                      <td className="num py-4 text-right text-sm text-ink">{row.range}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 text-xs text-graphite/70">
                Stal nierdzewna w gatunku 304. Zakresy dotyczą blach dostępnych w magazynie własnym.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 lg:py-28">
        <div className="wrap">
          <SectionHead
            dark
            no="04"
            label="Zapytanie"
            title="JAK PRZYGOTOWAĆ PLIKI"
            intro="Kompletna dokumentacja pozwala wycenić detal bez dodatkowych pytań i uniknąć poprawek w produkcji."
          />

          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            <ol className="space-y-6 lg:col-span-7">
              {[
                {
                  t: "Format pliku",
                  d: "Rysunek techniczny w pliku DXF lub DWG, zapisany w wersji nie nowszej niż AutoCAD 2013. Pliki z Corela należy wyeksportować do jednego z tych formatów.",
                },
                {
                  t: "Wymiar kontrolny",
                  d: "Rysunek powinien zawierać przynajmniej jeden wymiar nominalny — pozwala zweryfikować skalę i poprawność importu.",
                },
                {
                  t: "Materiał i ilość",
                  d: "Na rysunku lub w nazwie pliku podaj gatunek i grubość materiału, rodzaj wykończenia powierzchni oraz liczbę sztuk.",
                },
                {
                  t: "Jeden detal na plik",
                  d: "Dokumentację przygotuj tak, aby w pojedynczym pliku znajdował się szkic tylko jednego detalu.",
                },
              ].map((item, i) => (
                <Reveal as="li" key={item.t} delay={i * 60} className="flex gap-5 border-t border-white/10 pt-5">
                  <span className="num text-[0.6875rem] text-brand-soft">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-base font-semibold text-white">{item.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-steel">{item.d}</p>
                  </div>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={120} className="lg:col-span-5">
              <div className="border border-white/12 bg-white/[0.03] p-6">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-brand" aria-hidden="true" />
                  <p className="text-[0.625rem] uppercase tracking-[0.16em] text-steel">
                    Przykład nazwy pliku
                  </p>
                </div>
                <p className="mt-4 break-all font-mono text-sm text-white">
                  DETAL2_szt4=8cz.dxf
                </p>
                <ul className="mt-4 space-y-2 text-xs leading-relaxed text-steel">
                  <li>cz — blacha czarna</li>
                  <li>ko — stal nierdzewna</li>
                  <li>al — aluminium</li>
                  <li>oc — ocynk</li>
                </ul>
                <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-relaxed text-steel-dark">
                  Przykład: detal 2, 4 sztuki, blacha czarna 8 mm.
                </p>
              </div>

              <div className="mt-6 border border-white/12 p-6">
                <p className="text-sm leading-relaxed text-steel">
                  Nie masz dokumentacji elektronicznej? Wycenę przygotujemy również na podstawie
                  dokładnie zwymiarowanych rysunków technicznych.
                </p>
                <Link to="/kontakt" className="link-arrow mt-5 inline-flex">
                  Wyślij zapytanie
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-graphite-2 py-20 lg:py-24">
        <div className="wrap">
          <SectionHead
            dark
            no="05"
            label="Galeria"
            title="DETALE I PROCES"
            intro="Zdjęcia z zakładu produkcyjnego — wycinarka w pracy oraz detale po cięciu."
          />
          <div className="mt-10">
            <GalleryGrid items={laserGallery} />
          </div>
        </div>
      </section>

      <RelatedServices current="/ciecie-laserowe" />
      <CTASection />
    </>
  );
}
