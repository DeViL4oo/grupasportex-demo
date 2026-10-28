import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useSeo } from "../lib/seo";
import { services } from "../data/site";

export default function NotFound() {
  useSeo({
    title: "Nie znaleziono strony (404)",
    description: "Podany adres nie istnieje. Wróć na stronę główną lub przejdź do jednej z usług.",
    path: "/404",
  });

  return (
    <section className="relative flex min-h-[86svh] items-center overflow-hidden bg-ink pt-[104px]">
      <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0 opacity-50" />
      <div className="wrap relative py-20">
        <p className="num text-[0.6875rem] uppercase tracking-[0.3em] text-brand-soft">Błąd 404</p>
        <h1 className="display-xl mt-6 max-w-3xl text-white">
          TEN ADRES
          <br /> NIE ISTNIEJE
        </h1>
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-steel">
          Strona mogła zostać przeniesiona lub adres jest nieprawidłowy. Sprawdź adres lub wybierz
          jedną z poniższych ścieżek.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link to="/" className="btn btn-primary">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Strona główna
          </Link>
          <Link to="/kontakt" className="btn btn-outline">
            Kontakt
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-14 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <li key={s.id} className="bg-ink">
              <Link to={s.slug} className="group flex h-full flex-col gap-3 p-5 transition-colors hover:bg-white/[0.03]">
                <span className="num text-[0.625rem] text-brand-soft">{s.no}</span>
                <span className="text-sm text-white/90">{s.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
