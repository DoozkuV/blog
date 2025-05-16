import React, { useEffect, useRef, useState } from 'react';
import TypedName from './TypedName';

// Simplified Icons for TSX context 
const LinkedInIconTSX: React.FC<{ size?: number, className?: string }> = ({ size = 24, className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
  </svg>
);
const GithubIconTSX: React.FC<{ size?: number, className?: string }> = ({ size = 24, className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);
const XIconTSX: React.FC<{ size?: number, className?: string }> = ({ size = 24, className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface NavLink {
  href: string;
  label: string;
  id?: string;
};

interface SocialLink {
  href: string;
  label: string;
  icon: React.FC<{ size?: number, className?: string }>;
}

export interface AnimatedIntroProps {
  userName: string;
  linkedinUrl: string;
  githubUrl: string;
  xUrl: string;
  navLinks: NavLink[];
  standardHeaderId: string;
}

const AnimatedIntro: React.FC<AnimatedIntroProps> = ({
  userName,
  linkedinUrl,
  githubUrl,
  xUrl,
  navLinks,
  standardHeaderId,
}) => {
  const [nameCompletelyTyped, setNameCompletelyTyped] = useState(false);
  const [showElements, setShowElements] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const introSectionRef = useRef<HTMLDivElement>(null);

  const socialButtons: SocialLink[] = [
    { href: linkedinUrl, label: "LinkedIn", icon: LinkedInIconTSX },
    { href: githubUrl, label: "GitHub", icon: GithubIconTSX },
    { href: xUrl, label: "X.com", icon: XIconTSX },
  ];

  useEffect(() => {
    if (nameCompletelyTyped) {
      const timer = setTimeout(() => {
        setShowElements(true);
      }, 200); // Short delay before buttons/socials start fading in
      return () => clearTimeout(timer);
    }
  }, [nameCompletelyTyped]);

  useEffect(() => {
    const headerElement = document.getElementById(standardHeaderId);
    if (!headerElement || !introSectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && entry.boundingClientRect.bottom < 50) {
          headerElement.classList.remove('standard-header-hidden-by-hero');
          headerElement.classList.add('standard-header-revealed');
        } else {
          headerElement.classList.add('standard-header-hidden-by-hero');
          headerElement.classList.remove('standard-header-revealed');
        }
      },
      {
        root: null,
        threshold: 0.05,
      }
    );

    observer.observe(introSectionRef.current);

    return () => observer.disconnect();
  }, [standardHeaderId, nameCompletelyTyped]);

  const primaryButtonClasses = "font-headline uppercase tracking-wider transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-75 disabled:opacity-50 bg-brand-white text-brand-black hover:bg-gray-200 active:scale-95 px-8 py-4 text-lg md:text-xl";

  return (
    <section
      ref={introSectionRef}
      className="min-h-[calc(100vh-100px)] md:min-h-[calc(100vh-150px)] flex flex-col justify-center items-center text-center py-10 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="mb-10 md:mb-12">
        <TypedName
          name={userName}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-headline"
          onFinishedTyping={() => setNameCompletelyTyped(true)}
        />
      </div>

      <div className={`flex flex-col items-center space-y-10 md:space-y-12 transition-opacity duration-700 ease-in-out ${showElements ? 'opacity-100' : 'opacity-0'}`}>
        <nav className={`flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6 items-center justify-center ${showElements ? 'animate-fadeInUp' : ''}`}>
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              id={link.id}
              href={link.href}
              className={`${primaryButtonClasses} ${showElements ? 'animate-fadeInUp' : ''}`}
              style={showElements ? { animationDelay: `${index * 100 + 200}ms` } : {}}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div
          className={`flex items-center space-x-5 sm:space-x-6 justify-center ${showElements ? 'animate-fadeInUp' : ''}`}
          style={showElements ? { animationDelay: `${navLinks.length * 100 + 300}ms` } : {}}
        >
          {socialButtons.map((social) => (
            <a
              key={social.href}
              href={social.href}
              aria-label={social.label}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-white hover:text-accent transition-colors duration-200"
            >
              <social.icon size={28} className="opacity-80 hover:opacity-100" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimatedIntro;
