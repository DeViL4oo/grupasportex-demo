# Audyt obecnej witryny i zakres przebudowy

Dokument roboczy do prezentacji właścicielom firmy. Zawiera ustalenia z analizy
`grupasportex.pl` (stan na dzień przygotowania projektu) oraz listę zmian
wdrożonych w wersji demonstracyjnej.

---

## 1. Co ustalono o firmie (źródło: grupasportex.pl + rejestr KRS)

- Profil: obróbka plastyczna blach (gięcie CNC) i cięcie laserowe; uzupełnienie
  oferty stanowi spawanie konstrukcji stalowych oraz lakiernia proszkowa ALCOLOR
  wchodząca w skład Grupy Sportex.
- Park maszynowy: dwie wycinarki (BYSTRONIC BYSPRINT 3015 — 4400 W, stół
  3000 × 1500 mm; EAGLE iNspire 2040 F6.0 — 6000 W, stół 4000 × 2000 mm) oraz
  prasa krawędziowa AM MACHINERY 3100 o nacisku 160 ton.
- Zakres cięcia: stal czarna do 25 mm, nierdzewna do 30 mm, aluminium do 25 mm
  (maksymalne wartości wynikające z drugiej maszyny).
- Magazyn własny: format 3000 × 1500 mm — stal czarna 0,5–20 mm, nierdzewna 304
  0,5–15 mm, aluminium 1–10 mm.
- Lakiernia: gabaryty do 7300 × 2000 × 2500 mm, utwardzanie ok. 200 °C / 20 min,
  powłoka 60–120 µm, pełne przygotowanie chemiczne i mechaniczne.
- Kontakt: 4 osoby/działy z numerami bezpośrednimi (dane w `src/data/site.ts`).
- Adres: ul. Długa 53, 84-300 Mosty (woj. pomorskie) — dane rejestrowe.

## 2. Słabości obecnej witryny (ustalenia, nie opinie)

Pomiar Lighthouse dla `https://grupasportex.pl/` (mobile, symulacja 4G):

| Obszar | Wynik | Co konkretnie nie działa |
| --- | --- | --- |
| Performance | 96 | obrazy w formacie JPEG bez `srcset`, brak cache nagłówków, `unsized-images`, CLS 0,123 |
| Accessibility | 88 | linki bez dostępnej nazwy (`link-name`), zbyt małe cele dotykowe (`target-size`) |
| Best Practices | 71 | zasoby ładowane po HTTP (`is-on-https`), błędy w konsoli, obrazy niedopasowane do rozmiaru |
| SEO | 92 | brak `meta description` (audyt `meta-description`), brak Open Graph |

Wnioski jakościowe z przeglądu stron:

1. **Brak hierarchii informacji** — oferta, cennik, „dlaczego my”, galeria i
   lakiernia to osobne, płaskie pozycje menu; użytkownik B2B nie widzi w 5 sekund
   zakresu możliwości produkcyjnych.
2. **Parametry techniczne ukryte w akapitach** — grubości cięcia, długość gięcia
   i gabaryty lakierni są wciągnięte w prozę zamiast być danymi do porównania.
3. **Zdjęcia bez kontekstu** — galerie bez podpisów i kategorii, miniatury
   150 × 120 px powiększane do dużych rozmiarów.
4. **Brak wyraźnej ścieżki zapytania** — kontakt jest na końcu menu, formularz nie
   zbiera informacji potrzebnych do wyceny (materiał, grubość, ilość, pliki).
5. **Powtarzalne, ciasne sekcje** — małe odstępy i jednolita typografia utrudniają
   skanowanie; brak kontrastu między sekcjami.
6. **Warstwa prawna i wizerunkowa** — komunikat cookie bez kategorii zgód,
   nieaktualny certyfikat ISO 9001 (ważny do 03.02.2021) wyeksponowany jako
   aktualny atut.

## 3. Co powstało w tej wersji

**Architektura informacji**

- `/` — hero, cztery usługi, o firmie, park maszynowy, proces, realizacje, zalety,
  CTA, kontakt.
- `/o-firmie`, `/ciecie-laserowe`, `/giecie-blach-cnc`,
  `/spawanie-konstrukcji-stalowych`, `/lakierowanie-proszkowe`, `/realizacje`,
  `/kontakt`, `/polityka-prywatnosci`.
- Każda podstrona usługowa ma inny układ (parametry, tabele, ciągi technologiczne,
  schemat gabarytów) — nie jest kopią jednego szablonu.

**System projektowy**

- Paleta: grafit `#111317`, `#242930`, stal `#A7ADB5`, jasny `#F4F5F6` i czerwień
  z logo `#E80000` (zmierzona z pliku `_logo.png` — mediana kanałów RGB).
- Typografia: Space Grotesk (nagłówki, ciasny tracking, uppercase w sekcjach) +
  Inter (tekst); skala przez `clamp()`, bez cienkich wag.
- Siatka 12-kolumnowa, włoskowate linie zamiast cieni i zaokrągleń, numeracja
  sekcji, techniczne podpisy zdjęć.

**Techniczne podstawy**

- Prerendering 9 tras, hydratacja, sitemap, canonical, Open Graph, JSON-LD
  (`Organization`, `LocalBusiness`, `Service`).
- Obrazy: WebP 480–1200 px, `srcset`/`sizes`, wymiary zapobiegające CLS, lazy
  loading poza pierwszym ekranem.
- Fonty: podzbiór PL (~42 KB łącznie) z preloadem — LCP 2,9 s na symulowanym 4G.
- Formularz z walidacją, komunikatami błędów i honeypotem; brak backendu →
  `mailto:` z gotową treścią (świadomie, bez symulacji wysyłki).

## 4. Weryfikacja wykonana przed przekazaniem

| Sprawdzenie | Wynik |
| --- | --- |
| Build produkcyjny (`npm run build`) | OK — 9 tras prerenderowanych, sitemap |
| Typecheck (`tsc --noEmit`) | 0 błędów |
| 10 tras × 2 viewporty (1440 / 390) | brak poziomego przewijania, jeden `h1`, brak błędów 404 zasobów |
| Hydratacja (produkcyjny build) | brak błędów w konsoli na wszystkich trasach |
| Nawigacja SPA | klik w menu nie przeładowuje strony, `title` się zmienia |
| Menu mobilne | otwiera się, Escape zamyka, blokuje scroll, linki działają |
| Dropdown usług | klawiatura (Enter/Escape), klik poza zamyka |
| Galeria + lightbox | 20 zdjęć, filtry, strzałki, Escape, przywrócenie fokusu |
| Formularz | 5 błędów walidacji dla pustego, poprawna wysyłka → `mailto:` |
| Build w podkatalogu (`BASE_PATH=/repo/`) | zasoby i prerender z `<base href>` — OK |
| Lighthouse (mobile) | 95 / 100 / 100 / 69 (noindex) |

## 5. Kolejne kroki po akceptacji

1. Potwierdzenie danych z sekcji `docs/DO-POTWIERDZENIA.md`.
2. Decyzja o backendzie formularza (Formspree / funkcja serverless / SMTP).
3. Weryfikacja prawna polityki prywatności i zgód.
4. Migracja: build z `BASE_PATH=/` + `SITE_URL=https://grupasportex.pl`,
   usunięcie `noindex`, przekierowania 301 ze starych adresów
   (`/home,11,ciecie_laserowe.html` → `/ciecie-laserowe` itd.).
