
import { Helmet } from 'react-helmet-async';

interface BlogSEOProps {
  title: string;
  description: string;
  image?: string;
  url: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}

const BlogSEO: React.FC<BlogSEOProps> = ({
  title,
  description,
  image,
  url,
  publishedTime,
  modifiedTime,
  author,
  tags = []
}) => {
  const siteUrl = 'https://saturnreturn.site';
  const fullUrl = `${siteUrl}${url}`;
  const defaultImage = `${siteUrl}/saturn-og-image.jpg`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": image || defaultImage,
    "author": {
      "@type": "Person",
      "name": author || "Saturn Return Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Saturn Return",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/favicon.svg`
      }
    },
    "url": fullUrl,
    "datePublished": publishedTime,
    "dateModified": modifiedTime || publishedTime,
    "keywords": tags.join(', '),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": fullUrl
    }
  };

  return (
    <Helmet>
      <title>{title} | Saturn Return Blog</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={tags.join(', ')} />
      
      {/* Open Graph */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Saturn Return" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || defaultImage} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
};

export default BlogSEO;
