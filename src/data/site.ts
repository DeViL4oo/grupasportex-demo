/**
 * Treści serwisu — wyłącznie informacje zweryfikowane na oficjalnej stronie
 * grupasportex.pl (dane techniczne, kontakt) oraz w rejestrze KRS (adres siedziby).
 * Wszystko, czego nie potwierdzono, celowo pominięto.
 */

export const company = {
  name: "Grupa Sportex",
  legalName: "Grupa Sportex Sp. z o.o.",
  tagline: "Obróbka metali — cięcie laserowe, gięcie CNC, spawanie, lakierowanie proszkowe",
  description:
    "Grupa Sportex zajmuje się obróbką plastyczną blach, cięciem laserowym, spawaniem konstrukcji stalowych oraz lakierowaniem proszkowym. Usługi realizowane są w zakładzie w Mostach na Pomorzu.",
  phone: "+48 59 861 25 13",
  phoneHref: "+48598612513",
  email: "biuro@lasersportex.pl",
  street: "ul. Długa 53",
  postal: "84-300",
  city: "Mosty",
  region: "pomorskie",
  country: "PL",
  lat: 54.553787,
  lng: 17.801989,
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=54.553787,17.801989",
  osmEmbed:
    "https://www.openstreetmap.org/export/embed.html?bbox=17.7890%2C54.5475%2C17.8148%2C54.5600&layer=mapnik&marker=54.553787%2C17.801989",
  demoNote:
    "Projekt koncepcyjny — niezależna propozycja nowej strony internetowej. Nie jest oficjalną witryną Grupy Sportex.",
} as const;

export type NavItem = { label: string; to: string; children?: NavItem[] };

export const nav: NavItem[] = [
  { label: "Start", to: "/" },
  { label: "O firmie", to: "/o-firmie" },
  {
    label: "Usługi",
    to: "/uslugi",
    children: [
      { label: "Cięcie laserowe", to: "/ciecie-laserowe" },
      { label: "Gięcie blach CNC", to: "/giecie-blach-cnc" },
      { label: "Spawanie i konstrukcje stalowe", to: "/spawanie-konstrukcji-stalowych" },
      { label: "Lakierowanie proszkowe", to: "/lakierowanie-proszkowe" },
    ],
  },
  { label: "Realizacje", to: "/realizacje" },
  { label: "Kontakt", to: "/kontakt" },
];

export type Dept = {
  name: string;
  person?: string;
  phone: string;
  phoneHref: string;
  email?: string;
  note?: string;
};

export const departments: Dept[] = [
  {
    name: "Cięcie laserowe",
    person: "Łukasz Mechliński",
    phone: "667 688 794",
    phoneHref: "+48667688794",
    email: "biuro@lasersportex.pl",
    note: "Zapytania techniczne i wyceny cięcia",
  },
  {
    name: "Lakiernia proszkowa ALCOLOR",
    person: "Danuta Bork-Majewska",
    phone: "667 872 202",
    phoneHref: "+48667872202",
    email: "biuro@alcolor.pl",
    note: "Powłoki proszkowe, kolory RAL, przygotowanie powierzchni",
  },
  {
    name: "Dział handlowy LASER",
    phone: "796 105 687",
    phoneHref: "+48796105687",
    email: "krzysztof@alcolor.pl",
    note: "Oferty, terminy, współpraca handlowa",
  },
  {
    name: "Dział technologiczny LASER",
    phone: "660 491 187",
    phoneHref: "+48660491187",
    email: "biuro@lasersportex.pl",
    note: "Konsultacje technologiczne, możliwości wykonania",
  },
];

export type Service = {
  id: string;
  no: string;
  title: string;
  short: string;
  slug: string;
  image: string;
  imageAlt: string;
  lead: string;
};

