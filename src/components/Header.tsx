import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, Phone, X, ChevronDown, Mail } from "lucide-react";
import { asset } from "./Img";
import { company, nav, services } from "../data/site";

function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`group flex shrink-0 items-center ${className}`}
      aria-label="Grupa Sportex — strona główna"
    >
      <img
        src={asset("logo-sportex.png")}
        alt="GRUPA SPORTEX"
        width={240}
        height={75}
        className="h-7 w-auto transition-opacity group-hover:opacity-80 lg:h-8"
      />
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { pathname } = useLocation();
  const dropdownRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setServicesOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!servicesOpen) return;
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [servicesOpen]);

  const isServiceRoute = services.some((s) => s.slug === pathname);

  const openMenu = () => {
    window.clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const closeMenu = () => {
    closeTimer.current = window.setTimeout(() => setServicesOpen(false), 160);
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only-focusable fixed left-4 top-4 z-[100] bg-brand px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white"
      >
        Przejdź do treści
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-ink/95 backdrop-blur-md"
            : "border-b border-transparent bg-gradient-to-b from-ink/85 via-ink/45 to-transparent"
        }`}
      >
        <span
          aria-hidden="true"
          className={`absolute inset-x-0 top-0 h-px origin-left bg-brand transition-transform duration-500 ${
            scrolled ? "scale-x-100" : "scale-x-0"
          }`}
        />
        <div className="wrap flex h-[76px] items-center justify-between gap-6 lg:h-[88px]">
          <Logo />

          <nav aria-label="Nawigacja główna" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) =>
                item.children ? (
                  <li key={item.label} className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      className={`flex items-center gap-1.5 px-3 py-2 text-[0.6875rem] font-medium uppercase tracking-[0.18em] transition-colors ${
                        servicesOpen || isServiceRoute ? "text-white" : "text-steel hover:text-white"
                      }`}
                      aria-expanded={servicesOpen}
                      aria-haspopup="true"
                      aria-controls="services-menu"
                      onClick={() => setServicesOpen((v) => !v)}
                      onMouseEnter={openMenu}
                      onMouseLeave={closeMenu}
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-3 w-3 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </button>
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-px left-3 right-3 h-px bg-brand transition-opacity ${
                        isServiceRoute ? "opacity-100" : "opacity-0"
                      }`}
                    />

                    <div
                      id="services-menu"
                      className={`absolute left-0 top-full w-[340px] origin-top-left border border-white/10 bg-graphite/98 p-2 shadow-2xl shadow-black/50 transition-all duration-200 ${
                        servicesOpen
                          ? "pointer-events-auto translate-y-0 opacity-100"
                          : "pointer-events-none -translate-y-1 opacity-0"
                      }`}
                      onMouseEnter={openMenu}
                      onMouseLeave={closeMenu}
                    >
                      <ul>
                        {item.children.map((child, i) => (
                          <li key={child.to}>
                            <NavLink
                              to={child.to}
                              className={({ isActive }) =>
                                `group flex items-baseline gap-3 px-3 py-3 transition-colors hover:bg-white/5 ${
                                  isActive ? "bg-white/5" : ""
                                }`
                              }
                              tabIndex={servicesOpen ? 0 : -1}
                            >
                              <span className="num text-[0.6875rem] tracking-[0.08em] text-brand-soft">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <span className="text-sm text-white/90 group-hover:text-white">
                                {child.label}
                              </span>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ) : (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      className={({ isActive }) =>
                        `relative block px-3 py-2 text-[0.6875rem] font-medium uppercase tracking-[0.18em] transition-colors ${
                          isActive ? "text-white" : "text-steel hover:text-white"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {item.label}
                          <span
                            aria-hidden="true"
                            className={`absolute -bottom-px left-3 right-3 h-px bg-brand transition-opacity ${
                              isActive ? "opacity-100" : "opacity-0"
                            }`}
                          />
                        </>
                      )}
                    </NavLink>
                  </li>
                )
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${company.phoneHref}`}
              className="hidden items-center gap-2 px-3 py-2 text-sm text-steel transition-colors hover:text-white xl:flex"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="num">{company.phone}</span>
            </a>
            <Link to="/kontakt" className="btn btn-primary hidden h-[46px] min-h-0 px-5 sm:inline-flex">
              Zapytaj o wycenę
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex h-11 w-11 items-center justify-center border border-white/15 text-white transition-colors hover:border-white/40 lg:hidden"
              aria-label="Otwórz menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobilne */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[60] flex flex-col bg-ink transition-[opacity,visibility] duration-300 lg:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu nawigacji"
        aria-hidden={!menuOpen}
      >
        <div className="wrap flex h-[76px] shrink-0 items-center justify-between border-b border-white/10">
          <Logo />
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="flex h-11 w-11 items-center justify-center border border-white/15 text-white"
            aria-label="Zamknij menu"
            autoFocus={menuOpen}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Nawigacja mobilna" className="wrap flex-1 overflow-y-auto py-6">
          <ul className="divide-y divide-white/10">
            {nav.map((item, i) => (
              <li key={item.label} className="py-1">
                {item.children ? (
                  <div className="py-3">
                    <div className="flex items-baseline gap-3">
                      <span className="num text-[0.625rem] text-brand-soft">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="display-md text-white">{item.label}</span>
                    </div>
                    <ul className="mt-3 space-y-1 pl-6">
                      {item.children.map((child, j) => (
                        <li key={child.to}>
                          <Link
                            to={child.to}
                            className="flex items-baseline gap-2 py-2 text-sm text-steel"
                          >
                            <span className="num text-[0.625rem] text-steel/60">
                              {String(j + 1).padStart(2, "0")}
                            </span>
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link to={item.to} className="flex items-baseline gap-3 py-4">
                    <span className="num text-[0.625rem] text-brand-soft">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="display-md text-white">{item.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
            <Link
              to="/kontakt"
              className="btn btn-primary w-full"
              onClick={() => setMenuOpen(false)}
            >
              Zapytaj o wycenę
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <div className="grid gap-3 pt-2 text-sm text-steel">
              <a href={`tel:${company.phoneHref}`} className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-brand" aria-hidden="true" />
                <span className="num">{company.phone}</span>
              </a>
              <a href={`mailto:${company.email}`} className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-brand" aria-hidden="true" />
                {company.email}
              </a>
              <p>
                {company.street}, {company.postal} {company.city}
              </p>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
