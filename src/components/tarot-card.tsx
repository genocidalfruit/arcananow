"use client";

import Image from 'next/image';
import type { TarotCardData } from '@/lib/tarot-data';
import { cn } from '@/lib/utils';

interface TarotCardProps {
  card?: TarotCardData | null;
  isFlipped: boolean;
  onFlip: () => void;
  label?: string;
  className?: string;
  hasBeenFlipped?: boolean; // Track if card has already been flipped once
}

// Function to get tarot card image URL from Wikimedia Commons
const getCardImageUrl = (card: TarotCardData): string => {
  // Updated map with verified Wikimedia Commons URLs for Rider-Waite-Smith deck
  const cardMap: Record<string, string> = {
    // Major Arcana - Updated URLs
    "The Fool": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/RWS_Tarot_00_Fool.jpg/300px-RWS_Tarot_00_Fool.jpg",
    "The Magician": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/RWS_Tarot_01_Magician.jpg/300px-RWS_Tarot_01_Magician.jpg",
    "The High Priestess": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/300px-RWS_Tarot_02_High_Priestess.jpg",
    "The Empress": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/RWS_Tarot_03_Empress.jpg/300px-RWS_Tarot_03_Empress.jpg",
    "The Emperor": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/RWS_Tarot_04_Emperor.jpg/300px-RWS_Tarot_04_Emperor.jpg",
    "The Hierophant": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/RWS_Tarot_05_Hierophant.jpg/300px-RWS_Tarot_05_Hierophant.jpg",
    "The Lovers": "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_06_Lovers.jpg",
    "The Chariot": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/RWS_Tarot_07_Chariot.jpg/300px-RWS_Tarot_07_Chariot.jpg",
    "Strength": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/RWS_Tarot_08_Strength.jpg/300px-RWS_Tarot_08_Strength.jpg",
    "The Hermit": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/RWS_Tarot_09_Hermit.jpg/300px-RWS_Tarot_09_Hermit.jpg",
    "Wheel of Fortune": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg/300px-RWS_Tarot_10_Wheel_of_Fortune.jpg",
    "Justice": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/RWS_Tarot_11_Justice.jpg/300px-RWS_Tarot_11_Justice.jpg",
    "The Hanged Man": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/RWS_Tarot_12_Hanged_Man.jpg/300px-RWS_Tarot_12_Hanged_Man.jpg",
    "Death": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/RWS_Tarot_13_Death.jpg/300px-RWS_Tarot_13_Death.jpg",
    "Temperance": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/RWS_Tarot_14_Temperance.jpg/300px-RWS_Tarot_14_Temperance.jpg",
    "The Devil": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/RWS_Tarot_15_Devil.jpg/300px-RWS_Tarot_15_Devil.jpg",
    "The Tower": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/RWS_Tarot_16_Tower.jpg/300px-RWS_Tarot_16_Tower.jpg",
    "The Star": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/RWS_Tarot_17_Star.jpg/300px-RWS_Tarot_17_Star.jpg",
    "The Moon": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/RWS_Tarot_18_Moon.jpg/300px-RWS_Tarot_18_Moon.jpg",
    "The Sun": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/RWS_Tarot_19_Sun.jpg/300px-RWS_Tarot_19_Sun.jpg",
    "Judgement": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/RWS_Tarot_20_Judgement.jpg/300px-RWS_Tarot_20_Judgement.jpg",
    "The World": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/RWS_Tarot_21_World.jpg/300px-RWS_Tarot_21_World.jpg",
    
    // Wands - Fixed URLs (using RWS naming convention)
    "Ace of Wands": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Wands01.jpg/300px-Wands01.jpg",
    "Two of Wands": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Wands02.jpg/300px-Wands02.jpg",
    "Three of Wands": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Wands03.jpg/300px-Wands03.jpg",
    "Four of Wands": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Wands04.jpg/300px-Wands04.jpg",
    "Five of Wands": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Wands05.jpg/300px-Wands05.jpg",
    "Six of Wands": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Wands06.jpg/300px-Wands06.jpg",
    "Seven of Wands": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Wands07.jpg/300px-Wands07.jpg",
    "Eight of Wands": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Wands08.jpg/300px-Wands08.jpg",
    "Nine of Wands": "https://upload.wikimedia.org/wikipedia/commons/4/4d/Tarot_Nine_of_Wands.jpg",
    "Ten of Wands": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Wands10.jpg/300px-Wands10.jpg",
    "Page of Wands": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Wands11.jpg/300px-Wands11.jpg",
    "Knight of Wands": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Wands12.jpg/300px-Wands12.jpg",
    "Queen of Wands": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Wands13.jpg/300px-Wands13.jpg",
    "King of Wands": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Wands14.jpg/300px-Wands14.jpg",
    
    // Cups
    "Ace of Cups": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Cups01.jpg/300px-Cups01.jpg",
    "Two of Cups": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Cups02.jpg/300px-Cups02.jpg",
    "Three of Cups": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Cups03.jpg/300px-Cups03.jpg",
    "Four of Cups": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Cups04.jpg/300px-Cups04.jpg",
    "Five of Cups": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cups05.jpg/300px-Cups05.jpg",
    "Six of Cups": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Cups06.jpg/300px-Cups06.jpg",
    "Seven of Cups": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Cups07.jpg/300px-Cups07.jpg",
    "Eight of Cups": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cups08.jpg/300px-Cups08.jpg",
    "Nine of Cups": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Cups09.jpg/300px-Cups09.jpg",
    "Ten of Cups": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Cups10.jpg/300px-Cups10.jpg",
    "Page of Cups": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Cups11.jpg/300px-Cups11.jpg",
    "Knight of Cups": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Cups12.jpg/300px-Cups12.jpg",
    "Queen of Cups": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Cups13.jpg/300px-Cups13.jpg",
    "King of Cups": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Cups14.jpg/300px-Cups14.jpg",
    
    // Swords
    "Ace of Swords": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Swords01.jpg/300px-Swords01.jpg",
    "Two of Swords": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Swords02.jpg/300px-Swords02.jpg",
    "Three of Swords": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Swords03.jpg/300px-Swords03.jpg",
    "Four of Swords": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Swords04.jpg/300px-Swords04.jpg",
    "Five of Swords": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Swords05.jpg/300px-Swords05.jpg",
    "Six of Swords": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Swords06.jpg/300px-Swords06.jpg",
    "Seven of Swords": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Swords07.jpg/300px-Swords07.jpg",
    "Eight of Swords": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Swords08.jpg/300px-Swords08.jpg",
    "Nine of Swords": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Swords09.jpg/300px-Swords09.jpg",
    "Ten of Swords": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Swords10.jpg/300px-Swords10.jpg",
    "Page of Swords": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Swords11.jpg/300px-Swords11.jpg",
    "Knight of Swords": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Swords12.jpg/300px-Swords12.jpg",
    "Queen of Swords": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Swords13.jpg/300px-Swords13.jpg",
    "King of Swords": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Swords14.jpg/300px-Swords14.jpg",
    
    // Pentacles
    "Ace of Pentacles": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Pents01.jpg/300px-Pents01.jpg",
    "Two of Pentacles": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Pents02.jpg/300px-Pents02.jpg",
    "Three of Pentacles": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Pents03.jpg/300px-Pents03.jpg",
    "Four of Pentacles": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Pents04.jpg/300px-Pents04.jpg",
    "Five of Pentacles": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Pents05.jpg/300px-Pents05.jpg",
    "Six of Pentacles": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Pents06.jpg/300px-Pents06.jpg",
    "Seven of Pentacles": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Pents07.jpg/300px-Pents07.jpg",
    "Eight of Pentacles": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Pents08.jpg/300px-Pents08.jpg",
    "Nine of Pentacles": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Pents09.jpg/300px-Pents09.jpg",
    "Ten of Pentacles": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Pents10.jpg/300px-Pents10.jpg",
    "Page of Pentacles": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Pents11.jpg/300px-Pents11.jpg",
    "Knight of Pentacles": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Pents12.jpg/300px-Pents12.jpg",
    "Queen of Pentacles": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Pents13.jpg/300px-Pents13.jpg",
    "King of Pentacles": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Pents14.jpg/300px-Pents14.jpg",
  };

  return cardMap[card.name] || createFallbackCardImage(card.name);
};

