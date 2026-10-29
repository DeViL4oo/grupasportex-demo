import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Check, Paperclip, Send } from "lucide-react";
import { services, company } from "../data/site";

type Values = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  consent: boolean;
  website: string; // honeypot
};

const initial: Values = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  consent: false,
  website: "",
};

type Errors = Partial<Record<keyof Values, string>>;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 3) e.name = "Podaj imię i nazwisko (min. 3 znaki).";
  if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.email.trim()))
    e.email = "Podaj poprawny adres e-mail, np. jan.kowalski@firma.pl.";
  if (v.phone.trim() && !/^[+0-9 ()-]{9,20}$/.test(v.phone.trim()))
    e.phone = "Numer telefonu może zawierać cyfry, spacje, myślniki i nawiasy.";
  if (!v.service) e.service = "Wybierz rodzaj usługi.";
  if (v.message.trim().length < 20)
    e.message = "Opisz zamówienie w co najmniej 20 znakach (materiał, grubość, ilość).";
  if (v.message.length > 1200) e.message = "Wiadomość może mieć maksymalnie 1200 znaków.";
  if (!v.consent) e.consent = "Zgoda na przetwarzanie danych jest wymagana.";
  return e;
}

const fieldCls = "field";
const errorCls = "mt-2 flex items-start gap-2 text-xs text-brand";

