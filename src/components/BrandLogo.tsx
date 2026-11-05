import React from 'react';

export const LOGO_IMAGE_PATH = '/assets/aistudio/IMG_20261104_083633_714_b57662bc.png';

interface BrandLogoProps {
  variant?: 'full' | 'compact' | 'icon' | 'badge';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  onClick,
  showText = true,
}) => {
  // Dimension mappings with proper scaling and responsive tweaks
  const imageSizes = {
    sm: 'w-9 h-9 sm:w-10 sm:h-10',
    md: 'w-12 h-12 sm:w-14 sm:h-14',
    lg: 'w-20 h-20 sm:w-24 sm:h-24',
    xl: 'w-28 h-28 sm:w-36 sm:h-36',
  };

  const textSizes = {
    sm: 'text-sm sm:text-base',
    md: 'text-lg sm:text-xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-3xl sm:text-4xl',
  };

  const subTextSizes = {
    sm: 'text-[8px] sm:text-[9px]',
    md: 'text-[10px] sm:text-[11px]',
    lg: 'text-xs sm:text-sm',
    xl: 'text-sm sm:text-base',
  };

  const isIconOnly = variant === 'icon' || !showText;

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 cursor-pointer select-none group transition-transform ${className}`}
    >
      {/* Original Circular Golden Emblem */}
      <div className={`relative flex items-center justify-center shrink-0 rounded-full overflow-hidden ${imageSizes[size]}`}>
        {/* Subtle ambient golden glow behind the emblem */}
        <div className="absolute inset-0 bg-amber-400/20 blur-md rounded-full group-hover:bg-amber-400/35 transition-all duration-300 pointer-events-none" />

        {/* The original logo image with preserved aspect ratio, sharpness, and circular shape */}
        <img
          src={LOGO_IMAGE_PATH}
          alt="Ahmad Mobile Zone Official Logo"
          className="w-full h-full object-cover rounded-full relative z-10 drop-shadow-[0_4px_12px_rgba(212,175,55,0.4)] group-hover:scale-105 transition-transform duration-300 filter contrast-105"
          loading="eager"
        />
      </div>

      {/* Brand Typography */}
      {!isIconOnly && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-brand font-black tracking-wider uppercase gold-gradient-text transition-all group-hover:brightness-110 leading-tight ${textSizes[size]}`}
            >
              Ahmad Mobile
            </span>
            <span
              className={`font-brand font-bold tracking-widest text-amber-400 uppercase px-1.5 py-0.5 rounded border border-amber-500/40 bg-amber-500/10 shrink-0 ${
                size === 'sm' ? 'text-[8px]' : 'text-[10px]'
              }`}
            >
              ZONE
            </span>
          </div>

          {(variant === 'full' || variant === 'badge') && (
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-gray-400 font-medium tracking-wider uppercase ${subTextSizes[size]}`}>
                Budhni, Peshawar
              </span>
              <span className="w-1 h-1 rounded-full bg-amber-400/70" />
              <span className={`text-amber-300/90 font-semibold tracking-wider ${subTextSizes[size]}`}>
                Premium Tech
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
