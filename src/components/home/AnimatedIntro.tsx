import React, { useState } from 'react';
import TypedName from './TypedName';
import { GITHUB_URL, LINKEDIN_URL, NAME, X_URL } from '../../utils/constants';
import { GithubIconTSX, LinkedInIconTSX, XIconTSX } from './Icons';

// Simplified Icons for TSX context 
interface NavLink {
  href: string;
  label: string;
  id?: string;
};

export interface AnimatedIntroProps {
  navLinks: NavLink[];
}

const AnimatedIntro: React.FC<AnimatedIntroProps> = ({
  navLinks,
}) => {
  const [showElements, setShowElements] = useState(false);

  const socialButtons = [
    { href: LINKEDIN_URL, label: "LinkedIn", icon: LinkedInIconTSX },
    { href: GITHUB_URL, label: "GitHub", icon: GithubIconTSX },
    { href: X_URL, label: "X.com", icon: XIconTSX },
  ];

  const handleFinishedTyping = () =>
    // Short delay before buttons/socials start fading in
    setTimeout(() => setShowElements(true), 200);


  const primaryButtonClasses = "font-headline uppercase tracking-wider transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-75 disabled:opacity-50 hover:bg-gray-200 active:scale-95 px-8 py-4 text-lg md:text-xl";

  return (
    <section
      className="min-h-[calc(100vh-100px)] md:min-h-[calc(100vh-150px)] flex flex-col justify-center items-center text-center py-10 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="mb-10 md:mb-12">
        <TypedName
          name={NAME}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-headline max-w-[7ch] sm:max-w-none "
          onFinishedTyping={handleFinishedTyping}
        />
      </div>

      <div className={`flex flex-col items-center space-y-10 md:space-y-12 transition-opacity duration-700 ease-in-out ${showElements ? 'opacity-100' : 'opacity-0'}`}>
        <nav className={`flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6 items-center justify-center ${showElements ? 'animate-fadeInUp' : ''}`}>
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              id={link.id}
              href={link.href}
              className={`${primaryButtonClasses} ${showElements ? 'animate-fadeInUp' : 'cursor-default pointer-events-none'}`}
              style={showElements ? { animationDelay: `${index * 100 + 200}ms` } : {}}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div
          className={`flex items-center space-x-5 sm:space-x-6 justify-center ${showElements ? 'animate-fadeInUp' : 'cursor-default pointer-events-none'}`}
          style={showElements ? { animationDelay: `${navLinks.length * 100 + 300}ms` } : {}}
        >
          {socialButtons.map((social) => (
            <a
              key={social.href}
              href={social.href}
              aria-label={social.label}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors duration-200"
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
