import { useEffect } from "react";
import { asset } from "../components/Img";
import { company } from "../data/site";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function siteUrl(path = "/"): string {
  const base = import.meta.env.BASE_URL || "/";
  const origin = typeof window === "undefined" ? "https://grupasportex.pl" : window.location.origin;
  return `${origin}${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

/** Ustawia title, opis, canonical, Open Graph i dane strukturalne dla podstrony. */
export function useSeo({ title, description, path, image, jsonLd }: SeoInput) {
  const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : "";
  useEffect(() => {
    const fullTitle = `${title} | Grupa Sportex`;
    document.title = fullTitle;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", company.name);
    upsertMeta("property", "og:locale", "pl_PL");
    upsertMeta("property", "og:url", siteUrl(path));
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "robots", "noindex, nofollow");
    upsertLink("canonical", siteUrl(path));
    if (image) {
      const abs = image.startsWith("http") ? image : siteUrl(image);
      upsertMeta("property", "og:image", abs);
      upsertMeta("name", "twitter:image", abs);
    }

    const id = "page-jsonld";
    document.getElementById(id)?.remove();
    if (jsonLdString) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = id;
      script.textContent = jsonLdString;
      document.head.appendChild(script);
    }
  }, [title, description, path, image, jsonLdString]);
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.legalName,
  alternateName: company.name,
  url: "https://grupasportex.pl",
  logo: "https://grupasportex.pl/photo/_logo.png",
  description: company.description,
  telephone: company.phone,
  email: company.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.street,
    postalCode: company.postal,
    addressLocality: company.city,
    addressRegion: company.region,
    addressCountry: company.country,
  },
  knowsAbout: [
    "Cięcie laserowe blach",
    "Gięcie blach CNC",
    "Spawanie konstrukcji stalowych",
    "Lakierowanie proszkowe",
  ],
};

export const localBusinessJsonLd = {
  ...organizationJsonLd,
  "@type": "LocalBusiness",
  "@id": "https://grupasportex.pl/#zaklad",
  image: "https://grupasportex.pl/photo/_logo.png",
  priceRange: "Wycena indywidualna",
  geo: {
    "@type": "GeoCoordinates",
    latitude: company.lat,
    longitude: company.lng,
  },
};

export function serviceJsonLd(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: name,
    areaServed: "Polska",
    provider: organizationJsonLd,
    url: siteUrl(path),
  };
}

export { asset };
