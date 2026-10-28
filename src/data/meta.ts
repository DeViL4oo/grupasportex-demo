/**
 * Metadane SEO dla tras — wspólne dla komponentów (useSeo) i prerenderingu HTML.
 * Dzięki temu <title>, description i canonical są obecne także w statycznym HTML.
 */
export type PageMeta = { title: string; description: string };

export const pageMeta: Record<string, PageMeta> = {
  "/": {
    title: "Obróbka metali — cięcie laserowe, gięcie CNC, lakierowanie",
    description:
      "Grupa Sportex — cięcie laserowe blach do 30 mm, gięcie CNC na prasie 3100 mm, spawanie konstrukcji stalowych i lakierowanie proszkowe ALCOLOR. Zakład w Mostach na Pomorzu.",
  },
  "/o-firmie": {
    title: "O firmie — obróbka blach i konstrukcje stalowe",
    description:
      "Grupa Sportex: cięcie laserowe, gięcie CNC, spawanie konstrukcji stalowych i lakierowanie proszkowe ALCOLOR. Zakład produkcyjny w Mostach na Pomorzu, materiał powierzony i własny magazyn blach.",
  },
  "/ciecie-laserowe": {
    title: "Cięcie laserowe blach — stal do 25 mm, nierdzewna do 30 mm",
    description:
      "Cięcie laserowe blach czarnych, nierdzewnych i aluminiowych. BYSTRONIC BYSPRINT 3015 (4400 W) i EAGLE iNspire 2040 F6.0 (6000 W). Materiał powierzony i własny magazyn blach.",
  },
  "/giecie-blach-cnc": {
    title: "Gięcie blach CNC — prasa 3100 mm, 160 ton",
    description:
      "Gięcie blach na prasie krawędziowej AM MACHINERY 3100 o nacisku 160 ton. Blachy do 10 mm grubości i 3100 mm długości gięcia, sterowanie CNC z symulacją procesu.",
  },
  "/spawanie-konstrukcji-stalowych": {
    title: "Spawanie i konstrukcje stalowe — MIG 131, TIG 141",
    description:
      "Spawanie stali węglowej, nierdzewnej i aluminium metodami MIG (131) i TIG (141). Konstrukcje stalowe według dokumentacji klienta, wykonanie w całości w zakładzie w Mostach.",
  },
  "/lakierowanie-proszkowe": {
    title: "Lakierowanie proszkowe ALCOLOR — gabaryty do 7300 mm",
    description:
      "Lakiernia proszkowa ALCOLOR w Grupie Sportex: piaskowanie, śrutowanie, pełne przygotowanie chemiczne i malowanie proszkowe elementów do 7300 × 2000 × 2500 mm. Kolory RAL.",
  },
  "/realizacje": {
    title: "Realizacje — cięcie, gięcie, spawanie, lakierowanie",
    description:
      "Galeria prac Grupy Sportex: detale wycięte laserowo, elementy po gięciu CNC, konstrukcje stalowe oraz elementy po lakierowaniu proszkowym. Zdjęcia z zakładu produkcyjnego.",
  },
  "/kontakt": {
    title: "Kontakt — zapytania ofertowe i wyceny",
    description:
      "Kontakt z Grupą Sportex: ul. Długa 53, 84-300 Mosty. Telefon +48 59 861 25 13, biuro@lasersportex.pl. Kontakty bezpośrednie do cięcia laserowego, lakierni ALCOLOR i działu handlowego.",
  },
  "/polityka-prywatnosci": {
    title: "Polityka prywatności",
    description:
      "Przykładowa polityka prywatności serwisu demonstracyjnego Grupy Sportex — zakres danych, cel i podstawa przetwarzania, okres przechowywania, prawa osób, których dane dotyczą.",
  },
};
