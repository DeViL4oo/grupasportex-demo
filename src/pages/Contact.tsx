import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "../components/ContactForm";
import { Img } from "../components/Img";
import { Reveal } from "../components/Reveal";
import { PageIntro, SectionHead } from "../components/ui";
import { useSeo, localBusinessJsonLd } from "../lib/seo";
import { pageMeta } from "../data/meta";
import { company, departments } from "../data/site";

export default function Contact() {
  useSeo({
    ...pageMeta["/kontakt"],
    path: "/kontakt",
    image: "images/plant-exterior-640.webp",
    jsonLd: localBusinessJsonLd,
  });

  return (
    <>
      <PageIntro
        label="Kontakt"
        eyebrow="Zapytania i wyceny"
        no="07"
        title={
          <>
            POROZMAWIAJMY
            <br /> O TWOIM PROJEKCIE
          </>
        }
        lead="Wybierz kontakt bezpośredni lub wyślij zapytanie przez formularz. Do wyceny potrzebujemy dokumentacji technicznej — dołącz ją do wiadomości e-mail."
      />

      <section className="bg-ink pb-16 lg:pb-20">
        <div className="wrap">
          <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {departments.map((d) => (
              <Reveal key={d.name} className="flex flex-col bg-ink p-6 lg:p-7">
                <h2 className="text-[0.625rem] uppercase leading-relaxed tracking-[0.16em] text-steel">
                  {d.name}
                </h2>
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
              </Reveal>
            ))}
          </div>

          <div className="mt-6 grid gap-4 border border-white/10 p-6 sm:grid-cols-3 sm:p-8">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
              <div>
                <p className="text-[0.625rem] uppercase tracking-[0.16em] text-steel-dark">Adres</p>
                <p className="mt-1.5 text-sm text-white">
                  {company.street}
                  <br />
                  {company.postal} {company.city}
                  <br />
                  woj. pomorskie
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
              <div>
                <p className="text-[0.625rem] uppercase tracking-[0.16em] text-steel-dark">
                  Centrala
                </p>
                <a
                  href={`tel:${company.phoneHref}`}
                  className="num mt-1.5 block text-sm text-white hover:text-brand"
                >
                  {company.phone}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
              <div>
                <p className="text-[0.625rem] uppercase tracking-[0.16em] text-steel-dark">
                  E-mail ogólny
                </p>
                <a
                  href={`mailto:${company.email}`}
                  className="mt-1.5 block break-all text-sm text-white hover:text-brand"
                >
                  {company.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-graphite-2 py-20 lg:py-24">
        <div className="wrap">
          <SectionHead
            dark
            no="01"
            label="Zapytanie"
            title="PRZEŚLIJ SZCZEGÓŁY ZAMÓWIENIA"
            intro="Im więcej danych na wejściu, tym szybsza i dokładniejsza wycena: materiał, grubość, ilość, termin oraz pliki DXF/DWG/STEP."
          />

          <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            <div className="space-y-4 lg:col-span-5">
              <div className="border border-white/12 p-6">
                <h3 className="text-[0.6875rem] uppercase tracking-[0.16em] text-steel">
                  Co dołączyć do zapytania
                </h3>
                <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-steel">
                  {[
                    "Rysunek lub model: DXF, DWG, STEP, IGES, SAT, PRT",
                    "Materiał: gatunek, grubość, wykończenie powierzchni",
                    "Liczba sztuk i informacja o powtarzalności zamówienia",
                    "Wymagany termin i sposób dostawy",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 bg-brand" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-white/12 p-6">
                <h3 className="text-[0.6875rem] uppercase tracking-[0.16em] text-steel">
                  Kontakt bezpośredni
                </h3>
                <div className="mt-4 space-y-3 text-sm">
                  <a
                    href={`tel:${company.phoneHref}`}
                    className="flex items-center gap-3 text-white hover:text-brand"
                  >
                    <Phone className="h-4 w-4 text-brand" aria-hidden="true" />
                    <span className="num">{company.phone}</span>
                  </a>
                  <a
                    href={`mailto:${company.email}`}
                    className="flex items-center gap-3 break-all text-steel hover:text-white"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                    {company.email}
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 lg:py-24" aria-labelledby="map-heading">
        <div className="wrap">
          <div className="flex flex-col gap-4 border-t border-white/10 pt-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="num text-[0.6875rem] text-brand-soft">02</span>
                <span className="h-px w-8 bg-brand" aria-hidden="true" />
                <span className="eyebrow text-steel">Dojazd</span>
              </div>
              <h2 id="map-heading" className="display-md mt-4 text-white">
                {company.street}, {company.postal} {company.city}
              </h2>
            </div>
            <a
              href={company.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Otwórz w mapach
              <MapPin className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <a
            href={company.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 block overflow-hidden border border-white/10 bg-graphite"
            aria-label="Otwórz lokalizację Grupy Sportex w mapach"
          >
            <span className="relative block aspect-[2/1] w-full">
              <Img
                name="map"
                sizes="(min-width: 1400px) 1400px, 100vw"
                imgClassName="transition-transform duration-700 group-hover:scale-[1.02] motion-reduce:transition-none"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent"
              />
            </span>
          </a>
          <p className="mt-3 text-xs text-steel-dark">
            <a
              href="https://www.openstreetmap.org/copyright"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-steel"
            >
              © OpenStreetMap
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