export function ContactForm() {
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef(Date.now());
  const hasErrors = Object.keys(errors).length > 0;

  useEffect(() => {
    if (hasErrors) summaryRef.current?.focus();
  }, [hasErrors]);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (touched[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        const fieldErrors = validate({ ...values, [key]: value });
        if (fieldErrors[key]) next[key] = fieldErrors[key];
        else delete next[key];
        return next;
      });
    }
  };

  const blur = (key: keyof Values) => {
    setTouched((t) => ({ ...t, [key]: true }));
    const fieldErrors = validate(values);
    setErrors((prev) => {
      const next = { ...prev };
      if (fieldErrors[key]) next[key] = fieldErrors[key];
      else delete next[key];
      return next;
    });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    // pułapka antyspamowa: wypełnione ukryte pole (honeypot)
    if (values.website) {
      setSent(true);
      return;
    }
    setErrors(found);
    setTouched({
      name: true,
      email: true,
      phone: true,
      service: true,
      message: true,
      consent: true,
    });
    if (Object.keys(found).length > 0) return;

    const body = [
      `Imię i nazwisko: ${values.name}`,
      `Firma: ${values.company || "—"}`,
      `E-mail: ${values.email}`,
      `Telefon: ${values.phone || "—"}`,
      `Rodzaj usługi: ${values.service}`,
      "",
      "Wiadomość:",
      values.message,
      "",
      "—",
      "Wiadomość wysłana z formularza kontaktowego na stronie grupasportex.pl.",
    ].join("\n");

    const url = `mailto:${company.email}?subject=${encodeURIComponent(
      `Zapytanie ofertowe — ${values.service}`
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = url;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="border border-white/12 bg-white/[0.03] p-7 lg:p-9" role="status">
        <span className="flex h-11 w-11 items-center justify-center bg-brand text-white">
          <Check className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 className="display-md mt-6 text-white">Wiadomość przygotowana</h3>
        <p className="mt-4 text-sm leading-relaxed text-steel">
          Otworzyliśmy Twój program pocztowy z gotową treścią zapytania. Wyślij wiadomość, aby
          trafiła do naszego biura.
        </p>
        <p className="mt-4 text-sm text-steel">
          Dokumentację techniczną (DXF, DWG, STEP, PDF) dołącz bezpośrednio w wiadomości e-mail.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <a href={`mailto:${company.email}`} className="btn btn-primary">
            <Send className="h-4 w-4" aria-hidden="true" />
            Otwórz ponownie
          </a>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => {
              setValues(initial);
              setErrors({});
              setTouched({});
              setSent(false);
              startedAt.current = Date.now();
            }}
          >
            Wypełnij nowe zapytanie
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="border border-white/12 bg-white/[0.02] p-6 sm:p-8 lg:p-9"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="display-md text-white">Formularz zapytania</h3>
        <span className="text-[0.625rem] uppercase tracking-[0.16em] text-steel-dark">
          * wymagane
        </span>
      </div>

      {hasErrors && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="mt-6 border border-brand/60 bg-brand/10 p-4 text-sm text-white"
        >
          Popraw zaznaczone pola — formularz nie został jeszcze gotowy do wysłania.
        </div>
      )}

      <fieldset className="mt-7 grid gap-5 sm:grid-cols-2">
        <legend className="sr-only">Dane kontaktowe i zapytanie</legend>

        <div>
          <label className="field-label" htmlFor="cf-name">
            Imię i nazwisko *
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            autoComplete="name"
            className={fieldCls}
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            onBlur={() => blur("name")}
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? "cf-name-error" : undefined}
            required
          />
          {errors.name && (
            <p id="cf-name-error" className={errorCls}>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className="field-label" htmlFor="cf-company">
            Nazwa firmy
          </label>
          <input
            id="cf-company"
            name="company"
            type="text"
            autoComplete="organization"
            className={fieldCls}
            value={values.company}
            onChange={(e) => set("company", e.target.value)}
          />
        </div>

        <div>
          <label className="field-label" htmlFor="cf-email">
            E-mail *
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            className={fieldCls}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            onBlur={() => blur("email")}
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? "cf-email-error" : undefined}
            required
          />
          {errors.email && (
            <p id="cf-email-error" className={errorCls}>
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className="field-label" htmlFor="cf-phone">
            Telefon
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={fieldCls}
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            onBlur={() => blur("phone")}
            aria-invalid={errors.phone ? "true" : undefined}
            aria-describedby={errors.phone ? "cf-phone-error" : undefined}
          />
          {errors.phone && (
            <p id="cf-phone-error" className={errorCls}>
              {errors.phone}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="cf-service">
            Rodzaj usługi *
          </label>
          <select
            id="cf-service"
            name="service"
            className={fieldCls}
            value={values.service}
            onChange={(e) => set("service", e.target.value)}
            onBlur={() => blur("service")}
            aria-invalid={errors.service ? "true" : undefined}
            aria-describedby={errors.service ? "cf-service-error" : undefined}
            required
          >
            <option value="">Wybierz usługę…</option>
            {services.map((s) => (
              <option key={s.id} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Kilka usług / zapytanie kompleksowe">Kilka usług / zapytanie kompleksowe</option>
          </select>
          {errors.service && (
            <p id="cf-service-error" className={errorCls}>
              {errors.service}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="cf-message">
            Wiadomość *
          </label>
          <textarea
            id="cf-message"
            name="message"
            rows={5}
            className={fieldCls}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            onBlur={() => blur("message")}
            aria-invalid={errors.message ? "true" : undefined}
            aria-describedby={`cf-message-hint${errors.message ? " cf-message-error" : ""}`}
            placeholder="Materiał, grubość, ilość, termin, dodatkowe wymagania…"
            required
          />
          <p id="cf-message-hint" className="mt-2 flex items-start gap-2 text-xs text-steel-dark">
            <Paperclip className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            Dokumentację (DXF, DWG, STEP, PDF) dołącz jako załącznik do wiadomości e-mail.
          </p>
          {errors.message && (
            <p id="cf-message-error" className={errorCls}>
              {errors.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="cf-consent" className="flex cursor-pointer items-start gap-3">
            <input
              id="cf-consent"
              name="consent"
              type="checkbox"
              className="mt-1 h-4 w-4 shrink-0 border-white/30 bg-transparent"
              checked={values.consent}
              onChange={(e) => set("consent", e.target.checked)}
              onBlur={() => blur("consent")}
              aria-invalid={errors.consent ? "true" : undefined}
              aria-describedby={errors.consent ? "cf-consent-error" : undefined}
              required
            />
            <span className="text-xs leading-relaxed text-steel">
              Wyrażam zgodę na przetwarzanie moich danych osobowych w celu obsługi zapytania
              ofertowego, zgodnie z{" "}
              <Link to="/polityka-prywatnosci" className="text-white underline underline-offset-2">
                polityką prywatności
              </Link>
              . *
            </span>
          </label>
          {errors.consent && (
            <p id="cf-consent-error" className={errorCls}>
              {errors.consent}
            </p>
          )}
        </div>

        {/* honeypot */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="cf-website">Strona internetowa</label>
          <input
            id="cf-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(e) => set("website", e.target.value)}
          />
        </div>
      </fieldset>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn btn-primary w-full sm:w-auto">
          Wyślij zapytanie
          <Send className="h-4 w-4" aria-hidden="true" />
        </button>
        <p className="text-xs leading-relaxed text-steel-dark sm:max-w-[15rem] sm:text-right">
          Wolisz e-mail?{" "}
          <a href={`mailto:${company.email}`} className="text-white underline underline-offset-2">
            {company.email}
          </a>
        </p>
      </div>
    </form>
  );
}
