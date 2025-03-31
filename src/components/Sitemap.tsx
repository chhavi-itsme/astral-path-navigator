
import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ChevronRight, Map } from 'lucide-react';

interface SitemapLink {
  title: string;
  href: string;
  description?: string;
  isExternal?: boolean;
  sublinks?: SitemapLink[];
}

interface SitemapSectionProps {
  title: string;
  links: SitemapLink[];
}

interface SitemapProps {
  className?: string;
}

const SitemapSection: React.FC<SitemapSectionProps> = ({ title, links }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-primary">{title}</h3>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <li key={index}>
            {link.isExternal ? (
              <a 
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-foreground hover:text-primary transition-colors group"
              >
                <span>{link.title}</span>
                <ExternalLink className="ml-1 h-3 w-3 opacity-70 group-hover:opacity-100" />
              </a>
            ) : (
              <Link 
                to={link.href}
                className="flex items-center text-foreground hover:text-primary transition-colors"
              >
                {link.title}
              </Link>
            )}
            {link.description && (
              <p className="text-sm text-muted-foreground mt-1">{link.description}</p>
            )}
            {link.sublinks && link.sublinks.length > 0 && (
              <ul className="mt-2 ml-4 space-y-2">
                {link.sublinks.map((sublink, subIndex) => (
                  <li key={subIndex} className="flex items-center">
                    <ChevronRight className="h-3 w-3 mr-1 text-muted-foreground" />
                    {sublink.isExternal ? (
                      <a 
                        href={sublink.href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"
                      >
                        {sublink.title}
                        <ExternalLink className="ml-1 h-3 w-3 opacity-70" />
                      </a>
                    ) : (
                      <Link 
                        to={sublink.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {sublink.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Sitemap: React.FC<SitemapProps> = ({ className = "" }) => {
  const mainLinks: SitemapLink[] = [
    { title: 'Home', href: '/', description: 'Learn about Saturn Return and our calculator' },
    { title: 'Calculator', href: '/calculator', description: 'Calculate your Saturn Return' },
    { title: 'Contact', href: '/contact', description: 'Get in touch with us' }
  ];

  const resourceLinks: SitemapLink[] = [
    { 
      title: 'About Saturn Return', 
      href: '/#about', 
      description: 'Learn what Saturn Return means in astrology',
      sublinks: [
        { title: 'First Saturn Return', href: '/calculator', },
        { title: 'Second Saturn Return', href: '/calculator', },
        { title: 'Life Transitions', href: '/calculator', }
      ]
    },
    { title: 'How Our Calculator Works', href: '/#how-it-works' },
    { title: 'FAQ', href: '/#faq' }
  ];

  const externalLinks: SitemapLink[] = [
    { 
      title: 'NASA', 
      href: 'https://www.nasa.gov/solar-system/saturn/', 
      isExternal: true,
      description: 'NASA\'s Saturn information page'
    },
    { 
      title: 'Astronomy Magazine', 
      href: 'https://astronomy.com/', 
      isExternal: true,
      description: 'Latest astronomy news and information'
    }
  ];

  return (
    <div className={`cosmic-card p-8 ${className}`}>
      <h2 className="text-2xl font-bold mb-6 cosmic-title flex items-center">
        <Map className="mr-2 h-5 w-5" />
        Sitemap
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SitemapSection title="Main Navigation" links={mainLinks} />
        <SitemapSection title="Resources" links={resourceLinks} />
        <SitemapSection title="External Resources" links={externalLinks} />
      </div>
    </div>
  );
};

export default Sitemap;
