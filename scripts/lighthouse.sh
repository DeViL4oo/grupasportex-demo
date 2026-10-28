#!/bin/bash
# Pomiar Lighthouse (mobile) dla wersji demonstracyjnej.
# Wymaga: uruchomionego `npm run preview` (domyślnie http://127.0.0.1:4178)
# oraz Google Chrome. CHROME_PATH można nadpisać zmienną środowiskową.
set -e
cd "$(dirname "$0")/.."

URL="${1:-http://127.0.0.1:4178/}"
OUT="${2:-./lighthouse-report.json}"
CHROME_PATH="${CHROME_PATH:-C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe}"
export CHROME_PATH

npx --yes lighthouse@12 "$URL" \
  --chrome-flags="--headless=new --no-sandbox --disable-gpu" \
  --output=json --output-path="$OUT" \
  --only-categories=performance,accessibility,best-practices,seo \
  --form-factor=mobile --screenEmulation.mobile=true --throttling-method=simulate \
  --quiet

node -e "const r=require(process.argv[1]);console.log(Object.entries(r.categories).map(([k,v])=>k+': '+Math.round(v.score*100)).join(' | '))" "$OUT"
