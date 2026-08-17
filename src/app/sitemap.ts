import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://messenger.askangels.co";
  const pages = [
    "",
    "/bio",
    "/books",
    "/contact",
    "/kingdom-chamber",
    "/kingdom-chamber/churches",
    "/kingdom-chamber/speakers",
    "/kingdom-chamber/gods-chosen",
  ];

  return pages.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}
