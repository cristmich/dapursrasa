import { MetadataRoute } from "next";

const slugify = (text: string) => text.toLowerCase().replace(/[\s_]+/g, '-').replace(/[^\w-]+/g, '');

const regions = [
  { city: "Tangerang Selatan", areas: ["Bintaro", "Serpong", "Pamulang", "Ciputat", "Pondok Aren"] },
  { city: "Tangerang", areas: ["BSD City", "Gading Serpong", "Alam Sutera", "Karawaci", "Cikupa"] },
  { city: "Jakarta Selatan", areas: ["Kemang", "Kuningan", "SCBD", "Pondok Indah", "Tebet"] },
  { city: "Jakarta Pusat", areas: ["Menteng", "Sudirman", "Thamrin", "Senayan", "Cempaka Putih"] },
  { city: "Jakarta Barat", areas: ["Puri Indah", "Kebon Jeruk", "Grogol", "Tomang", "Cengkareng"] },
  { city: "Jakarta Utara", areas: ["Kelapa Gading", "PIK", "Pluit", "Sunter", "Ancol"] },
  { city: "Jakarta Timur", areas: ["Rawamangun", "Cawang", "Cibubur", "Duren Sawit", "Pulogadung"] },
  { city: "Depok", areas: ["Margonda", "Cinere", "Sawangan", "Kelapa Dua"] },
  { city: "Bogor", areas: ["Kota Bogor", "Sentul", "Cibinong", "Baranangsiang"] },
  { city: "Bekasi", areas: ["Kota Bekasi", "Summarecon Bekasi", "Cikarang", "Tambun"] },
];

const cateringRegions = [
  { city: "Gading Serpong", areas: ["Summarecon", "Paramount", "Modernland", "Kelapa Dua", "Curug"] },
  { city: "BSD City", areas: ["BSD Sektor 1-7", "Foresta", "The Icon", "Pagedangan", "Cisauk"] },
  { city: "Alam Sutera", areas: ["Alam Sutera", "Serpong Utara", "Pakualam", "Jelupang", "Cipondoh"] },
];

export const allAreaSlugs = regions.flatMap(r => [
  slugify(r.city),
  ...r.areas.map(a => slugify(a)),
]);

export const allCateringSlugs = cateringRegions.flatMap(r => [
  slugify(r.city),
  ...r.areas.map(a => slugify(a)),
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dapursrasa.com";
  const now = new Date();

  // Static core pages — high priority
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/catering-mingguan`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/nasi-box`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/portofolio`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/tentang-kami`, lastModified: now, changeFrequency: "yearly", priority: 0.65 },
    { url: `${baseUrl}/cara-order`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/hubungi-kami`, lastModified: now, changeFrequency: "yearly", priority: 0.75 },
  ];

  // Area-specific landing pages (SEO local intent)
  const areaPages: MetadataRoute.Sitemap = allAreaSlugs.flatMap((slug) => [
    { url: `${baseUrl}/${slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/nasi-box/${slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ]);

  // Catering mingguan area pages
  const cateringPages: MetadataRoute.Sitemap = allCateringSlugs.map((slug) => ({
    url: `${baseUrl}/catering-mingguan/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [
    ...staticPages,
    ...areaPages,
    ...cateringPages,
  ];
}
