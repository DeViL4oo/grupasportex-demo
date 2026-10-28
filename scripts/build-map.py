"""Buduje statyczną, ciemną mapę poglądową zakładu (kafle OpenStreetMap, z=15).

Wynik: public/images/map-1200.webp + map-800.webp.
Atrybucja OpenStreetMap jest wymagana i znajduje się pod mapą w serwisie.
"""
import math
import os
import urllib.request
from PIL import Image, ImageDraw, ImageEnhance

LAT, LON = 54.553787, 17.801989
Z = 15
COLS, ROWS = 5, 3
OUT_W, OUT_H = 1200, 600

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.path.join(ROOT, "_raw", "tiles")
OUT = os.path.join(ROOT, "public", "images")
os.makedirs(CACHE, exist_ok=True)
os.makedirs(OUT, exist_ok=True)

UA = {"User-Agent": "GrupaSportexDemo/1.0 (static map for demo site)"}


def project(lat, lon, z):
    n = 2 ** z
    x = (lon + 180) / 360 * n
    y = (1 - math.log(math.tan(math.radians(lat)) + 1 / math.cos(math.radians(lat))) / math.pi) / 2 * n
    return x * 256, y * 256


px, py = project(LAT, LON, Z)
cx, cy = int(px // 256), int(py // 256)
x0, y0 = cx - COLS // 2, cy - ROWS // 2

canvas = Image.new("RGB", (COLS * 256, ROWS * 256), (240, 240, 240))
for i in range(COLS):
    for j in range(ROWS):
        x, y = x0 + i, y0 + j
        path = os.path.join(CACHE, f"{Z}_{x}_{y}.png")
        if not os.path.exists(path):
            url = f"https://tile.openstreetmap.org/{Z}/{x}/{y}.png"
            data = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30).read()
            open(path, "wb").write(data)
        tile = Image.open(path).convert("RGB")
        canvas.paste(tile, (i * 256, j * 256))
        print(".", end="", flush=True)
print()

# punkt w układzie canvasa
mx, my = px - x0 * 256, py - y0 * 256
left = int(max(0, min(canvas.width - OUT_W, mx - OUT_W / 2)))
top = int(max(0, min(canvas.height - OUT_H, my - OUT_H / 2)))
crop = canvas.crop((left, top, left + OUT_W, top + OUT_H)).convert("L")

# Krzywa tonalna: ciemne tło, czytelne drogi (255) i delikatne etykiety (0-80).
CONTROL = [(0, 38), (80, 44), (130, 30), (180, 20), (220, 22), (242, 26), (250, 34), (255, 66)]
lut = []
for v in range(256):
    for k in range(len(CONTROL) - 1):
        x1, y1 = CONTROL[k]
        x2, y2 = CONTROL[k + 1]
        if x1 <= v <= x2:
            t = (v - x1) / (x2 - x1) if x2 > x1 else 0
            lut.append(int(y1 + (y2 - y1) * t))
            break
    else:
        lut.append(CONTROL[-1][1])

grey = crop.point(lut)
dark = Image.merge(
    "RGB",
    [
        grey.point(lambda v: int(v * 0.96)),
        grey.point(lambda v: int(v * 1.0)),
        grey.point(lambda v: int(v * 1.08)),
    ],
)

draw = ImageDraw.Draw(dark, "RGBA")
marker_x, marker_y = mx - left, my - top
# pierścień + punkt
draw.ellipse(
    [marker_x - 26, marker_y - 26, marker_x + 26, marker_y + 26],
    outline=(232, 0, 0, 80),
    width=2,
)
draw.ellipse(
    [marker_x - 9, marker_y - 9, marker_x + 9, marker_y + 9],
    fill=(232, 0, 0, 255),
    outline=(255, 255, 255, 230),
    width=2,
)
# znaczniki techniczne
for start in (-42, 32):
    draw.line([marker_x + start, marker_y, marker_x + start + 10, marker_y], fill=(255, 255, 255, 110), width=1)

for w in (1200, 800):
    img = dark.resize((w, int(dark.height * w / dark.width)), Image.LANCZOS)
    img.save(os.path.join(OUT, f"map-{w}.webp"), "WEBP", quality=82, method=6)

print("mapa zapisana")
