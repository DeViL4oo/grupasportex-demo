import { Reveal } from "../components/Reveal";
import { GalleryGrid } from "../components/Gallery";
import {
  CTASection,
  PageIntro,
  PhotoBand,
  RelatedServices,
  SectionHead,
  SpecTable,
} from "../components/ui";
import { useSeo, serviceJsonLd } from "../lib/seo";
import { pageMeta } from "../data/meta";
import { coatingApplications, coatingSpecs, gallery, paintTypes } from "../data/site";

const lines = [
  {
    title: "Aluminium",
    steps: [
      "odtłuszczanie i trawienie",
      "płukanie wstępne",
      "płukanie zasadnicze",
      "chromianowanie żółte",
      "płukanie i płukanie końcowe",
      "suszenie",
      "lakierowanie proszkowe",
      "utwardzanie (polimeryzacja)",
      "kontrola jakości",
    ],
  },
  {
    title: "Stal czarna — do wnętrz",
    steps: [
      "odtłuszczanie, piaskowanie lub śrutowanie",
      "fosforanowanie żelazowe",
      "płukanie",
      "suszenie",
      "lakierowanie proszkowe",
      "utwardzanie (polimeryzacja)",
      "kontrola jakości",
    ],
  },
  {
    title: "Stal czarna — na zewnątrz",
    steps: [
      "piaskowanie lub śrutowanie",
      "odtłuszczanie",
      "fosforanowanie żelazowe",
      "płukanie i suszenie",
      "podkład cynkowy",
      "utwardzanie",
      "farby odporne na UV i czynniki atmosferyczne",
      "utwardzanie i kontrola jakości",
    ],
  },
  {
    title: "Stal ocynkowana",
    steps: [
      "odtłuszczanie i trawienie",
      "odgazowanie (wygrzanie w piecu)",
      "lakierowanie proszkowe",
      "utwardzanie (polimeryzacja)",
      "kontrola jakości",
    ],
  },
];

function DimensionsDiagram() {
  return (
    <div className="flex h-full flex-col justify-between border border-white/12 bg-ink/40 p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <span className="text-[0.625rem] uppercase tracking-[0.18em] text-steel">
          Maksymalny gabaryt elementu
        </span>
        <span className="num text-[0.5625rem] uppercase tracking-[0.16em] text-steel-dark">
          ALCOLOR / komora
        </span>
      </div>

      <figure className="mx-auto w-full max-w-[560px]">
        <svg viewBox="0 0 560 340" role="img" aria-labelledby="dim-title dim-desc" className="h-auto w-full">
          <title id="dim-title">Gabaryty elementów lakierowanych proszkowo</title>
          <desc id="dim-desc">
            Schemat maksymalnych wymiarów elementu: długość 7300 mm, szerokość 2000 mm, wysokość
            2500 mm.
          </desc>
          <defs>
            <linearGradient id="boxFill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#e80000" stopOpacity="0.10" />
            </linearGradient>
          </defs>

          {/* bryła */}
          <g stroke="rgba(255,255,255,0.28)" strokeWidth="1" fill="url(#boxFill)">
            <path d="M70 110 L360 110 L360 262 L70 262 Z" />
            <path d="M70 110 L120 76 L410 76 L360 110 Z" />
            <path d="M360 110 L410 76 L410 228 L360 262 Z" />
          </g>

          {/* wymiar długości */}
          <g stroke="#e80000" strokeWidth="1">
            <path d="M70 296 L360 296" />
            <path d="M70 289 L70 303" />
            <path d="M360 289 L360 303" />
          </g>
          <text x="215" y="288" fill="#ffffff" fontSize="13" fontFamily="Space Grotesk, sans-serif" textAnchor="middle">
            7300 mm
          </text>
          <text x="215" y="318" fill="#a7adb5" fontSize="9" letterSpacing="2" textAnchor="middle">
            DŁUGOŚĆ
          </text>

          {/* wymiar wysokości */}
          <g stroke="rgba(255,255,255,0.45)" strokeWidth="1">
            <path d="M434 76 L434 228" />
            <path d="M427 76 L441 76" />
            <path d="M427 228 L441 228" />
          </g>
          <text
            x="450"
            y="152"
            fill="#ffffff"
            fontSize="12"
            fontFamily="Space Grotesk, sans-serif"
            transform="rotate(0 450 152)"
          >
            2500 mm
          </text>
          <text x="450" y="168" fill="#a7adb5" fontSize="8" letterSpacing="1.6">
            WYSOKOŚĆ
          </text>

          {/* wymiar szerokości (głębokości) */}
          <g stroke="rgba(255,255,255,0.45)" strokeWidth="1">
            <path d="M50 108 L112 58" />
            <path d="M46.5 104.4 L53.5 111.6" />
            <path d="M108.5 54.4 L115.5 61.6" />
          </g>
          <text x="128" y="52" fill="#ffffff" fontSize="12" fontFamily="Space Grotesk, sans-serif">
            2000 mm
          </text>
          <text x="128" y="38" fill="#a7adb5" fontSize="8" letterSpacing="1.6">
            SZEROKOŚĆ
          </text>
        </svg>
        <figcaption className="mt-2 flex items-center gap-2 text-[0.5625rem] uppercase tracking-[0.14em] text-steel-dark">
          <span className="h-px w-5 bg-brand" aria-hidden="true" />
          Schemat poglądowy — wymiary maksymalne
        </figcaption>
      </figure>

      <p className="border-t border-white/10 pt-4 text-xs leading-relaxed text-steel-dark">
        Możliwość szybkiej zmiany koloru. Kolory według palety RAL, w różnych stopniach połysku,
        fakturach i strukturach.
      </p>
    </div>
  );
}

