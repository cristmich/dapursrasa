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

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dapursrasa.com"; // Ganti dengan domain asli saat production

  // Default static pages
  const sitemapUrls: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: "yearly", priority: 1 },
    { url: `${baseUrl}/catering-mingguan`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/nasi-box`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/portofolio`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/tentang-kami`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/hubungi-kami`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
  ];

  // Generate all area slugs for Root (/<area>) and Nasi Box (/nasi-box/<area>)
  const areaSlugs = regions.flatMap(r => [
    slugify(r.city),
    ...r.areas.map(a => slugify(a))
  ]);

  areaSlugs.forEach((slug) => {
    // Root area pages (/<area>)
    sitemapUrls.push({
      url: `${baseUrl}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
    
    // Nasi Box area pages (/nasi-box/<area>)
    sitemapUrls.push({
      url: `${baseUrl}/nasi-box/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  // Catering Mingguan areas (hanya area tertentu)
  const cateringRegions = [
    { city: "Gading Serpong", areas: ["Summarecon", "Paramount", "Modernland", "Kelapa Dua", "Curug"] },
    { city: "BSD City", areas: ["BSD Sektor 1–7", "Foresta", "The Icon", "Pagedangan", "Cisauk"] },
    { city: "Alam Sutera", areas: ["Alam Sutera", "Serpong Utara", "Pakualam", "Jelupang", "Cipondoh"] },
  ];
  
  const cateringSlugs = cateringRegions.flatMap(r => [
    slugify(r.city),
    ...r.areas.map(a => slugify(a))
  ]);
  
  cateringSlugs.forEach((slug) => {
    // Catering Mingguan area pages (/catering-mingguan/<area>)
    sitemapUrls.push({
      url: `${baseUrl}/catering-mingguan/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  });

  return sitemapUrls;
}
