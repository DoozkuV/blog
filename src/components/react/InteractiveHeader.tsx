import TypedName from './TypedName';
import React, { useEffect, useRef, useState } from 'react';

// Re-import or redefine icons for TSX context if not passing as Astro slots
// For simplicity, assuming SVGs are inlined or simple components
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

export interface InteractiveHeaderProps {
  userName: string;
  linkedinUrl: string;
  githubUrl: string;
  xUrl: string;
  navLinks: NavLink[];
}

const InteractiveHeader: React.FC<InteractiveHeaderProps> = ({
  userName,
  linkedinUrl,
  githubUrl,
  xUrl,
  navLinks,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [nameCompletelyTyped, setNameCompletelyTyped] = useState(false);
  const [showElements, setShowElements] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const initialHeaderViewRef = useRef<HTMLDivElement>(null);

  const socialButtons: SocialLink[] = [
    { href: linkedinUrl, label: "LinkedIn", icon: LinkedInIconTSX },
    { href: githubUrl, label: "GitHub", icon: GithubIconTSX },
    { href: xUrl, label: "X.com", icon: XIconTSX },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      // Condense when scrolled past the initial view's height or a fallback. 
      // TODO: Add a type for this
      const initialViewHeight: any = initialViewHeight.current?.offsetHeight ?? window.innerHeight * 0.7;
      setIsScrolled(offset > initialViewHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (nameCompletelyTyped) {
      const timer = setTimeout(() => {
        setShowElements(true);
      }, 200); // Short delay before buttons/socials start fading in
      return () => clearTimeout(timer);
    }
  }, [nameCompletelyTyped]);

  const baseButtonClasses = "font-headline uppercase tracking-wider transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-opacity-75 disabled:opacity-50";
  const primaryButtonClasses = `${baseButtonClasses} bg-brand-white text-brand-black hover:bg-gray-200 active:scale-95`;
  const outlineButtonClasses = `${baseButtonClasses} border-2 border-brand-white text-brand-white hover:bg-brand-white hover:text-brand-black active:scale-95`;

  return (
    <header
      ref={headerRef}
      className={`transition-all duration-500 ease-in-out w-full z-50 
        ${isScrolled
          ? 'fixed top-0 left-0 right-0 bg-brand-black bg-opacity-90 backdrop-blur-md shadow-xl animate-fadeInDown'
          : 'relative'
        }`
      }
    >
      {/* This dive purely measures the initial full-screen view are to trigger scroll */}
      {!isScrolled && <div ref={initialHeaderViewRef} className="absolute inset-0 -z-10 opacity-0 pointer-events-none h-[calc(100vh-100px)] min-h-[500px] md:min-h-[600px]"></div>}
      <div className={`container mx-auto flex items-center transition-all duration-300 ease-in-out
        ${isScrolled
          ? 'justify-between py-3 px-4 sm:px-6 lg:px-8' // Condensed state
          : 'flex-col justify-center min-h-[calc(100vh-150px)] md:min-h-[calc(100vh-200px)] py-10 px-4 sm:px-6 lg:px-8 text-center' // Full view state 
        }`
      }>
        {/* Name */}
        <div className={`transition-all duration-500 ease-in-out ${isScrolled ? 'mb-0' : 'mb-10 md:mb-12'}`}>
          <TypedName
            name={userName}
            className={`
              ${isScrolled ? 'text-2xl sm:text-3xl' : 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl'}
            `}
            onFinishedTyping={() => setNameCompletelyTyped(true)}
          />
        </div>

        {/* Nav and Socials Wrapper */}
        <div className={`flex items-center transition-opacity duration-700 ease-in-out
          ${showElements || isScrolled ? 'opacity-100' : 'opacity-0'}
          ${isScrolled ? 'space-x-4 md:space-x-6' : 'flex-col space-y-10 md:space-y-12'}
        `}>
          {/* Main Navigation Buttons */}
          <nav className={`flex
            ${isScrolled ? 'space-x-3 sm:space-x-4' : `flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6 items-center justify-center ${showElements ? 'animate-fade-up' : ''}`}
          `}>
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                id={link.id}
                href={link.href}
                className={`
                  ${isScrolled ? `${outlineButtonClasses} !py-2 !px-3 sm:!px-4 !text-xs sm:!text-sm` : `${primaryButtonClasses} px-8 py-4 text-lg md:text-xl`}
                  ${showElements && !isScrolled ? 'animate-fade-up' : ''}
                `}
                style={!isScrolled && showElements ? { animationDelay: `${index * 100 + 200}ms` } : {}}
              >
                {link.label}
              </a>
            ))}
          </nav>
          {/* Social Links */}
          <div className={`flex items-center
${isScrolled ? 'space-x-3 sm:space-x-4' : `space-x-5 sm:space-x-6 justify-center ${showElements ? 'animate-fade-up' : ''}`}
`}
            style={!isScrolled && showElements ? { animationDelay: `${navLinks.length * 100 + 300}ms` } : {}}>
            {socialButtons.map((social, index) => (
              <a
                key={social.href}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-white hover:text-brand-accent transition-colors duration-200"
              >
                <social.icon size={isScrolled ? 20 : 28} className="opacity-80 hover:opacity-100" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </header >
  );
};

export default InteractiveHeader;
