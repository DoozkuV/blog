import React, { useState, useEffect } from "react";
interface TypedNameProps {
  name: string;
  className?: string;
  typingSpeed?: number;
  onFinishedTyping?: () => void;
}

const TypedName: React.FC<TypedNameProps> = ({ name, className, typingSpeed = 120, onFinishedTyping }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < name.length) {
      const timeoutId = setTimeout(() => {
        setDisplayText(prev => prev + name[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeoutId);
    } else if (currentIndex === name.length && onFinishedTyping) {
      onFinishedTyping();
    }
  }, [currentIndex, name, typingSpeed, onFinishedTyping]);

  return (
    <div className={`relative inline-block ${className || ''}`}>
      {currentIndex > 0 && <span aria-label={name}>{displayText}</span>}
      {currentIndex < name.length && (
        <span className="inline-block w-[3px] h-[1em] bg-brand-white animate-blink ml-1 relative bottom-[0.1em]" aria-hidden="true">|</span>
      )}
    </div>
  );
};

export default TypedName;
