import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://dapursrasa.com";

  return {
    rules: [
      // Allow all major search engine crawlers
      {
        userAgent: [
          "*",
          "Googlebot",
          "Bingbot",
          "Slurp",          // Yahoo
          "DuckDuckBot",
          "Baiduspider",
          "YandexBot",
          "facebookexternalhit",
          "Twitterbot",
          "LinkedInBot",
          "WhatsApp",
          // AI Agents / LLM crawlers
          "GPTBot",
          "Google-Extended",
          "ChatGPT-User",
          "CCBot",
          "anthropic-ai",
          "Claude-Web",
          "Applebot",
          "Applebot-Extended",
          "PerplexityBot",
        ],
        allow: "/",
        disallow: [
          "/api/",
          "/dashboard/",
          "/login",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
