import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PAGES_METADATA, SITE_URL, FAQ_ITEMS } from '../constants';

interface SEOHeadProps {
  customTitle?: string;
  customDescription?: string;
  title?: string;
  description?: string;
  canonicalUrl?: string;
  path?: string;
  faqList?: { question: string; answer: string }[];
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  customTitle,
  customDescription,
  title: propTitle,
  description: propDescription,
  canonicalUrl: propCanonicalUrl,
  path,
  faqList,
}) => {
  const location = useLocation();
  const currentPath = path || location.pathname;
  const pageMeta = PAGES_METADATA[currentPath] || PAGES_METADATA['/'];

  const title = propTitle || customTitle || pageMeta.title;
  const description = propDescription || customDescription || pageMeta.description;
  const canonicalUrl = propCanonicalUrl || `${SITE_URL}${currentPath === '/' ? '/' : currentPath}`;
  const ogImageUrl = `${SITE_URL}/og-image.png`;

  useEffect(() => {
    // Helper to set or create meta tag
    const setMetaTag = (attribute: string, key: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // If on private app route, ensure noindex, nofollow
    if (currentPath.startsWith('/app')) {
      document.title = title.includes('Nam Nilam') ? title : `${title} | Nam Nilam Workspace`;
      setMetaTag('name', 'robots', 'noindex, nofollow');
      return;
    }

    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // 1. Update Title
    document.title = title;

    // Primary Meta
    setMetaTag('name', 'description', description);

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // OpenGraph
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', ogImageUrl);
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:site_name', 'Nam Nilam WhatsApp AI');

    // Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImageUrl);

    // 3. Inject Dynamic JSON-LD structured data for Page & Breadcrumbs
    const scriptId = 'seo-dynamic-jsonld';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const schemas: any[] = [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: title,
        description: description,
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          name: 'Nam Nilam WhatsApp AI',
          url: SITE_URL,
        },
      },
    ];

    // Inner Page BreadcrumbList
    if (currentPath !== '/') {
      const pageName = pageMeta.h1 || title.split('|')[0].trim();
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SITE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: pageName,
            item: canonicalUrl,
          },
        ],
      });
    }

    // FAQPage schema if FAQ items exist or on /faq
    const faqs = faqList || (currentPath === '/faq' ? FAQ_ITEMS : undefined);
    if (faqs && faqs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      });
    }

    scriptTag.text = JSON.stringify(schemas);
  }, [title, description, canonicalUrl, ogImageUrl, currentPath, faqList]);

  return null;
};
