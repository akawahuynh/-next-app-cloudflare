/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.SITE_URL || "http://localhost:3000",
  changefreq: "daily",
  priority: 0.8,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  alternateRefs: [
    {
      href: process.env.SITE_URL + "/es",
      hreflang: "es",
    },
    {
      href: process.env.SITE_URL + "/fr",
      hreflang: "fr",
    },
  ],
  // Default transformation function
  transform: async (config, path, priority) => {
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: priority || config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  additionalPaths: async (config) => [
    await config.transform(config, "/", 0.9),
    await config.transform(config, "/about"),
    await config.transform(config, "/price"),
    await config.transform(config, "/privacy"),
    await config.transform(config, "/tos"),
    await config.transform(config, "/contact"),
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "test-bot",
        allow: ["/path", "/path-2"],
      },
      {
        userAgent: "black-listed-bot",
        disallow: ["/sub-path-1", "/path-2"],
      },
    ],
    additionalSitemaps: [
      "https://example.com/my-custom-sitemap-1.xml",
      "https://example.com/my-custom-sitemap-2.xml",
      "https://example.com/my-custom-sitemap-3.xml",
    ],
  },
};
