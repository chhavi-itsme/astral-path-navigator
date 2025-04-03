
import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ChevronRight, Map, Search, Globe, FileText, Home, Calculator, Mail } from 'lucide-react';

interface SitemapLink {
  title: string;
  href: string;
  description?: string;
  isExternal?: boolean;
  sublinks?: SitemapLink[];
  icon?: React.ReactNode;
}

interface SitemapSectionProps {
  title: string;
  links: SitemapLink[];
  icon?: React.ReactNode;
}

interface SitemapProps {
  className?: string;
}

const SitemapSection: React.FC<SitemapSectionProps> = ({ title, links, icon }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-primary flex items-center gap-2">
        {icon}
        {title}
      </h3>
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
                {link.icon && <span className="mr-2">{link.icon}</span>}
                <span>{link.title}</span>
                <ExternalLink className="ml-1 h-3 w-3 opacity-70 group-hover:opacity-100" />
              </a>
            ) : (
              <Link 
                to={link.href}
                className="flex items-center text-foreground hover:text-primary transition-colors"
              >
                {link.icon && <span className="mr-2">{link.icon}</span>}
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
                        {sublink.icon && <span className="mr-1">{sublink.icon}</span>}
                        {sublink.title}
                        <ExternalLink className="ml-1 h-3 w-3 opacity-70" />
                      </a>
                    ) : (
                      <Link 
                        to={sublink.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"
                      >
                        {sublink.icon && <span className="mr-1">{sublink.icon}</span>}
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
    { title: 'Home', href: '/', description: 'Learn about Saturn Return and our calculator', icon: <Home className="h-4 w-4" /> },
    { title: 'Calculator', href: '/calculator', description: 'Calculate your Saturn Return', icon: <Calculator className="h-4 w-4" /> },
    { title: 'Contact', href: '/contact', description: 'Get in touch with us', icon: <Mail className="h-4 w-4" /> },
    { title: 'Privacy Policy', href: '/privacy', description: 'Our privacy practices', icon: <FileText className="h-4 w-4" /> },
    { title: 'Terms of Service', href: '/terms', description: 'Terms and conditions', icon: <FileText className="h-4 w-4" /> }
  ];

  const resourceLinks: SitemapLink[] = [
    { 
      title: 'About Saturn Return', 
      href: '/#about', 
      description: 'Learn what Saturn Return means in astrology',
      sublinks: [
        { title: 'First Saturn Return', href: '/calculator' },
        { title: 'Second Saturn Return', href: '/calculator' },
        { title: 'Life Transitions', href: '/calculator' }
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
      description: 'NASA\'s Saturn information page',
      icon: <Globe className="h-4 w-4" />
    },
    { 
      title: 'Astronomy Magazine', 
      href: 'https://astronomy.com/', 
      isExternal: true,
      description: 'Latest astronomy news and information',
      icon: <Globe className="h-4 w-4" />
    }
  ];

  return (
    <div className={`cosmic-card p-8 ${className}`}>
      <h2 className="text-2xl font-bold mb-6 cosmic-title flex items-center">
        <Map className="mr-2 h-5 w-5" />
        Sitemap
      </h2>
      <p className="text-muted-foreground mb-6">
        Navigate through our website easily with this comprehensive sitemap. Find all the resources you need about Saturn Return and our calculator.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SitemapSection title="Main Navigation" links={mainLinks} icon={<Home className="h-5 w-5" />} />
        <SitemapSection title="Resources" links={resourceLinks} icon={<FileText className="h-5 w-5" />} />
        <SitemapSection title="External Resources" links={externalLinks} icon={<Globe className="h-5 w-5" />} />
      </div>
    </div>
  );
};

export default Sitemap;
