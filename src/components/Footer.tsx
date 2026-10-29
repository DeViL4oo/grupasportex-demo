import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { asset } from "./Img";
import { company, services } from "../data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0b0d10]">
      <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0 opacity-50" />
      <div className="wrap relative">
        <div className="grid gap-12 py-14 sm:grid-cols-2 md:gap-10 md:py-16 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-4">
            <img
              src={asset("logo-sportex.png")}
              alt="GRUPA SPORTEX"
              width={240}
              height={75}
              loading="lazy"
              className="h-8 w-auto"
            />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-steel">
              Obróbka plastyczna blach, cięcie laserowe, spawanie konstrukcji stalowych oraz
              lakierowanie proszkowe. Cztery technologie w jednym zakładzie, na Pomorzu.
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <a
                href={company.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-steel transition-colors hover:text-white"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                <span>
                  {company.street}
                  <br />
                  {company.postal} {company.city}
                </span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-3 lg:col-start-5">
            <h2 className="eyebrow text-steel-dark">Usługi</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={s.slug}
                    className="group inline-flex items-baseline gap-2 text-steel transition-colors hover:text-white"
                  >
                    <span className="num text-[0.6875rem] tracking-[0.08em] text-brand-soft">{s.no}</span>
                    <span className="border-b border-transparent transition-colors group-hover:border-white/30">
                      {s.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 lg:col-start-8">
            <h2 className="eyebrow text-steel-dark">Firma</h2>
            <ul className="mt-5 space-y-3 text-sm text-steel">
              <li>
                <Link to="/o-firmie" className="transition-colors hover:text-white">
                  O firmie
                </Link>
              </li>
              <li>
                <Link to="/realizacje" className="transition-colors hover:text-white">
                  Realizacje
                </Link>
              </li>
              <li>
                <Link to="/kontakt" className="transition-colors hover:text-white">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link to="/polityka-prywatnosci" className="transition-colors hover:text-white">
                  Polityka prywatności
                </Link>
              </li>
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-3 lg:col-start-10">
            <h2 className="eyebrow text-steel-dark">Kontakt</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${company.phoneHref}`}
                  className="flex items-center gap-3 text-white transition-colors hover:text-brand"
                >
                  <Phone className="h-4 w-4 text-brand" aria-hidden="true" />
                  <span className="num">{company.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="flex items-center gap-3 break-all text-steel transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                  {company.email}
                </a>
              </li>
            </ul>
            <Link to="/kontakt" className="link-arrow mt-6 inline-flex">
              Formularz zapytania
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-steel-dark lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {year} Grupa Sportex. Wszelkie prawa zastrzeżone.
          </p>
          <p className="max-w-xl text-steel-dark lg:text-right">{company.demoNote}</p>
        </div>
      </div>
    </footer>
  );
}