// Enhanced fallback function for missing cards
const createFallbackCardImage = (cardName: string): string => {
  // Determine card type and create appropriate styling
  const isMajorArcana = cardName.startsWith("The ") || ["Strength", "Justice", "Temperance", "Death", "Judgement"].includes(cardName);
  const suit = cardName.includes("Cups") ? "♥" : 
               cardName.includes("Wands") ? "♠" : 
               cardName.includes("Swords") ? "♦" :
               cardName.includes("Pentacles") ? "♣" : "★";
  const bgColor = isMajorArcana ? "#4a148c" : "#1565c0";
  const accentColor = isMajorArcana ? "#f3e5f5" : "#e3f2fd";
  
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 500" fill="none">
      <rect width="300" height="500" fill="${bgColor}" rx="15"/>
      <rect x="10" y="10" width="280" height="480" fill="none" stroke="${accentColor}" stroke-width="2" rx="10"/>
      <circle cx="150" cy="120" r="50" fill="none" stroke="${accentColor}" stroke-width="3"/>
      <text x="150" y="130" text-anchor="middle" fill="${accentColor}" font-family="serif" font-size="36">${suit}</text>
      <rect x="30" y="200" width="240" height="120" fill="rgba(255,255,255,0.1)" rx="10"/>
      <text x="150" y="235" text-anchor="middle" fill="${accentColor}" font-family="serif" font-size="16" font-weight="bold">${cardName}</text>
      <text x="150" y="260" text-anchor="middle" fill="${accentColor}" font-family="serif" font-size="12">TAROT CARD</text>
      <text x="150" y="290" text-anchor="middle" fill="${accentColor}" font-family="serif" font-size="10">Image Loading...</text>
      <circle cx="150" cy="380" r="30" fill="none" stroke="${accentColor}" stroke-width="2"/>
      <path d="M135 380 L150 365 L165 380 L150 395 Z" fill="${accentColor}"/>
    </svg>
  `)}`;
};

