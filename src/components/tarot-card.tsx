
"use client";

import Image from 'next/image';
import type { TarotCardData } from '@/lib/tarot-data';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'; // Using Card component for structure

interface TarotCardProps {
  card?: TarotCardData | null;
  isFlipped: boolean;
  onFlip: () => void;
  label?: string;
  className?: string;
}

export function TarotCard({ card, isFlipped, onFlip, label, className }: TarotCardProps) {
  const cardAspectRatio = 4.75 / 2.75; 
  const cardWidth = "w-48 sm:w-56 md:w-64"; 
  const cardHeight = "h-[16rem] sm:h-[19rem] md:h-[22rem]";

  const cardName = card ? `${card.name}${card.isReversed ? " (Reversed)" : ""}` : "Card";
  const ariaLabel = isFlipped && card 
    ? `Revealed card: ${cardName}` 
    : `Hidden card, click to reveal ${label || ''}${card?.isReversed ? " (possibly reversed)" : ""}`;

  return (
    <div className={cn("flex flex-col items-center space-y-2", className)}>
      {label && <p className="text-lg font-headline text-accent">{label}</p>}
      <div
        className={cn(
          `${cardWidth} ${cardHeight} rounded-lg shadow-xl cursor-pointer perspective`,
          "group" 
        )}
        onClick={onFlip}
        style={{ perspective: '1000px' }}
        role="button"
        aria-pressed={isFlipped}
        aria-label={ariaLabel}
      >
        <div
          className={cn(
            `relative w-full h-full rounded-lg transition-transform duration-700 ease-in-out preserve-3d`,
            isFlipped ? 'rotate-y-180' : ''
          )}
        >
          {/* Card Back */}
          <div className="absolute w-full h-full rounded-lg backface-hidden bg-primary border-2 border-accent flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--accent))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <path d="m14.5 9-5 5"></path><path d="m9.5 9 5 5"></path>
            </svg>
          </div>

          {/* Card Front */}
          <div className="absolute w-full h-full rounded-lg backface-hidden rotate-y-180 bg-card overflow-hidden">
            {card ? (
              <div className="flex flex-col items-center justify-center h-full p-2">
                <div className={cn("relative w-full flex-grow mb-2", card.isReversed ? 'rotate-180' : '')}>
                   <Image
                    src={card.imageUrl}
                    alt={card.name} // Alt text should be the card name, not including reversal status for screen readers on image itself
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain rounded-md"
                    data-ai-hint={card.dataAiHint}
                  />
                </div>
                <p className="text-sm font-semibold text-center text-card-foreground truncate w-full px-1">{cardName}</p>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p>Error: Card not found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Utility classes (ensure these are in globals.css or handled by Tailwind JIT)
// .perspective { perspective: 1000px; }
// .preserve-3d { transform-style: preserve-3d; }
// .rotate-y-180 { transform: rotateY(180deg); } // For card flip
// .rotate-180 { transform: rotate(180deg); } // For reversed card image
// .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
