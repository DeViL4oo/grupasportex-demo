import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import { Img } from "./Img";
import { Reveal } from "./Reveal";
import { company, services } from "../data/site";

/* ---------------------------------------------------------------- nagłówek sekcji */

export function SectionHead({
  no,
  label,
  title,
  intro,
  dark = false,
  align = "between",
  titleId,
}: {
  no: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  dark?: boolean;
  align?: "between" | "stack";
  titleId?: string;
}) {
  return (
    <Reveal
      className={`flex flex-col gap-8 border-t pt-6 ${
        dark ? "border-white/10" : "border-ink/12"
      } ${align === "between" ? "lg:flex-row lg:items-end lg:justify-between" : ""}`}
    >
      <div className="max-w-3xl">
        <div className="flex items-center gap-3">
          <span className={`num text-[0.6875rem] font-semibold ${dark ? "text-brand-soft" : "text-brand-deep"}`}>
            {no}
          </span>
          <span className="h-px w-8 bg-brand" aria-hidden="true" />
          <span className={`eyebrow ${dark ? "text-steel" : "text-graphite/70"}`}>{label}</span>
        </div>
        <h2 id={titleId} className={`display-lg mt-6 ${dark ? "text-white" : "text-ink"}`}>
          {title}
        </h2>
      </div>
      {intro && (
        <div
          className={`max-w-md text-[0.9375rem] leading-relaxed ${
            dark ? "text-steel" : "text-graphite/75"
          }`}
        >
          {intro}
        </div>
      )}
    </Reveal>
  );
}

/* ---------------------------------------------------------------- hero podstron */