export const services: Service[] = [
  {
    id: "laser",
    no: "01",
    title: "Cięcie laserowe",
    short:
      "Precyzyjne wycinanie detali z blach z wykorzystaniem zaawansowanych technologii laserowych.",
    slug: "/ciecie-laserowe",
    image: "laser-sparks",
    imageAlt: "Wiązka lasera tnie blachę stalową — iskry w hali produkcyjnej",
    lead:
      "Wycinamy elementy z blach czarnych, nierdzewnych i aluminiowych. Dwie wycinarki laserowe pozwalają łączyć grube przekroje z powtarzalnością kształtu niezależną od wielkości serii.",
  },
  {
    id: "bending",
    no: "02",
    title: "Gięcie blach CNC",
    short:
      "Dokładne formowanie elementów z wykorzystaniem nowoczesnych pras krawędziowych.",
    slug: "/giecie-blach-cnc",
    image: "bending-press",
    imageAlt: "Operator przy prasie krawędziowej CNC podczas gięcia blachy",
    lead:
      "Gięcie na prasie krawędziowej AM MACHINERY 3100 o nacisku 160 ton — blachy do 10 mm grubości i do 3100 mm długości gięcia.",
  },
  {
    id: "welding",
    no: "03",
    title: "Spawanie i konstrukcje stalowe",
    short:
      "Wykonywanie elementów metalowych oraz konstrukcji na podstawie dokumentacji technicznej.",
    slug: "/spawanie-konstrukcji-stalowych",
    image: "welding",
    imageAlt: "Spawanie konstrukcji stalowej w zakładzie produkcyjnym",
    lead:
      "Spawanie MIG (131) i TIG (141) stali węglowej, nierdzewnej oraz aluminium. Konstrukcje wykonujemy w całości w naszym zakładzie, według dokumentacji klienta lub przy wsparciu naszych konstruktorów.",
  },
  {
    id: "coating",
    no: "04",
    title: "Lakierowanie proszkowe ALCOLOR",
    short:
      "Profesjonalne wykonywanie powłok lakierniczych dla elementów i konstrukcji metalowych.",
    slug: "/lakierowanie-proszkowe",
    image: "coating-racks",
    imageAlt: "Elementy stalowe na wózkach lakierni proszkowej",
    lead:
      "Lakiernia proszkowa ALCOLOR, wchodząca w skład Grupy Sportex, prowadzi pełne przygotowanie powierzchni i malowanie elementów o gabarytach do 730 × 200 × 250 cm.",
  },
];

export type Machine = {
  name: string;
  power?: string;
  table?: string;
  specs: { label: string; value: string }[];
};

export const laserMachines: Machine[] = [
  {
    name: "BYSTRONIC BYSPRINT 3015",
    power: "4400 W",
    table: "3000 × 1500 mm",
    specs: [
      { label: "Moc źródła", value: "4400 W" },
      { label: "Stół roboczy", value: "3000 × 1500 mm" },
      { label: "Stal czarna", value: "do 25 mm" },
      { label: "Stal nierdzewna", value: "do 20 mm" },
      { label: "Aluminium", value: "do 12 mm" },
    ],
  },
  {
    name: "EAGLE iNspire 2040 F6.0",
    power: "6000 W",
    table: "4000 × 2000 mm",
    specs: [
      { label: "Moc źródła", value: "6000 W" },
      { label: "Stół roboczy", value: "4000 × 2000 mm" },
      { label: "Stal czarna", value: "do 25 mm" },
      { label: "Stal nierdzewna", value: "do 30 mm" },
      { label: "Aluminium", value: "do 25 mm" },
    ],
  },
];

export const bendingMachine = {
  name: "AM MACHINERY 3100",
  specs: [
    { label: "Nacisk", value: "160 ton" },
    { label: "Długość gięcia", value: "do 3100 mm" },
    { label: "Grubość blachy", value: "do 10 mm" },
    { label: "Sterowanie", value: "CNC z symulacją" },
  ],
};

export const coatingSpecs = [
  { label: "Maks. długość elementu", value: "7300 mm" },
  { label: "Maks. szerokość", value: "2000 mm" },
  { label: "Maks. wysokość", value: "2500 mm" },
  { label: "Temperatura utwardzania", value: "ok. 200 °C" },
  { label: "Czas utwardzania", value: "ok. 20 min" },
  { label: "Grubość powłoki", value: "60–120 µm" },
];

export const stock = [
  { material: "Stal czarna", format: "3000 × 1500 mm", range: "0,50 – 20 mm" },
  { material: "Stal nierdzewna (304)", format: "3000 × 1500 mm", range: "0,50 – 15 mm" },
  { material: "Aluminium", format: "3000 × 1500 mm", range: "1 – 10 mm" },
];

