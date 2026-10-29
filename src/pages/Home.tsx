import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Headset,
  Layers,
  MapPin,
  Repeat,
  Settings,
  Target,
} from "lucide-react";
import { Img, imageMeta } from "../components/Img";
import { Reveal } from "../components/Reveal";
import { MachinePark } from "../components/MachinePark";
import { CTASection, SectionHead } from "../components/ui";
import { useSeo, organizationJsonLd } from "../lib/seo";
import { pageMeta } from "../data/meta";
import {
  advantages,
  company,
  departments,
  gallery,
  galleryCategories,
  processSteps,
  services,
} from "../data/site";

const advantageIcons = {
  layers: Layers,
  cpu: Cpu,
  target: Target,
  settings: Settings,
  repeat: Repeat,
  headset: Headset,
} as const;

function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden bg-ink"
      aria-labelledby="hero-heading"
    >
      <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0 opacity-40" />

      <div className="wrap relative grid pt-[88px] lg:min-h-[90svh] lg:grid-cols-12 lg:items-stretch">
        <div className="flex flex-col justify-center py-12 lg:col-span-7 lg:py-16 lg:pr-12">
          <div className="hero-in flex items-center gap-3">
            <span className="h-2 w-2 bg-brand" aria-hidden="true" />
            <p className="eyebrow text-steel">Metal processing / Precision engineering</p>
          </div>

          <h1
            id="hero-heading"
            className="display-xl hero-in mt-7 max-w-[46rem] text-white"
            style={{ animationDelay: "90ms" }}
          >
            Precyzja, która nadaje kształt przemysłowi.
          </h1>

          <p
            className="hero-in mt-8 max-w-lg text-[0.9375rem] leading-relaxed text-steel lg:text-base"
            style={{ animationDelay: "180ms" }}
          >
            Kompleksowa obróbka metali — od precyzyjnego cięcia laserowego i gięcia CNC, przez
            spawanie, aż po profesjonalne lakierowanie proszkowe. Cztery technologie w jednym
            zakładzie na Pomorzu.
          </p>

          <div
            className="hero-in mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "260ms" }}
          >
            <a href="#uslugi" className="btn btn-primary">
              Poznaj nasze możliwości
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link to="/kontakt" className="btn btn-outline">
              Zapytaj o wycenę
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

        </div>

        <div className="relative -mx-5 mb-10 h-[52svh] min-h-[320px] sm:-mx-10 lg:col-span-5 lg:mx-0 lg:mb-0 lg:h-full lg:min-h-[520px]">
          <div className="relative h-full w-full overflow-hidden bg-graphite">
            <Img
              name="hero-laser"
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              imgClassName="saturate-[0.82] contrast-[1.04]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(100deg,rgba(17,19,23,0.75)_0%,rgba(17,19,23,0.12)_45%,rgba(17,19,23,0.35)_100%)]"
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/80 to-transparent" aria-hidden="true" />
            <p className="absolute bottom-4 left-4 right-4 text-[0.5625rem] uppercase leading-relaxed tracking-[0.16em] text-white/70 sm:bottom-6 sm:left-6">
              Wycinarka laserowa / zakład produkcyjny Grupy Sportex
            </p>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/15">
        <div className="wrap">
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {[
              { value: "25 mm", label: "Stal czarna — cięcie" },
              { value: "3100 mm", label: "Gięcie na prasie CNC" },
              { value: "MIG / TIG", label: "Spawanie konstrukcji" },
              { value: "7300 mm", label: "Lakierowanie — długość" },
            ].map((item, i) => (
              <div
                key={item.label}
                className={`border-white/10 py-5 lg:py-6 ${
                  i % 2 === 1 ? "border-l pl-4 lg:pl-6" : ""
                } ${i < 2 ? "border-b lg:border-b-0" : ""} ${i > 0 ? "lg:border-l lg:pl-6" : ""}`}
              >
                <dt className="sr-only">{item.label}</dt>
                <dd className="num text-base text-white lg:text-lg">{item.value}</dd>
                <dd className="mt-1 text-[0.625rem] uppercase tracking-[0.14em] text-steel-dark">
                  {item.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="uslugi" className="relative bg-light py-20 text-ink lg:py-28">
      <div aria-hidden="true" className="grid-lines-light pointer-events-none absolute inset-0 opacity-60" />
      <div className="wrap relative">
        <SectionHead
          no="01"
          label="Oferta"
          title={
            <>
              KOMPLEKSOWA
              <br /> OBRÓBKA METALI
            </>
          }
          intro="Nowoczesne technologie i szeroki zakres usług pozwalają realizować różnorodne projekty z zakresu obróbki metali — od pojedynczych detali po dostawy seryjne."
        />

        <div className="mt-12 grid gap-3 sm:gap-4 lg:grid-cols-12">
          {services.map((s, i) => (
            <Reveal
              key={s.id}
              delay={i * 60}
              className={[7, 5, 5, 7][i] === 7 ? "lg:col-span-7" : "lg:col-span-5"}
            >
              <Link
                to={s.slug}
                className="group flex h-full flex-col border border-ink/10 bg-white transition-colors hover:border-ink/25"
              >
                <div className="relative h-[220px] overflow-hidden bg-graphite sm:h-[280px] lg:h-[320px]">
                  <div className="media-zoom h-full w-full">
                    <Img
                      name={s.image}
                      alt={s.imageAlt}
                      sizes="(min-width: 1024px) 58vw, 100vw"
                    />
                  </div>
                  <span className="absolute left-0 top-0 flex items-center gap-2 bg-ink px-3 py-2">
                    <span aria-hidden="true" className="h-2 w-0.5 bg-brand" />
                    <span className="num text-[0.6875rem] tracking-[0.08em] text-white">{s.no}</span>
                  </span>
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 lg:p-7">
                  <h3 className="display-md text-ink">{s.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-graphite/70">
                    {s.short}
                  </p>
                  <span className="mt-6 flex items-center gap-2 border-t border-ink/10 pt-4 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink transition-colors group-hover:text-brand-deep">
                    Szczegóły usługi
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 lg:py-28" aria-labelledby="about-heading">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <figure className="relative">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-graphite lg:aspect-[4/5]">
                <Img
                  name="plant-exterior"
                  alt="Hala produkcyjna Grupy Sportex w Mostach"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
                <div className="absolute bottom-0 right-0 hidden w-[46%] border-l-4 border-t-4 border-ink bg-graphite sm:block">
                  <div className="aspect-square w-full overflow-hidden">
                    <Img
                      name="machined-part"
                      alt="Precyzyjny detal metalowy po obróbce"
                      sizes="20vw"
                    />
                  </div>
                </div>
                <span className="absolute left-6 top-0 h-16 w-px bg-brand" aria-hidden="true" />
              </div>
              <figcaption className="mt-4 text-[0.625rem] uppercase tracking-[0.16em] text-steel-dark">
                Zakład produkcyjny / Mosty, woj. pomorskie
              </figcaption>
            </figure>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="num text-[0.6875rem] text-brand-soft">02</span>
                <span className="h-px w-8 bg-brand" aria-hidden="true" />
                <span className="eyebrow text-steel">O firmie</span>
              </div>
              <h2 id="about-heading" className="display-lg mt-6 text-white">
                TECHNOLOGIA.
                <br /> DOŚWIADCZENIE.
                <br /> PRECYZJA.
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-8 space-y-5 text-[0.9375rem] leading-relaxed text-steel">
                <p>
                  Podstawowym profilem działalności Grupy Sportex jest obróbka plastyczna blach —
                  gięcie CNC oraz cięcie laserowe. Pracujemy na nowoczesnym parku maszynowym:
                  dwóch wycinarkach laserowych i prasie krawędziowej AM MACHINERY 3100 o nacisku
                  160 ton.
                </p>
                <p>
                  Cięcie wykonujemy zarówno z materiału powierzonego, jak i własnego — na miejscu
                  prowadzimy magazyn blach w formacie 3000 × 1500 mm. Zakres uzupełnia spawanie
                  konstrukcji stalowych oraz lakiernia proszkowa ALCOLOR, wchodząca w skład grupy.
                </p>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <dl className="mt-8 divide-y divide-white/10 border-y border-white/10">
                {[
                  ["Cztery technologie", "Cięcie, gięcie, spawanie i lakierowanie w jednym zakładzie"],
                  ["Materiał powierzony i własny", "Magazyn blach 3000 × 1500 mm, stal, nierdzewka, aluminium"],
                  ["Transport", "Własny transport oraz sprawdzeni przewoźnicy przy większych odległościach"],
                ].map(([title, text]) => (
                  <div key={title} className="grid gap-1 py-4 sm:grid-cols-5 sm:gap-6">
                    <dt className="text-[0.6875rem] uppercase tracking-[0.14em] text-white sm:col-span-2">
                      {title}
                    </dt>
                    <dd className="text-sm text-steel sm:col-span-3">{text}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={180}>
              <Link to="/o-firmie" className="btn btn-outline mt-9">
                Poznaj Grupę Sportex
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="bg-light py-20 text-ink lg:py-28" aria-labelledby="process-heading">
      <div className="wrap">
        <SectionHead
          no="04"
          label="Współpraca"
          title={
            <>
              OD PROJEKTU
              <br /> DO GOTOWEGO ELEMENTU
            </>
          }
          intro="Cztery etapy, które porządkują realizację — od pierwszego zapytania po odbiór gotowych elementów."
          titleId="process-heading"
        />

        <ol className="mt-14 grid gap-0 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal
              as="li"
              key={step.no}
              delay={i * 70}
              className={`relative border-t border-ink/15 pt-6 ${
                i > 0 ? "lg:border-l lg:border-ink/10 lg:pl-8" : ""
              } ${i < processSteps.length - 1 ? "lg:pr-8" : ""}`}
            >
              <span
                aria-hidden="true"
                className={`absolute -top-px h-px w-12 bg-brand ${
                  i > 0 ? "left-0 lg:left-8" : "left-0"
                }`}
              />
              <span className="num text-[0.6875rem] text-brand-soft">{step.no}</span>
              <h3 className="display-md mt-4 text-ink">{step.title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-graphite/70">{step.text}</p>
            </Reveal>
          ))}
        </ol>

        <p className="mt-10 max-w-2xl text-xs leading-relaxed text-graphite/70">
          Opis orientacyjny — zakres i warunki realizacji ustalane są indywidualnie dla każdego
          zamówienia.
        </p>
      </div>
    </section>
  );
}

function GalleryTeaser() {
  const items = gallery.slice(0, 5);
  const categories = galleryCategories.slice(1, 5);

  return (
    <section className="bg-ink py-20 lg:py-28" aria-labelledby="gallery-heading">
      <div className="wrap">
        <div className="flex flex-col gap-8 border-t border-white/10 pt-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="num text-[0.6875rem] text-brand-soft">05</span>
              <span className="h-px w-8 bg-brand" aria-hidden="true" />
              <span className="eyebrow text-steel">Realizacje</span>
            </div>
            <h2 id="gallery-heading" className="display-lg mt-6 text-white">
              NASZA PRACA
              <br /> W PRAKTYCE
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-sm leading-relaxed text-steel">
              Detale, konstrukcje i elementy po lakierowaniu — zdjęcia z zakładu produkcyjnego.
            </p>
            <Link to="/realizacje" className="link-arrow mt-6 inline-flex">
              Zobacz galerię
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="mt-12 grid auto-rows-[140px] grid-cols-2 gap-3 sm:auto-rows-[180px] sm:gap-4 lg:auto-rows-[200px] lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal
              key={item.id}
              delay={i * 50}
              className={i === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"}
            >
              <Link
                to="/realizacje"
                className="group relative block h-full w-full overflow-hidden bg-graphite"
                aria-label={`Realizacje — ${item.title}`}
              >
                <span className="absolute inset-0">
                  <Img
                    name={item.image}
                    alt={item.alt}
                    sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                    imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </span>
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-80"
                />
                <span className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-2 p-3 lg:p-4">
                  <span className="text-[0.625rem] uppercase leading-tight tracking-[0.12em] text-white/85">
                    {item.title}
                  </span>
                  <ArrowUpRight
                    className="h-3.5 w-3.5 shrink-0 text-white/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[0.625rem] uppercase tracking-[0.16em] text-steel-dark">
          {categories.map((c) => (
            <li key={c.id}>{c.label}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function AdvantagesSection() {
  return (
    <section className="bg-light py-20 text-ink lg:py-28" aria-labelledby="advantages-heading">
      <div className="wrap">
        <SectionHead
          no="06"
          label="Dlaczego Sportex"
          title={
            <>
              SOLIDNE ZAPLECZE
              <br /> DLA TWOJEJ PRODUKCJI
            </>
          }
          intro="Sześć powodów, dla których warto połączyć kilka etapów obróbki w jednym miejscu."
          titleId="advantages-heading"
        />

        <ul className="mt-12 grid gap-px border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((adv, i) => {
            const Icon = advantageIcons[adv.icon as keyof typeof advantageIcons];
            return (
              <li key={adv.title} className="bg-light p-6 lg:p-8">
                <div className="flex items-start justify-between gap-4">
                  <Icon className="h-6 w-6 text-brand" strokeWidth={1.4} aria-hidden="true" />
                  <span className="num text-[0.625rem] text-graphite/75">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink">{adv.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-graphite/70">{adv.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="border-t border-white/10 bg-ink py-20 lg:py-28" aria-labelledby="contact-heading">
      <div className="wrap">
        <SectionHead
          dark
          no="07"
          label="Kontakt"
          title={
            <>
              POROZMAWIAJMY
              <br /> O TWOIM PROJEKCIE
            </>
          }
          intro="Wybierz osobę lub dział odpowiedzialny za Twoje zapytanie. Dokumentację techniczną prześlij mailem — dołączymy ją do wyceny."
          titleId="contact-heading"
        />

        <div className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {departments.map((d) => (
            <div key={d.name} className="flex flex-col bg-ink p-6">
              <h3 className="text-[0.6875rem] uppercase tracking-[0.16em] text-steel">{d.name}</h3>
              {d.person && <p className="mt-4 text-base text-white">{d.person}</p>}
              <a
                href={`tel:${d.phoneHref}`}
                className="num mt-3 text-xl text-white transition-colors hover:text-brand"
              >
                {d.phone}
              </a>
              {d.email && (
                <a
                  href={`mailto:${d.email}`}
                  className="mt-2 break-all text-sm text-steel transition-colors hover:text-white"
                >
                  {d.email}
                </a>
              )}
              {d.note && <p className="mt-4 text-xs leading-relaxed text-steel-dark">{d.note}</p>}
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3 text-sm text-steel">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
            <p>
              {company.street}
              <br />
              {company.postal} {company.city}, woj. pomorskie
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/kontakt" className="btn btn-primary">
              Formularz zapytania
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={company.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Pokaż na mapie
              <MapPin className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useSeo({
    ...pageMeta["/"],
    path: "/",
    image: imageMeta("hero-laser")?.fallback,
    jsonLd: organizationJsonLd,
  });

  return (
    <>
      <Hero />
      <ServicesSection />
      <AboutSection />
      <MachinePark />
      <ProcessSection />
      <GalleryTeaser />
      <AdvantagesSection />
      <CTASection />
      <ContactSection />
    </>
  );
}
