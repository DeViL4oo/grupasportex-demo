import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import { Img } from "../components/Img";
import { Reveal } from "../components/Reveal";
import { CTASection, PageIntro, PhotoBand, SectionHead } from "../components/ui";
import { useSeo, organizationJsonLd } from "../lib/seo";
import { pageMeta } from "../data/meta";
import { company, services } from "../data/site";

export default function About() {
  useSeo({
    ...pageMeta["/o-firmie"],
    path: "/o-firmie",
    image: "images/plant-exterior-640.webp",
    jsonLd: organizationJsonLd,
  });

  return (
    <>
      <PageIntro
        label="O firmie"
        no="02"
        title={
          <>
            CZTERY TECHNOLOGIE.
            <br /> JEDEN ZAKŁAD.
          </>
        }
        lead="Obróbka plastyczna blach, cięcie laserowe, spawanie konstrukcji stalowych oraz lakierowanie proszkowe — realizowane w jednym miejscu, na własnym parku maszynowym."
        aside={
          <dl className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0">
            {[
              ["2", "wycinarki laserowe"],
              ["1", "prasa 160 ton"],
              ["1", "lakiernia proszkowa"],
            ].map(([v, l]) => (
              <div key={l}>
                <dd className="num text-3xl text-white">{v}</dd>
                <dt className="mt-2 text-[0.5625rem] uppercase leading-tight tracking-[0.14em] text-steel">
                  {l}
                </dt>
              </div>
            ))}
          </dl>
        }
      />

      <PhotoBand
        image="plant-exterior-2"
        alt="Zakład produkcyjny Grupy Sportex — hala i plac manewrowy"
        caption="Zakład produkcyjny / Mosty, woj. pomorskie"
        priority
      />

      <section className="bg-ink py-20 lg:py-28">
        <div className="wrap">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHead
                dark
                no="01"
                label="Profil działalności"
                title={
                  <>
                    OBRÓBKA METALI
                    <br /> OD DETALU
                    <br /> DO KONSTRUKCJI
                  </>
                }
                align="stack"
              />
              <div className="mt-10 border-t border-white/10 pt-5">
                <p className="text-[0.625rem] uppercase tracking-[0.16em] text-steel-dark">
                  Zakład produkcyjny
                </p>
                <p className="mt-2 text-sm text-white">
                  {company.street}, {company.postal} {company.city}
                  <br />
                  woj. pomorskie
                </p>
                <a
                  href={company.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-arrow mt-4 inline-flex"
                >
                  Zobacz na mapie
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="space-y-6 text-[0.9375rem] leading-relaxed text-steel lg:col-span-6 lg:col-start-7">
              <Reveal>
                <p>
                  Podstawowym profilem działalności Grupy Sportex jest obróbka plastyczna blach —
                  gięcie CNC oraz cięcie laserowe. Usługi realizujemy w oparciu o nowoczesny park
                  maszynowy, dzięki czemu efekty pracy odznaczają się powtarzalną precyzją i
                  starannością wykonania.
                </p>
              </Reveal>
              <Reveal delay={60}>
                <p>
                  Cięcie wykonujemy z materiału powierzonego oraz z własnego magazynu blach.
                  Uzupełnieniem oferty jest spawanie konstrukcji stalowych według dokumentacji
                  klienta — a gdy dokumentacji brakuje, pomagają ją przygotować nasi konstruktorzy.
                </p>
              </Reveal>
              <Reveal delay={100}>
                <p>
                  W skład Grupy Sportex wchodzi lakiernia proszkowa ALCOLOR, specjalizująca się w
                  usługach dla budownictwa, przemysłu motoryzacyjnego, elektromechanicznego i
                  gospodarstwa domowego. Dzięki połączeniu technologii klient załatwia cały proces
                  w jednym miejscu.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-light py-20 text-ink lg:py-28">
        <div className="wrap">
          <SectionHead
            no="02"
            label="Możliwości"
            title="CO ROBIMY"
            intro="Cztery obszary, które pokrywają pełny cykl przygotowania elementu metalowego."
          />

          <ul className="mt-12 grid gap-px border border-ink/10 bg-ink/10 sm:grid-cols-2">
            {services.map((s) => (
              <li key={s.id} className="bg-light">
                <Link to={s.slug} className="group flex h-full flex-col p-7 transition-colors hover:bg-white lg:p-9">
                  <span className="num text-[0.625rem] text-brand-deep">{s.no}</span>
                  <h3 className="display-md mt-4 text-ink">{s.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-graphite/70">{s.lead}</p>
                  <span className="mt-6 flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink transition-colors group-hover:text-brand-deep">
                    Zobacz usługę
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ink py-20 lg:py-28">
        <div className="wrap">
          <SectionHead
            dark
            no="03"
            label="Organizacja pracy"
            title="JAK PRACUJEMY"
            intro="Zakres zamówienia dopasowujemy do dokumentacji, materiału i terminu — bez sztywnego schematu."
          />

          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <figure className="relative">
                <div className="relative aspect-[4/5] overflow-hidden bg-graphite sm:aspect-[4/3] lg:aspect-[4/5]">
                  <Img
                    name="coating-line"
                    alt="Ciąg technologiczny lakierni proszkowej w zakładzie"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                  />
                </div>
                <figcaption className="mt-3 text-[0.625rem] uppercase tracking-[0.16em] text-steel-dark">
                  Ciąg technologiczny lakierni ALCOLOR
                </figcaption>
              </figure>
            </Reveal>

            <div className="lg:col-span-6 lg:col-start-7">
              <ul className="divide-y divide-white/10 border-y border-white/10">
                {[
                  ["Materiał powierzony i własny", "Magazyn blach 3000 × 1500 mm: stal czarna, nierdzewna (304) oraz aluminium — z możliwością sprowadzenia innych materiałów przy większych zamówieniach."],
                  ["Kompletna realizacja", "Cięcie, gięcie, spawanie i lakierowanie proszkowe wykonywane w ramach jednej współpracy — bez koordynowania kilku dostawców."],
                  ["Transport", "Własny transport przy odbiorze i dostawie elementów. Przy większych odległościach korzystamy ze sprawdzonych przewoźników i firm spedycyjnych."],
                  ["Wsparcie techniczne", "Konsultacje w zakresie doboru materiału, technologii i przygotowania dokumentacji do wyceny."],
                ].map(([title, text], i) => (
                  <Reveal as="li" key={title} delay={i * 50} className="py-5">
                    <div className="flex items-start gap-4">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                      <div>
                        <h3 className="text-base font-semibold text-white">{title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-steel">{text}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-graphite-2 py-16 lg:py-20">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow text-brand-soft">ALCOLOR</p>
              <h2 className="display-lg mt-4 text-white">LAKIERNIA W RAMACH GRUPY</h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-steel">
                Lakiernia proszkowa ALCOLOR działa w ramach Grupy Sportex. Pełne przygotowanie
                mechaniczne i chemiczne powierzchni, malowanie proszkowe oraz kontrola jakości na
                każdym etapie cyklu technologicznego.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-px bg-white/10 lg:col-span-5">
              {[
                { label: "Maks. długość", value: "7300", unit: "mm" },
                { label: "Maks. wysokość", value: "2500", unit: "mm" },
                { label: "Grubość powłoki", value: "60–120", unit: "µm" },
                { label: "Utwardzanie", value: "200", unit: "°C" },
              ].map((s) => (
                <div key={s.label} className="bg-graphite-2 p-5">
                  <p className="num text-3xl leading-none text-white">
                    {s.value}
                    <span className="ml-1 text-xs text-steel">{s.unit}</span>
                  </p>
                  <p className="mt-2 text-[0.5625rem] uppercase leading-snug tracking-[0.14em] text-steel">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <Link to="/lakierowanie-proszkowe" className="btn btn-outline mt-10">
            Lakierowanie proszkowe ALCOLOR
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="bg-ink py-14 lg:py-16">
        <div className="wrap grid gap-6 sm:grid-cols-3">
          {[
            ["Siedziba", `${company.street}, ${company.postal} ${company.city}`],
            ["Telefon", company.phone],
            ["E-mail", company.email],
          ].map(([label, value], i) => (
            <div key={label} className={i > 0 ? "sm:border-l sm:border-white/10 sm:pl-6" : ""}>
              <p className="text-[0.625rem] uppercase tracking-[0.16em] text-steel-dark">{label}</p>
              <p className="mt-2 text-sm text-white">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