export const processSteps = [
  {
    no: "01",
    title: "Zapytanie",
    text: "Przesyłacie dokumentację techniczną oraz informacje o zamówieniu: materiał, grubość, ilość, termin.",
  },
  {
    no: "02",
    title: "Analiza i wycena",
    text: "Weryfikujemy możliwości wykonania w naszym parku maszynowym i przygotowujemy ofertę.",
  },
  {
    no: "03",
    title: "Produkcja",
    text: "Realizacja z wykorzystaniem właściwej technologii — cięcia, gięcia, spawania lub lakierowania.",
  },
  {
    no: "04",
    title: "Odbiór lub dostawa",
    text: "Gotowe elementy przekazujemy zgodnie z ustalonymi warunkami — odbiór własny lub transport.",
  },
];

export const advantages = [
  {
    title: "Kompleksowa oferta",
    text: "Cięcie, gięcie, spawanie i lakierowanie proszkowe w ramach jednej współpracy.",
    icon: "layers",
  },
  {
    title: "Nowoczesne technologie",
    text: "Dwie wycinarki laserowe, prasa krawędziowa CNC i lakiernia proszkowa z pełnym ciągiem przygotowania powierzchni.",
    icon: "cpu",
  },
  {
    title: "Precyzja wykonania",
    text: "Powtarzalność kształtu i dokładność prowadzenia procesu — także przy skomplikowanych detalach.",
    icon: "target",
  },
  {
    title: "Indywidualne podejście",
    text: "Zakres i technologia dobierane do konkretnego zamówienia, nie do szablonu.",
    icon: "settings",
  },
  {
    title: "Elastyczna realizacja",
    text: "Różne wielkości serii i zakresy współpracy — od pojedynczych detali po dostawy seryjne.",
    icon: "repeat",
  },
  {
    title: "Wsparcie techniczne",
    text: "Kontakt z działem technologicznym na etapie przygotowania zapytania i produkcji.",
    icon: "headset",
  },
];

export const galleryCategories = [
  { id: "all", label: "Wszystkie" },
  { id: "laser", label: "Cięcie laserowe" },
  { id: "bending", label: "Gięcie CNC" },
  { id: "welding", label: "Spawanie" },
  { id: "structures", label: "Konstrukcje stalowe" },
  { id: "coating", label: "Lakierowanie proszkowe" },
  { id: "machines", label: "Park maszynowy" },
] as const;

export type GalleryCategory = (typeof galleryCategories)[number]["id"];

export type GalleryItem = {
  id: string;
  image: string;
  category: Exclude<GalleryCategory, "all">;
  title: string;
  alt: string;
  wide?: boolean;
  tall?: boolean;
};

