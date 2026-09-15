import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://dapursrasa.com";

  return {
    rules: [
      // ── Google ──────────────────────────────────────────────
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/login"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
      },
      // Google AI (Gemini / Search Generative Experience)
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/login"],
      },
      {
        userAgent: "Googlebot-News",
        allow: "/",
      },

      // ── Bing / Microsoft ────────────────────────────────────
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/login"],
      },
      {
        userAgent: "msnbot",
        allow: "/",
      },
      // Microsoft Copilot / Bing AI
      {
        userAgent: "BingPreview",
        allow: "/",
      },

      // ── AI Agents / LLM Crawlers ────────────────────────────
      // OpenAI (ChatGPT, GPT-4o)
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/login"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
      },
      // Anthropic (Claude)
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/login"],
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
      // Perplexity AI
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/login"],
      },
      // Common Crawl (trains many LLMs)
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/login"],
      },
      // Cohere AI
      {
        userAgent: "cohere-ai",
        allow: "/",
      },
      // Meta AI (Llama)
      {
        userAgent: "Meta-ExternalAgent",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/login"],
      },
      {
        userAgent: "FacebookBot",
        allow: "/",
      },
      // Apple (Siri / Apple Intelligence)
      {
        userAgent: "Applebot",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/login"],
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
      },
      // Amazon Alexa
      {
        userAgent: "Amazonbot",
        allow: "/",
      },
      // Diffbot (AI structured data)
      {
        userAgent: "Diffbot",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/login"],
      },
      // You.com AI Search
      {
        userAgent: "YouBot",
        allow: "/",
      },

      // ── Social & Other Search Engines ───────────────────────
      {
        userAgent: "Slurp",           // Yahoo
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/login"],
      },
      {
        userAgent: "DuckDuckBot",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/login"],
      },
      {
        userAgent: "Twitterbot",
        allow: "/",
      },
      {
        userAgent: "LinkedInBot",
        allow: "/",
      },
      {
        userAgent: "WhatsApp",
        allow: "/",
      },
      {
        userAgent: "facebookexternalhit",
        allow: "/",
      },
      {
        userAgent: "Telegrambot",
        allow: "/",
      },

      // ── Fallback ─────────────────────────────────────────────
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/login"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
