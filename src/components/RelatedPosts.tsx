
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

interface RelatedPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  category: string;
}

interface RelatedPostsProps {
  currentPostId: string;
  posts: RelatedPost[];
  maxPosts?: number;
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ 
  currentPostId, 
  posts, 
  maxPosts = 3 
}) => {
  const relatedPosts = posts
    .filter(post => post.id !== currentPostId)
    .slice(0, maxPosts);

  if (relatedPosts.length === 0) return null;

  return (
    <section className="mt-16 p-8 cosmic-card">
      <h3 className="text-2xl font-semibold mb-6 sparkling-text">
        Related Articles
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link 
            key={post.id}
            to={`/blog/${post.id}`}
            className="group block hover:transform hover:scale-105 transition-all duration-300"
          >
            <article className="cosmic-card p-4 h-full">
              <div className="mb-4 rounded-lg overflow-hidden">
                <OptimizedImage
                  src={post.image}
                  alt={post.imageAlt}
                  width={300}
                  height={200}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="inline-block bg-accent/10 text-accent px-2 py-1 rounded text-xs font-medium mb-2">
                {post.category}
              </div>
              <h4 className="font-semibold mb-2 group-hover:text-accent transition-colors line-clamp-2">
                {post.title}
              </h4>
              <p className="text-muted-foreground text-sm line-clamp-3 mb-3">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-2 text-accent text-sm font-medium">
                Read More <ArrowRight className="h-3 w-3" />
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;
