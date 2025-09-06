import React from 'react';

interface PersonStructuredDataProps {
  name: string;
  email: string;
  url: string;
  jobTitle?: string;
  description?: string;
  image?: string;
  sameAs?: string[];
}

export function PersonStructuredData({
  name,
  email,
  url,
  jobTitle = "軟體工程師",
  description = "專精於前端開發、DevOps 和技術分享的軟體工程師",
  image = "https://xsong.us/avatar.png",
  sameAs = [
    "https://github.com/120061203",
    "https://linkedin.com/in/songlinchen",
    "https://instagram.com/c.s.l.0922"
  ]
}: PersonStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": name,
    "email": email,
    "url": url,
    "jobTitle": jobTitle,
    "description": description,
    "image": image,
    "sameAs": sameAs,
    "knowsAbout": [
      "前端開發",
      "React",
      "Next.js",
      "TypeScript",
      "DevOps",
      "Git",
      "技術分享"
    ],
    "alumniOf": [
      {
        "@type": "CollegeOrUniversity",
        "name": "國立中央大學",
        "department": "網路學習科技研究所"
      },
      {
        "@type": "CollegeOrUniversity", 
        "name": "國立高雄大學",
        "department": "資訊工程學系"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface ArticleStructuredDataProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  image?: string;
  wordCount?: number;
}

export function ArticleStructuredData({
  title,
  description,
  url,
  datePublished,
  dateModified,
  author,
  image,
  wordCount
}: ArticleStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "url": url,
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "author": {
      "@type": "Person",
      "name": author,
      "url": "https://xsong.us"
    },
    "publisher": {
      "@type": "Organization",
      "name": "xsong.us",
      "url": "https://xsong.us",
      "logo": {
        "@type": "ImageObject",
        "url": "https://xsong.us/avatar.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    ...(image && {
      "image": {
        "@type": "ImageObject",
        "url": image,
        "width": 1200,
        "height": 630
      }
    }),
    ...(wordCount && {
      "wordCount": wordCount
    })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface WebsiteStructuredDataProps {
  name: string;
  description: string;
  url: string;
  author: string;
}

export function WebsiteStructuredData({
  name,
  description,
  url,
  author
}: WebsiteStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": name,
    "description": description,
    "url": url,
    "author": {
      "@type": "Person",
      "name": author
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
