# Grupa Sportex — projekt koncepcyjny nowej strony

Kompletna, działająca witryna demonstracyjna dla Grupy Sportex: strona główna,
cztery podstrony usługowe, realizacje, kontakt i polityka prywatności.

Projekt jest **niezależną propozycją modernizacji** — nie jest oficjalną witryną
firmy i nie został przez nią zatwierdzony. Wersja demonstracyjna ma wyłączone
indeksowanie (`noindex`), aby nie konkurowała z grupaspotex.pl.

---

## Stack

| Warstwa | Technologia |
| --- | --- |
| UI | React 19 + TypeScript |
| Build | Vite 8 (Rolldown) |
| Style | Tailwind CSS 4 (tokeny w `src/index.css`) |
| Routing | React Router 7 (BrowserRouter) |
| Ikony | lucide-react |
| Fonty | Space Grotesk + Inter (self-hosted, podzbiór PL, ~42 KB) |
| Obrazy | WebP w kilku szerokościach, `srcset` + `sizes`, lazy loading |

Dodatkowo: **prerendering HTML** (`scripts/prerender.mjs`) — każda trasa ma własny
plik `dist/<trasa>/index.html` z treścią, `title`, `description` i `canonical`,
a React hydratuje gotowy markup. Dzięki temu LCP nie czeka na JavaScript,
a głębokie linki działają na hostingu statycznym bez konfiguracji.

## Uruchomienie

```bash
npm install
npm run dev        # http://127.0.0.1:5178
npm run build      # build + prerender + sitemap → dist/
npm run preview    # podgląd builda na http://127.0.0.1:4178
npm run typecheck  # tsc --noEmit
```

## Struktura

```
index.html                 # meta bazowe, fonty, noindex, preload
public/
  logo-sportex.png         # oryginalne logo (bez zmian, przezroczyste tło)
  fonts/                   # podzbiory fontów (generowane raz, commitowane)
  images/                  # zdjęcia WebP + mapa poglądowa
  robots.txt, 404.html     # 404.html = fallback SPA dla GitHub Pages
src/
  data/site.ts             # treści: usługi, maszyny, kontakt, proces, galeria
  data/meta.ts             # title/description per trasa (SEO + prerender)
  data/images.json         # manifest obrazów (wymiary, srcset)
  lib/seo.ts               # useSeo: meta, OG, canonical, JSON-LD
  components/              # Header, Footer, Gallery, ContactForm, ui.tsx…
  pages/                   # Home, About, Laser, Bending, Welding, Coating,
                           # Projects, Contact, Privacy, NotFound
  entry-server.tsx         # render do prerenderingu
scripts/
  prerender.mjs            # generuje statyczny HTML tras
  generate-sitemap.mjs     # sitemap.xml w dist/
  optimize-images.py       # źródła → WebP (480/640/800/900/1200 px)
  build-map.py             # statyczna, ciemna mapa dojazdu (OSM)
```

## Wdrożenie na GitHub Pages

Workflow `.github/workflows/deploy.yml` buduje stronę z `BASE_PATH` ustawionym na
nazwę repozytorium i publikuje artefakt przez GitHub Pages.

Ręcznie:

```bash
BASE_PATH=/nazwa-repo/ SITE_URL=https://login.github.io npm run build
```

`BASE_PATH` trafia do `base` w Vite oraz do `<base href>` w prerenderowanych
plikach, więc zasoby i linki działają w podkatalogu. Po migracji na docelową
domenę wystarczy build z `BASE_PATH=/` i `SITE_URL=https://grupasportex.pl`.

Przejście na własny hosting: cały katalog `dist/` jest statyczny — działa na
Nginx/Apache/Netlify/Vercel bez Node.js. Wyjątkiem jest formularz (patrz niżej).

## Formularz kontaktowy

Formularz jest **w pełni zwalidowany i dostępny**, ale nie wysyła danych na
serwer — po poprawnej walidacji otwiera gotową wiadomość w programie pocztowym
(`mailto:`). To świadoma decyzja: wersja demonstracyjna nie ma backendu, a
symulowanie „wysłano” byłoby nieprawdą.

Aby podłączyć realną wysyłkę, wystarczy podmienić funkcję `onSubmit` w
`src/components/ContactForm.tsx` na `fetch` do endpointu (Formspree, własna
funkcja serverless, SMTP przez API). Pola, walidacja, komunikaty błędów i obsługa
stanu pozostają bez zmian. Załączniki (DXF/DWG/STEP) należy obsłużyć po stronie
backendu — formularz celowo ich nie przyjmuje.

## Treści i wiarygodność

- Wszystkie parametry techniczne pochodzą z oficjalnej strony `grupasportex.pl`
  (zakładki: cięcie laserowe, gięcie, spawanie, lakierowanie, kontakt).
- Adres siedziby: `ul. Długa 53, 84-300 Mosty` (rejestr KRS 0000970293; na stronie
  firmy adres nie był publikowany).
- Brak fikcyjnych opinii, certyfikatów, statystyk i realizacji. Zdjęcia pochodzą
  z materiałów Grupy Sportex i są opisane jako zdjęcia zakładu, nie jako katalog
  konkretnych zleceń.
- Certyfikat ISO 9001 (TÜV NORD) widoczny na starej stronie wygasł w 2021 r. —
  dlatego nie został użyty. Szczegóły w `docs/DO-POTWIERDZENIA.md`.

## Wyniki pomiarów (Lighthouse, mobile, build produkcyjny)

| Strona | Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- |
| Nowa — strona główna | 95 | 100 | 100 | 69\* |
| Nowa — lakierowanie proszkowe | 95 | 100 | 100 | 69\* |
| Obecna grupasportex.pl | 96 | 88 | 71 | 92 |

\* SEO 69 wynika wyłącznie z `noindex` w wersji demonstracyjnej. Po usunięciu
`noindex` i wpisu w `robots.txt` (przy migracji na domenę docelową) wynik wraca
do normy — pozostałe audyty SEO są spełnione.

Pomiar: `npx lighthouse@12 <url> --form-factor=mobile --throttling-method=simulate`.

## Dostępność

- Semantyczny HTML, jeden `h1` na stronę, logiczna hierarchia nagłówków.
- Pełna obsługa klawiatury: menu (Escape, focus), galeria (strzałki, Escape,
  pułapka fokusu), formularz (komunikaty `aria-invalid` / `aria-describedby`,
  podsumowanie błędów z fokusem).
- Kontrasty tekstu w normie WCAG AA (osobne warianty czerwieni dla małego tekstu
  na ciemnym i jasnym tle).
- `prefers-reduced-motion`: wyłączone animacje wejścia i przewijanie płynne.

## Przeglądarki

Chrome/Edge/Firefox/Safari w wersjach z 2024+. Wymagane: CSS `aspect-ratio`,
`clamp()`, `svh`, `:focus-visible`. Bez wsparcia dla IE11 (świadomie).
