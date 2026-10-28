"""Przygotowuje zoptymalizowane obrazy WebP (kilka szerokosci) do public/images.
Zrodla: _raw/ (zdjecia z oficjalnej strony grupasportex.pl, wykorzystane w wersji demonstracyjnej).
"""
from PIL import Image, ImageOps
import json
import os
import shutil

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "_raw")
OUT = os.path.join(ROOT, "public", "images")
os.makedirs(OUT, exist_ok=True)

# nazwa docelowa -> (plik zrodlowy, szerokosci, opis alt)
MAP = {
    "hero-laser": ("slider_5888602b9d10c.jpg", [640, 1141], "Glowica wycinarki laserowej tnie blache, iskry"),
    "laser-cut-parts": ("_mg_1846_galeria_58a2ffc286e42.jpg", [480, 800], "Wycinarka laserowa nad blacha z wycietymi detalami"),
    "laser-sparks-close": ("_mg_1872_galeria_58a2ffc2a4f85.jpg", [480, 800], "Strumien iskier podczas ciecia laserowego blachy"),
    "laser-sparks": ("_mg_1892_galeria_58a2ffc2c65c1.jpg", [480, 800], "Wiazka lasera tnieaca stal"),
    "laser-head": ("_mg_1915_galeria_58a2ffc2e6664.jpg", [480, 800], "Glowica ciecia laserowego przy pracy"),
    "laser-sparks-2": ("_mg_1918_galeria_58a2ffc3137aa.jpg", [480, 800], "Iskry przy cieciu laserowym"),
    "laser-burst": ("_mg_1946_galeria_58a2ffc33484b.jpg", [480, 800], "Proces ciecia laserowego stali"),
    "laser-detail": ("_mg_1978_galeria_58a2ffc36befb.jpg", [480, 800], "Detal wyciety laserowo na stole maszyny"),
    "sign-cut": ("_mg_2010_galeria_58a2ffc3a3b3b.JPG", [480, 900, 1200], "Wykonany laserowo znak Grupa Sportex w blasze"),
    "welding": ("_mg_2142_galeria_58a2ff31afa85.jpg", [480, 800], "Spawanie konstrukcji stalowej w hali produkcyjnej"),
    "profiles-stack": ("_mg_2148_galeria_58a2ff31cc6ab.jpg", [480, 800], "Profile i ksztaltowniki stalowe na placu"),
    "sheets-stack": ("_mg_2149_galeria_58a2ff31e9857.jpg", [480, 800], "Arkusze blachy przygotowane do obrobki"),
    "machined-part": ("_mg_2152_galeria_58a2ff3211cae.jpg", [480, 800], "Precyzyjny detal metalowy po obrobce"),
    "plant-exterior": ("1_galeria_589dbda14012a.jpg", [480, 800], "Hala produkcyjna Grupy Sportex z zewnatrz"),
    "plant-exterior-2": ("2_galeria_589dbda153c15.jpg", [480, 800], "Zaklad produkcyjny Grupy Sportex"),
    "plant-yard": ("5_galeria_589dbda186700.jpg", [480, 800], "Plac i hala zakladu produkcyjnego"),
    "coating-line": ("6_galeria_589dbda1986a8.jpg", [480, 800], "Ciag technologiczny lakierni proszkowej"),
    "coating-racks": ("2_galeria_589dbef79149b.jpg", [480, 800], "Elementy stalowe na wezach lakierniczych"),
    "coating-racks-2": ("6_galeria_589dbef7de48b.jpg", [480, 800], "Detale po lakierowaniu proszkowym na regalach"),
    "coating-frames": ("1_galeria_589dbef77e921.jpg", [360, 480], "Lakierowane proszkowo ramy na wezu"),
    "coating-profiles": ("4_galeria_589dbef7b81a3.jpg", [480, 800], "Profile aluminiowe po lakierowaniu proszkowym"),
    "coating-panels": ("malowanie_5888cb95e177f.jpg", [640, 1200], "Panele na linii lakierniczej"),
    "bending-press": ("3_galeria_589b42f69fff7.jpg", [480, 800], "Operator przy prasie krawedziowej CNC"),
    "bending-press-2": ("1_galeria_589b42f6c79ba.jpg", [480, 800], "Giecie blachy na prasie krawedziowej"),
    "bending-hall": ("4_galeria_589b42f68983a.jpg", [480, 800], "Hala z prasami krawedziowymi"),
    "bending-operator": ("6_galeria_589b42f662dd0.jpg", [480, 800], "Praca przy maszynie CNC"),
    "bent-parts": ("2_galeria_589b42f6b2f02.jpg", [480, 800], "Elementy po gieciu na prasie CNC"),
    "rack-storage": ("5_galeria_589dbef7cbae9.jpg", [480, 800], "Regaly z elementami w hali produkcyjnej"),
    "packed-parts": ("9_galeria_589dbef8213ae.jpg", [480, 800], "Zabezpieczone elementy gotowe do wysylki"),
    "painting-detail": ("2_galeria_589dbef79149b.jpg", [320, 480], "Detal lakierowany proszkowo"),
    "laser-sheet": ("5_galeria_589dbef7cbae9.jpg", [320, 480], "Blacha na stole wycinarki"),
}

manifest = {}
for name, (src, widths, alt) in MAP.items():
    path = os.path.join(SRC, src)
    if not os.path.exists(path):
        print("BRAK:", src)
        continue
    im = Image.open(path).convert("RGB")
    w0, h0 = im.size
    sources = []
    for w in widths:
        w = min(w, w0)
        h = round(h0 * w / w0)
        im2 = im.resize((w, h), Image.LANCZOS)
        fn = f"{name}-{w}.webp"
        im2.save(os.path.join(OUT, fn), "WEBP", quality=80, method=6)
        sources.append({"w": w, "src": f"images/{fn}"})
    if sources:
        manifest[name] = {
            "alt": alt,
            "width": w0,
            "height": h0,
            "ratio": round(w0 / h0, 4),
            "sources": sources,
            "fallback": sources[-1]["src"],
        }

# logo: oryginal, bez zmian (przezroczyste tlo)
shutil.copy(os.path.join(SRC, "_logo.png"), os.path.join(OUT, "..", "logo-sportex.png"))
# dodatkowa wieksza wersja logo na duze ekrany (bez zmiany ksztaltu/koloru)
lg = Image.open(os.path.join(SRC, "_logo.png"))
lg.resize((lg.width * 2, lg.height * 2), Image.LANCZOS).save(
    os.path.join(OUT, "..", "logo-sportex@2x.png")
)

with open(os.path.join(ROOT, "src", "data", "images.json"), "w", encoding="utf-8") as f:
    json.dump(manifest, f, ensure_ascii=False, indent=1)

total = sum(os.path.getsize(os.path.join(OUT, f)) for f in os.listdir(OUT))
print(f"{len(manifest)} obrazow, {len(os.listdir(OUT))} plikow, {total/1e6:.2f} MB")
