# Status projektu — podsumowanie sesji

Data: 28–29.10.2026 · Projekt: `D:\Projekty\Grupa Sportex` · gałąź: `main` (commit `f24bb47` + poprawki)

---

## 1. Zrobione i zweryfikowane

### Strona (działający projekt, nie makieta)

- 9 tras: `/`, `/o-firmie`, `/ciecie-laserowe`, `/giecie-blach-cnc`,
  `/spawanie-konstrukcji-stalowych`, `/lakierowanie-proszkowe`, `/realizacje`,
  `/kontakt`, `/polityka-prywatnosci` + strona 404.
- Strona główna: hero (zdjęcie + techniczne parametry), 4 usługi w asymetrycznej
  siatce, o firmie, park maszynowy (3 technologie, 12 parametrów), proces 4 kroków,
  galeria, zalety, CTA, kontakt.
- Podstrony usług różnią się układem: tabele maszyn (laser), pasek parametrów +
  wymagania plikowe (gięcie), metody 131/141 + wykończenia (spawanie), schemat
  gabarytów SVG + ciągi technologiczne + rodzaje farb (lakierowanie).
- Realizacje: 20 zdjęć, 6 kategorii, filtry z licznikami, lightbox (strzałki,
  Escape, pułapka fokusu, przywrócenie fokusu).

### Design i identyfikacja

- Czerwień zmierzona z oryginalnego logo: **#E80000**; paleta grafit/antracyt/
  stal/jasny zgodnie z briefem. Osobne warianty dla małego tekstu
  (`#ff3b30` na ciemnym, `#b00000` na jasnym) — wymóg kontrastu AA.
- Logo użyte bez zmian (oryginalny PNG, przezroczyste tło), favicon z gwiazdy logo.
- Typografia: Space Grotesk + Inter, podzbiór PL (~42 KB), self-hosted.
- Brak zaokrągleń i cieni; włoskowate linie, numeracja sekcji, techniczne podpisy.

### Techniczne

- React 19 + TypeScript + Vite 8 + Tailwind 4 + React Router 7 + lucide-react.
- **Prerendering HTML** wszystkich tras (`scripts/prerender.mjs`) → treść, `title`,
  `description`, `canonical` w HTML; hydratacja; `<base href>` pod podkatalog.
- SEO: meta per trasa, Open Graph, canonical, sitemap.xml, robots.txt (`Disallow: /`),
  JSON-LD (`Organization`, `LocalBusiness`, `Service`), `noindex` w demo.
- Obrazy: 92 pliki źródłowe → WebP 480–1200 px, `srcset`/`sizes`, wymiary, lazy loading.
- Mapa dojazdu: statyczny, ciemny render OSM (`scripts/build-map.py`), bez iframe'a.
- Formularz: walidacja, komunikaty `aria-invalid`/`aria-describedby`, podsumowanie
  błędów z fokusem, honeypot; wysyłka przez `mailto:` (brak backendu — świadomie).
- GitHub Pages: `BASE_PATH`, `<base href>`, `public/404.html`, workflow
  `.github/workflows/deploy.yml`.

### Pomiary i testy

| Sprawdzenie | Wynik |
| --- | --- |
| `npm run typecheck` | 0 błędów |
| `npm run build` | OK — 9 tras prerenderowanych + sitemap, `dist` 3,0 MB |
| Lighthouse mobile — strona główna | **95 / 100 / 100 / 69\*** |
| Lighthouse mobile — lakierowanie | **95 / 100 / 100 / 69\*** |
| Obecna grupasportex.pl (dla porównania) | 96 / 88 / 71 / 92 |
| 10 tras × 1440 i 390 px | brak poziomego przewijania, 1 `h1`, 0 błędów 404, 0 błędów konsoli |
| Hydratacja (build produkcyjny) | czysta na wszystkich trasach |
| Menu mobilne, dropdown, galeria, formularz | przetestowane w przeglądarce (SPA bez przeładowań) |
| Build w podkatalogu `/grupasportex-demo/` | zasoby, fonty i prerender działają |

\* SEO 69 wynika wyłącznie z `noindex` w wersji demonstracyjnej.

### Dokumentacja

- `README.md` — stack, uruchomienie, struktura, wdrożenie, formularz, wyniki.
- `docs/AUDYT.md` — analiza obecnej strony (z pomiarami), zakres przebudowy, weryfikacja.
- `docs/DO-POTWIERDZENIA.md` — dane i decyzje wymagające akceptacji firmy.
- `scripts/` — prerender, sitemap, optymalizacja obrazów, mapa, pomiar Lighthouse.

---

## 2. Do zrobienia (kolejność ma znaczenie)

### A. Decyzje po stronie Grupy Sportex

1. **Adres zakładu** — potwierdzić `ul. Długa 53, 84-300 Mosty` i punkt wjazdu
   (na stronie firmy adresu nie ma; użyto danych KRS).
2. **Certyfikat ISO 9001** — obecny wygasł 03.02.2021. Jeśli jest nowy: dodać
   sekcję z numerem i jednostką certyfikującą.
3. **Aktualność parku maszynowego** — potwierdzić parametry i nazwy maszyn
   (rejestr KRS wspomina o planowanym zakupie wycinarki i cobota).
4. **Telefony/e-maile** — sprawdzić przypisanie do działów i aktualność numerów.
5. **Godziny otwarcia** — brak danych; dodać po ustaleniu (lokalne SEO + JSON-LD).
6. **Zdjęcia** — potwierdzić prawa do wykorzystania i dostarczyć wyższe
   rozdzielczości (obecne 640–1200 px); brak dobrego ujęcia prasy i lakierni.

### B. Prace techniczne

7. **Backend formularza** — Formspree / funkcja serverless / SMTP; podmiana
   `onSubmit` w `src/components/ContactForm.tsx`, obsługa załączników DXF/DWG/STEP.
8. **Polityka prywatności** — weryfikacja prawna, dane administratora, cookies
   (jeśli dojdzie analityka).
9. **Analityka** — decyzja GA4/Plausible + banner zgód.
10. **Migracja** — build z `BASE_PATH=/` i `SITE_URL=https://grupasportex.pl`,
    usunięcie `noindex` i wpisu `Disallow` w `robots.txt`, przekierowania 301
    ze starych adresów (`/home,11,ciecie_laserowe.html` itd.).
11. **Domena/hosting** — GitHub Pages tylko jako demo; docelowo hosting + poczta.

### C. Opcjonalne rozwinięcia (po akceptacji projektu)

12. Podstrona „Park maszynowy” lub „Technologie” z rozbudowanym katalogiem.
13. Rozbudowa realizacji o case studies (potrzebne prawdziwe opisy zleceń).
14. Wersja EN, jeśli klienci zagraniczni.
15. Wideo w hero (obecnie zdjęcie) — jeśli firma dostarczy materiał.

---

## 3. Stan środowiska

- Repozytorium git zainicjowane, commit początkowy: `f24bb47`.
- `npm run dev` → http://127.0.0.1:5178 · `npm run preview` → http://127.0.0.1:4178.
- `_raw/` (zdjęcia źródłowe, kafle mapy) jest w `.gitignore` — do ponownego
  wygenerowania obrazów służą `scripts/optimize-images.py` i `scripts/build-map.py`.
- Uwaga: w logu dev-serwera mogą pozostać stare komunikaty o błędach transformacji
  z czasu edycji — kod jest czysty (wszystkie moduły zwracają 200, typecheck i build
  przechodzą).
