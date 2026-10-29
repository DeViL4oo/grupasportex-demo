import { PageIntro } from "../components/ui";
import { useSeo } from "../lib/seo";
import { pageMeta } from "../data/meta";
import { company } from "../data/site";

const sections = [
  {
    title: "1. Informacje ogólne",
    body: [
      "Administratorem danych przetwarzanych za pośrednictwem serwisu jest Grupa Sportex Sp. z o.o., ul. Długa 53, 84-300 Mosty.",
    ],
  },
  {
    title: "2. Zakres przetwarzanych danych",
    body: [
      "Formularz kontaktowy umożliwia przekazanie imienia i nazwiska, nazwy firmy, adresu e-mail, numeru telefonu, rodzaju usługi oraz treści wiadomości.",
      "Podanie danych jest dobrowolne, jednak bez danych kontaktowych nie możemy odpowiedzieć na zapytanie ofertowe.",
    ],
  },
  {
    title: "3. Cel i podstawa prawna",
    body: [
      "Dane przetwarzamy w celu obsługi zapytania ofertowego, przygotowania wyceny i prowadzenia korespondencji — na podstawie art. 6 ust. 1 lit. b RODO (czynności niezbędne do zawarcia lub wykonania umowy) oraz art. 6 ust. 1 lit. f RODO (uzasadniony interes administratora polegający na obsłudze zapytań).",
      "W przypadku wyrażenia zgody na kontakt marketingowy podstawą jest art. 6 ust. 1 lit. a RODO — zgodę można wycofać w każdej chwili.",
    ],
  },
  {
    title: "4. Okres przechowywania",
    body: [
      "Dane przechowujemy przez czas niezbędny do obsługi zapytania, a w przypadku zawarcia umowy — przez okres wymagany przepisami prawa, w tym przepisami podatkowymi i rachunkowymi.",
      "Po upływie tego okresu dane są usuwane lub anonimizowane.",
    ],
  },
  {
    title: "5. Odbiorcy danych",
    body: [
      "Dane mogą być powierzane podmiotom świadczącym usługi hostingowe, pocztowe, IT oraz księgowe — wyłącznie w zakresie niezbędnym do realizacji usług i na podstawie umów powierzenia.",
      "Dane nie są przekazywane poza Europejski Obszar Gospodarczy, chyba że wynika to z wykorzystania usług dostawcy, który zapewnia odpowiednie zabezpieczenia zgodne z RODO.",
    ],
  },
  {
    title: "6. Prawa osób, których dane dotyczą",
    body: [
      "Masz prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia oraz wniesienia sprzeciwu wobec przetwarzania. Możesz też wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych.",
      "Wnioski dotyczące danych kieruj na adres: biuro@lasersportex.pl.",
    ],
  },
  {
    title: "7. Pliki cookies",
    body: [
      "Serwis nie wykorzystuje plików cookies do celów analitycznych ani marketingowych. Osadzona mapa OpenStreetMap może zapisywać techniczne pliki cookies po jej załadowaniu — zgodnie z polityką dostawcy.",
      "Jeżeli w przyszłości zostaną wdrożone narzędzia analityczne, niniejsza sekcja wymaga aktualizacji oraz zgody użytkownika.",
    ],
  },
  {
    title: "8. Bezpieczeństwo",
    body: [
      "Stosujemy środki techniczne i organizacyjne chroniące dane przed nieuprawnionym dostępem, utratą lub zmianą, adekwatnie do charakteru przetwarzanych informacji.",
    ],
  },
];

export default function Privacy() {
  useSeo({
    ...pageMeta["/polityka-prywatnosci"],
    path: "/polityka-prywatnosci",
  });

  return (
    <>
      <PageIntro
        label="Informacje prawne"
        title="POLITYKA PRYWATNOŚCI"
        lead="Zasady przetwarzania danych osobowych przekazywanych za pośrednictwem serwisu."
      />

      <section className="bg-ink pb-20 lg:pb-28">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="border border-white/12 p-6">
              <p className="text-[0.625rem] uppercase tracking-[0.16em] text-steel-dark">
                Administrator
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white">
                {company.legalName}
                <br />
                {company.street}
                <br />
                {company.postal} {company.city}
              </p>
              <p className="mt-4 text-sm text-steel">
                <a href={`mailto:${company.email}`} className="hover:text-white">
                  {company.email}
                </a>
                <br />
                <a href={`tel:${company.phoneHref}`} className="num hover:text-white">
                  {company.phone}
                </a>
              </p>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <div className="space-y-10">
              {sections.map((s) => (
                <div key={s.title} className="border-t border-white/10 pt-6">
                  <h2 className="text-lg font-semibold text-white">{s.title}</h2>
                  <div className="mt-4 space-y-3 text-sm leading-relaxed text-steel">
                    {s.body.map((p) => (
                      <p key={p.slice(0, 40)}>{p}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