// Updated card back design without top/bottom diamonds and with better boundary containment
// Simple, elegant card back design that fits perfectly

export function TarotCard({ 
  card, 
  isFlipped, 
  onFlip, 
  label, 
  className, 
  hasBeenFlipped = false 
}: TarotCardProps) {
  const cardWidth = "w-48 sm:w-56 md:w-64";
  const cardHeight = "h-[16rem] sm:h-[19rem] md:h-[22rem]";

  const cardName = card ? `${card.name}${card.isReversed ? " (Reversed)" : ""}` : "Card";
  const ariaLabel = isFlipped && card
    ? `Revealed card: ${cardName}`
    : hasBeenFlipped 
      ? `Card already revealed: ${cardName}`
      : `Hidden card, click to reveal ${label || ''}${card?.isReversed ? " (possibly reversed)" : ""}`;

  const handleCardClick = () => {
    // Only allow flipping if card hasn't been flipped before and isn't currently flipped
    if (!hasBeenFlipped && !isFlipped) {
      onFlip();
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    if (card && !target.src.startsWith('data:')) {
      // Try fallback image first
      console.warn(`Failed to load image for ${card.name}, using fallback`);
      target.src = createFallbackCardImage(card.name);
    }
  };

  return (
    <div className={cn("flex flex-col items-center space-y-2", className)}>
      {label && <p className="text-lg font-headline text-accent">{label}</p>}
      <div
        className={cn(
          `${cardWidth} ${cardHeight} rounded-lg shadow-xl`,
          "group transition-all duration-200",
          // Only show pointer cursor if card can still be flipped
          !hasBeenFlipped && !isFlipped ? "cursor-pointer hover:shadow-2xl hover:scale-105" : "cursor-default",
          hasBeenFlipped && !isFlipped ? "opacity-75" : ""
        )}
        onClick={handleCardClick}
        style={{ perspective: '1000px' }}
        role="button"
        aria-pressed={isFlipped}
        aria-label={ariaLabel}
        aria-disabled={hasBeenFlipped}
      >
        <div
          className={cn(
            `relative w-full h-full rounded-lg transition-transform duration-700 ease-in-out`,
            "[transform-style:preserve-3d]",
            isFlipped ? '[transform:rotateY(180deg)]' : ''
          )}
        >
          {/* Card Back - Now with cool SVG design */}
          <div className="absolute w-full h-full rounded-lg [backface-visibility:hidden] overflow-hidden border border-amber-100">
            <img
              src="/images/6510770.jpg"
              alt="Tarot card back"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Card Front */}
          <div className="absolute w-full h-full rounded-lg [backface-visibility:hidden] [transform:rotateY(180deg)] bg-slate-900 overflow-hidden border-2 border-accent">
            {card ? (
              <div className="flex flex-col items-center justify-center h-full p-2">
                <div className={cn("relative w-full flex-grow mb-2", card.isReversed ? 'rotate-180' : '')}>
                  <Image
                    src={getCardImageUrl(card)}
                    alt={card.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain rounded-md"
                    data-ai-hint={card.dataAiHint}
                    onError={handleImageError}
                    priority={isFlipped} // Prioritize loading for visible cards
                  />
                </div>
                <p className="text-sm font-semibold text-center text-card-foreground truncate w-full px-1">
                  {cardName}
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p>Error: Card not found</p>  
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Visual indicator for already flipped cards */}
      {hasBeenFlipped && !isFlipped && (
        <p className="text-xs text-muted-foreground italic">Already revealed</p>
      )}
    </div>
  );
}