export default function Coating() {
  useSeo({
    ...pageMeta["/lakierowanie-proszkowe"],
    path: "/lakierowanie-proszkowe",
    image: "images/coating-panels-1200.webp",
    jsonLd: serviceJsonLd(
      "Lakierowanie proszkowe",
      "Lakierowanie proszkowe elementów metalowych w lakierni ALCOLOR — pełne przygotowanie powierzchni, kolory RAL, gabaryty do 7300 × 2000 × 2500 mm.",
      "/lakierowanie-proszkowe"
    ),
  });

  const coatingGallery = gallery.filter((g) => g.category === "coating").slice(0, 7);

  return (
    <>
      <PageIntro
        parent="Usługi"
        label="Lakierowanie proszkowe"
        no="04"
        title={
          <>
            LAKIEROWANIE
            <br /> PROSZKOWE
          </>
        }
        lead="Lakiernia proszkowa ALCOLOR, wchodząca w skład Grupy Sportex, prowadzi pełne przygotowanie mechaniczne i chemiczne powierzchni oraz malowanie elementów stalowych, ocynkowanych i aluminiowych."
        aside={
          <div className="border border-white/12 bg-white/[0.03] p-5">
            <p className="text-[0.625rem] uppercase tracking-[0.2em] text-brand-soft">ALCOLOR</p>
            <p className="mt-3 text-sm leading-relaxed text-steel">
              Lakiernia proszkowa w Grupie Sportex — usługi dla budownictwa, motoryzacji,
              elektromechaniki i gospodarstwa domowego.
            </p>
          </div>
        }
      />

      <PhotoBand
        image="coating-racks"
        alt="Elementy stalowe na wózkach lakierni proszkowej"
        caption="Lakiernia ALCOLOR / linia technologiczna"
        height="h-[240px] sm:h-[320px] lg:h-[420px]"
        priority
      />

      <section className="bg-ink py-20 lg:py-28">
        <div className="wrap">
          <SectionHead
            dark
            no="01"
            label="Możliwości"
            title="GABARYTY I PARAMETRY"
            intro="Lakiernia pozwala malować elementy o różnych kształtach i gabarytach — z możliwością szybkiej zmiany koloru."
          />

          <div className="mt-12 grid gap-4 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <DimensionsDiagram />
            </Reveal>
            <Reveal delay={80} className="lg:col-span-5">
              <div className="h-full border border-white/12 p-6 lg:p-8">
                <h3 className="text-[0.6875rem] uppercase tracking-[0.16em] text-steel">
                  Parametry procesu
                </h3>
                <div className="mt-5">
                  <SpecTable dark caption="Parametry procesu lakierowania" rows={coatingSpecs} />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-graphite-2 py-20 lg:py-28">
        <div className="wrap">
          <SectionHead
            dark
            no="02"
            label="Przygotowanie"
            title="POWIERZCHNIA DECYDUJE O TRWAŁOŚCI"
            intro="Na trwałość i jakość powłoki wpływa przygotowanie powierzchni. Zapewniamy obróbkę strumieniowo-ścierną oraz pełne przygotowanie chemiczne."
          />

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <Reveal className="border-t border-white/10 pt-6">
              <span className="num text-[0.625rem] text-brand-soft">01</span>
              <h3 className="display-md mt-4 text-white">Piaskowanie i śrutowanie</h3>
              <p className="mt-4 text-sm leading-relaxed text-steel">
                Mechaniczne oczyszczenie powierzchni z rdzy i zanieczyszczeń strumieniem sprężonego
                powietrza z dodatkiem twardych cząstek. Do śrutowania używamy śrutu staliwnego, do
                piaskowania — szlaki pomiedziowej.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-steel">
                Efekt jest podobny do szlifowania, ale powierzchnia pozostaje gładsza, a trudno
                dostępne zakamarki i załamania są czyszczone równomiernie.
              </p>
            </Reveal>

            <Reveal delay={80} className="border-t border-white/10 pt-6">
              <span className="num text-[0.625rem] text-brand-soft">02</span>
              <h3 className="display-md mt-4 text-white">Przygotowanie chemiczne</h3>
              <p className="mt-4 text-sm leading-relaxed text-steel">
                Pełne przygotowanie chemiczne z użyciem komponentów posiadających stosowne
                certyfikaty i dopuszczenia. Obejmuje odtłuszczanie, trawienie, płukanie,
                chromianowanie lub fosforanowanie oraz suszenie — w zależności od podłoża.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-steel">
                Oferta obejmuje malowanie aluminium oraz elementów stalowych surowych,
                lakierowanych, fosforanowanych i ocynkowanych — chemicznie i ogniowo.
              </p>
            </Reveal>
          </div>

          <div className="mt-14">
            <h3 className="text-[0.6875rem] uppercase tracking-[0.16em] text-steel">
              Ciągi technologiczne
            </h3>
            <div className="mt-6 grid gap-px bg-white/10 md:grid-cols-2 xl:grid-cols-4">
              {lines.map((line, i) => (
                <Reveal key={line.title} delay={i * 50} className="bg-graphite-2 p-6">
                  <p className="num text-[0.625rem] text-brand-soft">{String(i + 1).padStart(2, "0")}</p>
                  <h4 className="mt-3 text-base font-semibold text-white">{line.title}</h4>
                  <ol className="mt-4 space-y-1.5 text-xs leading-relaxed text-steel">
                    {line.steps.map((s, j) => (
                      <li key={s} className="flex gap-2">
                        <span className="num text-steel-dark">{String(j + 1).padStart(2, "0")}</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ol>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light py-20 text-ink lg:py-28">
        <div className="wrap">
          <SectionHead
            no="03"
            label="Farby"
            title="RODZAJE POWŁOK"
            intro="Dobór farby zależy od środowiska pracy elementu — odporności chemicznej, mechanicznej i na promieniowanie UV."
          />

          <div className="mt-12 grid gap-px border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {paintTypes.map((p) => (
              <div key={p.name} className="bg-light p-6">
                <h3 className="text-base font-semibold text-ink">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-graphite/70">{p.use}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h3 className="display-md text-ink">ZASTOSOWANIA</h3>
              <p className="mt-4 text-sm leading-relaxed text-graphite/75">
                Lakiernia jest przystosowana do zróżnicowanego asortymentu — od profili
                aluminiowych po konstrukcje stalowe i elementy maszyn.
              </p>
            </div>
            <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:col-span-7">
              {coatingApplications.map((app) => (
                <li key={app} className="flex items-start gap-3 border-b border-ink/10 py-2 text-sm text-graphite/80">
                  <span className="mt-1.5 h-1 w-1 shrink-0 bg-brand" aria-hidden="true" />
                  {app}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 lg:py-24">
        <div className="wrap">
          <SectionHead
            dark
            no="04"
            label="Galeria"
            title="LAKIERNIA I DETALE"
            intro="Elementy na wózkach lakierniczych, profile po malowaniu oraz linia technologiczna."
          />
          <div className="mt-10">
            <GalleryGrid items={coatingGallery} />
          </div>
        </div>
      </section>

      <RelatedServices current="/lakierowanie-proszkowe" />
      <CTASection
        title="POTRZEBUJESZ POWŁOKI O OKREŚLONYCH PARAMETRACH?"
        lead="Podaj materiał, gabaryt, kolor z palety RAL i wymaganą odporność — dobierzemy odpowiedni ciąg technologiczny."
        image="coating-panels"
      />
    </>
  );
}
