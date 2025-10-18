export default function Head() {
  const siteUrl = 'https://xsong.us';
  const pageUrl = `${siteUrl}/projects`;
  // 使用現有專案圖片作為預覽縮圖（PNG，適合社群分享）
  const ogImage = `${siteUrl}/images/projects/webp/xsong-personal-website.webp`;

  const title = 'Projects - xsong.us';
  const description = '探索我的專案作品，從全端應用到互動工具，每個專案都展現了不同的技術挑戰和解決方案。';

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="xsong.us Projects" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical */}
      <link rel="canonical" href={pageUrl} />
    </>
  );
}