export function PageIntro({
  parent,
  label,
  title,
  lead,
  aside,
  no,
  eyebrow,
}: {
  parent?: string;
  label: string;
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  aside?: ReactNode;
  no?: string;
}) {
  return (
    <div className="relative overflow-hidden bg-ink pt-[104px] lg:pt-[132px]">
      <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0 opacity-60" />
      <div className="wrap relative pb-12 lg:pb-16">
        <nav aria-label="Ścieżka nawigacji" className="hero-in">
          <ol className="flex flex-wrap items-center gap-2 text-[0.6875rem] uppercase tracking-[0.18em] text-steel-dark">
            <li>
              <Link to="/" className="transition-colors hover:text-white">
                Start
              </Link>
            </li>
            {parent && (
              <>
                <li aria-hidden="true" className="text-steel-dark/50">
                  /
                </li>
                <li>{parent}</li>
              </>
            )}
            <li aria-hidden="true" className="text-steel-dark/50">
              /
            </li>
            <li className="text-steel">{label}</li>
          </ol>
        </nav>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3">
              {no && <span className="num text-[0.6875rem] text-brand-soft">{no}</span>}
              <span className="h-px w-8 bg-brand" aria-hidden="true" />
              <span className="eyebrow text-steel">{eyebrow ?? label}</span>
            </div>
            <h1 className="display-xl hero-in mt-6 max-w-4xl text-white">{title}</h1>
          </div>
          {aside && (
            <div className="lg:col-span-4 lg:flex lg:flex-col lg:justify-end lg:pb-2">{aside}</div>
          )}
        </div>
        {lead && (
          <div className="mt-8 max-w-2xl text-base leading-relaxed text-steel lg:text-[1.0625rem]">
            {lead}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- pasek parametrów */

export function SpecStrip({
  items,
  dark = false,
}: {
  items: { label: string; value: string; unit?: string }[];
  dark?: boolean;
}) {
  return (
    <dl
      className={`grid grid-cols-2 border-t lg:grid-cols-4 ${
        dark ? "border-white/12" : "border-ink/12"
      }`}
    >
      {items.map((item, i) => (
        <div
          key={item.label}
          className={`border-b py-6 pr-4 lg:py-8 ${
            dark ? "border-white/10" : "border-ink/10"
          } ${i % 2 === 1 ? "pl-5 lg:pl-6" : ""} ${i > 0 ? "lg:pl-6" : ""} ${
            i > 0 ? "lg:border-l" : ""
          } ${i > 0 ? (dark ? "lg:border-white/10" : "lg:border-ink/10") : ""}`}
        >
          <dd className={`num text-[1.75rem] leading-none lg:text-[2.35rem] ${dark ? "text-white" : "text-ink"}`}>
            {item.value}
            {item.unit && (
              <span className={`ml-1 text-[0.5em] font-medium ${dark ? "text-steel" : "text-graphite/70"}`}>
                {item.unit}
              </span>
            )}
          </dd>
          <dt className={`mt-3 text-[0.6875rem] uppercase tracking-[0.16em] ${dark ? "text-steel" : "text-graphite/70"}`}>
            {item.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}

/* ---------------------------------------------------------------- tabela specyfikacji */

export function SpecTable({
  rows,
  dark = false,
  caption,
}: {
  rows: { label: string; value: string }[];
  dark?: boolean;
  caption?: string;
}) {
  return (
    <table className="w-full border-collapse text-left">
      {caption && <caption className="sr-only">{caption}</caption>}
      <tbody>
        {rows.map((row) => (
          <tr
            key={row.label}
            className={`border-b ${dark ? "border-white/10" : "border-ink/10"}`}
          >
            <th
              scope="row"
              className={`py-3.5 pr-4 text-[0.6875rem] font-medium uppercase tracking-[0.14em] ${
                dark ? "text-steel" : "text-graphite/70"
              }`}
            >
              {row.label}
            </th>
            <td
              className={`num py-3.5 text-right text-sm font-medium ${
                dark ? "text-white" : "text-ink"
              }`}
            >
              {row.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ---------------------------------------------------------------- zdjęcie pełnej szerokości */

export function PhotoBand({
  image,
  alt,
  caption,
  className = "",
  height = "h-[280px] sm:h-[380px] lg:h-[520px]",
  priority = false,
}: {
  image: string;
  alt?: string;
  caption?: string;
  className?: string;
  height?: string;
  priority?: boolean;
}) {
  return (
    <figure className={`relative overflow-hidden bg-graphite ${className}`}>
      <div className={`relative w-full ${height}`}>
        <Img name={image} alt={alt} priority={priority} sizes="100vw" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent"
        />
        {caption && (
          <figcaption className="absolute bottom-4 left-5 right-5 flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.14em] text-white/75 md:bottom-6 md:left-8">
            <span className="h-px w-6 bg-brand" aria-hidden="true" />
            {caption}
          </figcaption>
        )}
      </div>
    </figure>
  );
}

/* ---------------------------------------------------------------- CTA */

export function CTASection({
  title = "MASZ PROJEKT? MY ZAJMIEMY SIĘ JEGO REALIZACJĄ.",
  lead = "Prześlij dokumentację techniczną i opisz swoje potrzeby. Porozmawiajmy o możliwościach współpracy.",
  image = "sign-cut",
}: {
  title?: ReactNode;
  lead?: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink" aria-labelledby="cta-heading">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[58%]">
          <Img name={image} alt="" sizes="(min-width: 1024px) 58vw, 100vw" imgClassName="opacity-45" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#111317_28%,rgba(17,19,23,0.92)_52%,rgba(17,19,23,0.55)_100%)]" />
        <div className="grid-lines absolute inset-0 opacity-30" />
      </div>
      <div className="wrap relative py-20 lg:py-28">
        <Reveal className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-brand" aria-hidden="true" />
            <span className="eyebrow text-steel">Zapytanie ofertowe</span>
          </div>
          <h2 id="cta-heading" className="display-lg mt-6 text-white">
            {title}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-steel">{lead}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link to="/kontakt" className="btn btn-primary">
              Poproś o wycenę
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a href={`tel:${company.phoneHref}`} className="btn btn-outline">
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span className="num">{company.phone}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- powiązane usługi */

export function RelatedServices({ current }: { current: string }) {
  const others = services.filter((s) => s.slug !== current);
  return (
    <section className="border-t border-white/10 bg-graphite-2" aria-labelledby="related-heading">
      <div className="wrap py-16 lg:py-20">
        <div className="flex items-end justify-between gap-6">
          <h2 id="related-heading" className="display-md text-white">
            Powiązane usługi
          </h2>
          <Link to="/realizacje" className="link-arrow hidden text-steel sm:inline-flex">
            Realizacje
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
        <ul className="mt-10 grid gap-px bg-white/10 sm:grid-cols-3">
          {others.map((s) => (
            <li key={s.slug} className="bg-graphite-2">
              <Link to={s.slug} className="group flex h-full flex-col gap-4 p-6 transition-colors hover:bg-white/[0.03] lg:p-7">
                <span className="num text-[0.625rem] text-brand-soft">{s.no}</span>
                <span className="display-md text-white">{s.title}</span>
                <span className="mt-auto flex items-center gap-2 pt-4 text-[0.6875rem] uppercase tracking-[0.14em] text-steel">
                  Zobacz
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- notka / disclaimer */

export function NoteBox({ children }: { children: ReactNode }) {
  return (
    <p className="flex gap-3 border-l border-brand/60 bg-white/[0.03] px-4 py-3 text-xs leading-relaxed text-steel">
      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-brand" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
