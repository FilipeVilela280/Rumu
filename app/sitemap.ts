import { MetadataRoute } from 'next'

// Esta linha é obrigatória para sites estáticos (output: export)
export const dynamic = 'force-static'; 

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.rumustudio.pt' 

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}