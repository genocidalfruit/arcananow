"use client";

import { useState, useEffect, useCallback } from 'react';
import { AppHeader } from '@/components/app-header';
import { TarotCard } from '@/components/tarot-card';
import { Button } from '@/components/ui/button';
import { Card as UICard, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fullTarotDeck, shuffleDeck, drawCards, type TarotCardData } from '@/lib/tarot-data';
import { interpretTarotCards, type InterpretTarotCardsInput } from '@/ai/flows/interpret-tarot-cards';
import { LoadingSpinner } from '@/components/loading-spinner';
import { Wand2, Dices, BookOpenText } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const CARD_COUNT = 3;
const SPREAD_LABELS = ["Past", "Present", "Future"];

export default function HomePage() {
  const [drawnCards, setDrawnCards] = useState<(TarotCardData | null)[]>(Array(CARD_COUNT).fill(null));
  const [flippedStates, setFlippedStates] = useState<boolean[]>(Array(CARD_COUNT).fill(false));
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [isLoadingInterpretation, setIsLoadingInterpretation] = useState(false);
  const [shuffledDeck, setShuffledDeck] = useState<TarotCardData[]>([]);
  const [hasDrawn, setHasDrawn] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize the deck once on mount
    setShuffledDeck(shuffleDeck(fullTarotDeck));
  }, []);

  const handleShuffleAndDraw = useCallback(() => {
    const newShuffledDeck = shuffleDeck(fullTarotDeck); // Re-shuffle the full deck
    setShuffledDeck(newShuffledDeck);
    const newDrawnCards = drawCards(newShuffledDeck, CARD_COUNT);
    setDrawnCards(newDrawnCards);
    setFlippedStates(Array(CARD_COUNT).fill(false));
    setInterpretation(null);
    setHasDrawn(true);
    toast({
      title: "Deck Shuffled & Cards Drawn",
      description: "Your cards are ready to be revealed.",
    });
  }, [toast]);

  const handleFlipCard = (index: number) => {
    if (!drawnCards[index]) return; // Can't flip an empty slot
    setFlippedStates(prev => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const allCardsFlipped = flippedStates.every(state => state) && drawnCards.every(card => card !== null);

  const handleInterpretSpread = async () => {
    if (!allCardsFlipped) {
      toast({
        title: "Reveal All Cards",
        description: "Please flip all cards before seeking an interpretation.",
        variant: "destructive",
      });
      return;
    }

    const cardInputs = drawnCards.reduce((acc, card, index) => {
      if (card) {
        acc[`card${index + 1}` as keyof InterpretTarotCardsInput] = card.name;
      }
      return acc;
    }, {} as Partial<InterpretTarotCardsInput>) as InterpretTarotCardsInput;

    if (Object.keys(cardInputs).length !== CARD_COUNT) {
        toast({
            title: "Error",
            description: "Not enough cards to interpret.",
            variant: "destructive",
        });
        return;
    }
    
    setIsLoadingInterpretation(true);
    setInterpretation(null); 
    try {
      const result = await interpretTarotCards(cardInputs);
      setInterpretation(result.interpretation);
      toast({
        title: "Interpretation Received",
        description: "Your tarot spread has been interpreted.",
      });
    } catch (error) {
      console.error("Error interpreting tarot cards:", error);
      setInterpretation("Sorry, an error occurred while interpreting your cards. Please try again.");
      toast({
        title: "Interpretation Error",
        description: "Could not get interpretation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingInterpretation(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 md:p-8 bg-background text-foreground font-body">
      <AppHeader />

      <div className="my-8">
        <Button 
          size="lg" 
          onClick={handleShuffleAndDraw} 
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-headline text-xl px-8 py-6 shadow-lg transform hover:scale-105 transition-transform duration-150"
          aria-label="Shuffle deck and draw new cards"
        >
          <Dices className="mr-2 h-6 w-6" />
          {hasDrawn ? "Draw Again" : "Shuffle & Draw"}
        </Button>
      </div>

      {hasDrawn && (
        <section aria-label="Tarot card spread" className="mb-12 w-full max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start justify-center">
            {drawnCards.map((card, index) => (
              <TarotCard
                key={card ? card.id : `empty-${index}`}
                card={card}
                isFlipped={flippedStates[index]}
                onFlip={() => handleFlipCard(index)}
                label={SPREAD_LABELS[index]}
                className="mx-auto"
              />
            ))}
          </div>
        </section>
      )}

      {hasDrawn && allCardsFlipped && !isLoadingInterpretation && (
        <div className="my-8">
          <Button 
            size="lg" 
            onClick={handleInterpretSpread} 
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-headline text-xl px-8 py-6 shadow-lg transform hover:scale-105 transition-transform duration-150"
            aria-label="Interpret the revealed tarot spread"
          >
            <BookOpenText className="mr-2 h-6 w-6" />
            Interpret Spread
          </Button>
        </div>
      )}
      
      {isLoadingInterpretation && (
        <div className="my-8 flex flex-col items-center space-y-2">
          <LoadingSpinner size={48} />
          <p className="text-accent text-lg font-headline">Consulting the digital ether...</p>
        </div>
      )}

      {interpretation && !isLoadingInterpretation && (
        <UICard className="w-full max-w-3xl my-8 bg-card shadow-2xl border-primary/50">
          <CardHeader className="border-b border-primary/30">
            <CardTitle className="text-3xl font-headline text-primary flex items-center gap-2">
              <Wand2 className="h-8 w-8" />
              Your Reading
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-lg leading-relaxed whitespace-pre-wrap text-card-foreground">
              {interpretation}
            </p>
          </CardContent>
        </UICard>
      )}
      
      {!hasDrawn && (
        <div className="text-center mt-12 p-8 border-2 border-dashed border-muted-foreground/50 rounded-lg max-w-md mx-auto">
            <Dices className="h-16 w-16 text-muted-foreground/70 mx-auto mb-4" />
            <h2 className="text-2xl font-headline text-muted-foreground mb-2">Ready to explore your path?</h2>
            <p className="text-muted-foreground/80">Click the "Shuffle & Draw" button to begin your tarot reading.</p>
        </div>
      )}

    </div>
  );
}