export const gallery: GalleryItem[] = [
  {
    id: "g1",
    image: "laser-sparks",
    category: "laser",
    title: "Cięcie laserowe blachy",
    alt: "Wiązka lasera tnie blachę stalową, widoczne iskry",
    wide: true,
  },
  {
    id: "g2",
    image: "bending-press",
    category: "bending",
    title: "Gięcie na prasie CNC",
    alt: "Operator przy prasie krawędziowej CNC",
    tall: true,
  },
  {
    id: "g3",
    image: "coating-racks",
    category: "coating",
    title: "Elementy na wózkach lakierniczych",
    alt: "Elementy stalowe zawieszone na wózkach lakierni proszkowej",
  },
  {
    id: "g4",
    image: "welding",
    category: "welding",
    title: "Spawanie konstrukcji",
    alt: "Spawanie elementów stalowych w hali produkcyjnej",
    wide: true,
  },
  {
    id: "g5",
    image: "laser-detail",
    category: "laser",
    title: "Detal po cięciu laserowym",
    alt: "Wycięty laserowo detal na stole maszyny",
  },
  {
    id: "g6",
    image: "coating-profiles",
    category: "coating",
    title: "Profile po lakierowaniu",
    alt: "Profile aluminiowe po lakierowaniu proszkowym",
    tall: true,
  },
  {
    id: "g7",
    image: "plant-exterior",
    category: "machines",
    title: "Zakład produkcyjny",
    alt: "Hala produkcyjna Grupy Sportex widziana z zewnątrz",
    wide: true,
  },
  {
    id: "g8",
    image: "bending-hall",
    category: "bending",
    title: "Hala z prasami krawędziowymi",
    alt: "Wnętrze hali z maszynami do gięcia blach",
  },
  {
    id: "g9",
    image: "coating-line",
    category: "coating",
    title: "Ciąg technologiczny lakierni",
    alt: "Linia technologiczna lakierni proszkowej",
  },
  {
    id: "g10",
    image: "laser-head",
    category: "laser",
    title: "Głowica wycinarki",
    alt: "Głowica cięcia laserowego nad blachą",
  },
  {
    id: "g11",
    image: "sign-cut",
    category: "structures",
    title: "Znak wycięty w blasze",
    alt: "Znak Grupa Sportex wycięty laserowo w blasze",
    wide: true,
  },
  {
    id: "g12",
    image: "coating-frames",
    category: "coating",
    title: "Lakierowane ramy",
    alt: "Ramy metalowe po lakierowaniu proszkowym",
    tall: true,
  },
  {
    id: "g13",
    image: "sheets-stack",
    category: "machines",
    title: "Magazyn blach",
    alt: "Arkusze blachy przygotowane do obróbki",
  },
  {
    id: "g14",
    image: "packed-parts",
    category: "coating",
    title: "Elementy gotowe do wysyłki",
    alt: "Zabezpieczone elementy przygotowane do transportu",
  },
  {
    id: "g15",
    image: "laser-cut-parts",
    category: "laser",
    title: "Wycinarka w pracy",
    alt: "Wycinarka laserowa nad arkuszem z wyciętymi detalami",
  },
  {
    id: "g16",
    image: "coating-racks-2",
    category: "coating",
    title: "Detale po malowaniu",
    alt: "Lakierowane detale ułożone na regałach",
  },
  {
    id: "g17",
    image: "machined-part",
    category: "structures",
    title: "Detal konstrukcyjny",
    alt: "Precyzyjnie wykonany detal metalowy",
  },
  {
    id: "g18",
    image: "profiles-stack",
    category: "structures",
    title: "Profile i kształtowniki",
    alt: "Profile stalowe przygotowane do dalszej obróbki",
  },
  {
    id: "g19",
    image: "bending-operator",
    category: "machines",
    title: "Stanowisko CNC",
    alt: "Operator przy stanowisku sterowania maszyną CNC",
  },
  {
    id: "g20",
    image: "plant-yard",
    category: "machines",
    title: "Plac zakładu",
    alt: "Plac manewrowy przed halą produkcyjną",
  },
];

export const coatingApplications = [
  "stolarka aluminiowa — profile okienne i drzwiowe",
  "blachy trapezowe i elementy elewacji budynków",
  "konstrukcje stalowe, bramy, ogrodzenia, balustrady",
  "grzejniki i elementy orynnowania",
  "meble biurowe, okucia, regały i stoły sklepowe",
  "szafy metalowe i ich elementy",
  "sprzęt rolniczy, ogrodowy i elementy maszyn",
  "obudowy wentylatorów i klimatyzacji",
  "sprzęt medyczny, rehabilitacyjny i sportowy",
  "elementy reklamowe i dekoracyjne",
  "obudowy urządzeń elektrycznych, gazowych i oświetleniowych",
  "felgi aluminiowe, ramy rowerowe, elementy pojazdów",
];

export const paintTypes = [
  { name: "Epoksydowe", use: "Odporność chemiczna i mechaniczna, m.in. przemysł motoryzacyjny." },
  { name: "Epoksydowo-poliestrowe", use: "Duża odporność na żółknięcie i przegrzanie, głównie do wnętrz." },
  { name: "Poliestrowe", use: "Odporność na UV i czynniki atmosferyczne — zastosowania zewnętrzne." },
  { name: "Strukturalne", use: "Powłoki dekoracyjne o fakturze od drobnego papieru do „skórki pomarańczy”." },
  { name: "Antybombel", use: "Do powierzchni porowatych i gazujących." },
  { name: "Niskotemperaturowe", use: "Do podłoży o ograniczonej odporności termicznej." },
];
