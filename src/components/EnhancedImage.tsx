
import React, { useState, useRef, useEffect } from 'react';

interface EnhancedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  quality?: number;
}

const EnhancedImage: React.FC<EnhancedImageProps> = ({
  src,
  alt,
  className = '',
  width = 400,
  height = 300,
  priority = false,
  quality = 80
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [imageSrc, setImageSrc] = useState('');
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate optimized image URLs
  const generateOptimizedSrc = (originalSrc: string, w?: number, q?: number) => {
    if (originalSrc.includes('unsplash.com')) {
      let optimizedUrl = originalSrc;
      if (w) optimizedUrl += `&w=${w}`;
      if (q) optimizedUrl += `&q=${q}`;
      optimizedUrl += '&fm=webp&auto=format';
      return optimizedUrl;
    }
    return originalSrc;
  };

  useEffect(() => {
    if (!priority) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        { 
          threshold: 0.1,
          rootMargin: '50px'
        }
      );

      if (imgRef.current) {
        observer.observe(imgRef.current);
      }

      return () => observer.disconnect();
    }
  }, [priority]);

  useEffect(() => {
    if (isInView) {
      setImageSrc(generateOptimizedSrc(src, width, quality));
    }
  }, [isInView, src, width, quality]);

  const placeholderSrc = `data:image/svg+xml;base64,${btoa(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
    </svg>`
  )}`;

  return (
    <div 
      className={`relative overflow-hidden ${className}`} 
      ref={imgRef}
      style={{ 
        width: `${width}px`, 
        height: `${height}px`,
        minWidth: `${width}px`,
        minHeight: `${height}px`
      }}
    >
      {!isLoaded && (
        <img
          src={placeholderSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          width={width}
          height={height}
          aria-hidden="true"
        />
      )}
      {isInView && (
        <img
          src={imageSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          width={width}
          height={height}
          fetchPriority={priority ? 'high' : 'low'}
        />
      )}
    </div>
  );
};

export default EnhancedImage;
