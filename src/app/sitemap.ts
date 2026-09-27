import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { pillars } from "@/content/services";
import { getInsights } from "@/lib/cms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticPaths = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/growth-packages", priority: 0.9 },
    { path: "/industries", priority: 0.8 },
    { path: "/about", priority: 0.8 },
    { path: "/process", priority: 0.7 },
    { path: "/insights", priority: 0.6 },
    { path: "/faq", priority: 0.6 },
    { path: "/contact", priority: 0.9 },
    { path: "/careers", priority: 0.5 },
    { path: "/privacy-policy", priority: 0.2 },
    { path: "/terms-of-use", priority: 0.2 },
    { path: "/disclaimer", priority: 0.2 },
  ];

  const pillarPaths = pillars.flatMap((pillar) => [
    { path: `/services/${pillar.slug}`, priority: 0.85 },
    ...pillar.subServices.map((service) => ({
      path: `/services/${pillar.slug}/${service.slug}`,
      priority: 0.7,
    })),
  ]);

  // Published Insights articles (written in the /keystatic editor).
  const { published } = await getInsights();
  const articlePaths = published.map((post) => ({ path: `/insights/${post.slug}`, priority: 0.6 }));

  return [...staticPaths, ...pillarPaths, ...articlePaths].map((entry) => ({
    url: `${site.url}${entry.path === "/" ? "" : entry.path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: entry.priority,
  }));
}
