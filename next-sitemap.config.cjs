const normalizeSiteUrl = (input) => {
  if (!input) return 'https://example.com'
  if (input.startsWith('http://') || input.startsWith('https://')) return input
  return `https://${input}`
}

const SITE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SERVER_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL,
)

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: ['/posts-sitemap.xml', '/pages-sitemap.xml'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: '/admin/*',
      },
    ],
    additionalSitemaps: [`${SITE_URL}/pages-sitemap.xml`, `${SITE_URL}/posts-sitemap.xml`],
  },
}
