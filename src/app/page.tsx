"use client";

import { useState, useEffect, useCallback } from 'react';
import { AppHeader } from '@/components/app-header';
import { TarotCard } from '@/components/tarot-card';
import { Button } from '@/components/ui/button';
import { Card as UICard, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fullTarotDeck, shuffleDeck, drawCards, type TarotCardData } from '@/lib/tarot-data';
import { interpretTarotCards, type InterpretTarotCardsInput } from '@/ai/flows/interpret-tarot-cards';
import { LoadingSpinner } from '@/components/loading-spinner';
import { Wand2, Dices, BookOpenText } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface SpreadConfiguration {
  value: string;
  label: string;
  cardCount: number;
  labels: string[];
}

const SPREAD_CONFIGS: Record<string, SpreadConfiguration> = {
  threeCard: {
    value: 'threeCard',
    label: 'Three Card Spread',
    cardCount: 3,
    labels: ["Past", "Present", "Future"],
  },
  pentagram: {
    value: 'pentagram',
    label: 'Pentagram Spread',
    cardCount: 5,
    labels: ["1. Earth (Present)", "2. Air (Intellect)", "3. Fire (Action)", "4. Water (Emotions)", "5. Spirit (Guidance)"],
  },
  celticCross: {
    value: 'celticCross',
    label: 'Celtic Cross Spread',
    cardCount: 10,
    labels: [
      "1. Present/Situation",
      "2. Challenge/Obstacle",
      "3. Past/Foundation",
      "4. Future (Immediate)",
      "5. Conscious/Goal",
      "6. Unconscious/Factors",
      "7. Your Influence/Advice",
      "8. External Influences",
      "9. Hopes and Fears",
      "10. Outcome (Overall)",
    ],
  },
};

const SPREAD_OPTIONS = Object.values(SPREAD_CONFIGS).map(config => ({
  value: config.value,
  label: config.label,
}));

export default function HomePage() {
  const [selectedSpread, setSelectedSpread] = useState<string>(SPREAD_OPTIONS[0].value);
  const currentSpreadConfig = SPREAD_CONFIGS[selectedSpread];

  const [drawnCards, setDrawnCards] = useState<TarotCardData[]>([]);
  const [flippedStates, setFlippedStates] = useState<boolean[]>([]);
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [isLoadingInterpretation, setIsLoadingInterpretation] = useState(false);
  const [shuffledDeck, setShuffledDeck] = useState<TarotCardData[]>([]);
  const [hasDrawn, setHasDrawn] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setShuffledDeck(shuffleDeck(fullTarotDeck));
  }, []);

  useEffect(() => {
    const newConfig = SPREAD_CONFIGS[selectedSpread];
    setDrawnCards(Array(newConfig.cardCount).fill(null).map(() => ({
        id: '', name: '', arcana: 'Major', imageUrl: '', dataAiHint: '', isReversed: false
    })));
    setFlippedStates(Array(newConfig.cardCount).fill(false));
    setInterpretation(null);
    setHasDrawn(false);
    setIsLoadingInterpretation(false);
  }, [selectedSpread]);

  const handleShuffleAndDraw = useCallback(() => {
    const spreadConfig = SPREAD_CONFIGS[selectedSpread];
    const newShuffledDeck = shuffleDeck(fullTarotDeck);
    setShuffledDeck(newShuffledDeck);
    const newDrawnCards = drawCards(newShuffledDeck, spreadConfig.cardCount);
    setDrawnCards(newDrawnCards);
    setFlippedStates(Array(spreadConfig.cardCount).fill(false));
    setInterpretation(null);
    setHasDrawn(true);
    setIsLoadingInterpretation(false);
    toast({
      title: "Deck Shuffled & Cards Drawn",
      description: `Your ${spreadConfig.label} cards are ready. Some may be reversed.`,
    });
  }, [selectedSpread, toast]);

  const handleFlipCard = (index: number) => {
    if (!drawnCards[index] || !drawnCards[index].id) return;
    setFlippedStates(prev => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const allCardsFlipped =
    drawnCards.length > 0 &&
    drawnCards.every(card => card && typeof card.id === 'string' && card.id !== '') &&
    flippedStates.length === drawnCards.length &&
    flippedStates.every(state => state === true);

  const handleInterpretSpread = async () => {
    if (!allCardsFlipped) {
      toast({
        title: "Reveal All Cards",
        description: "Please flip all cards before seeking an interpretation.",
        variant: "destructive",
      });
      return;
    }

    const cardDetailsForAI = drawnCards
      .map((card, index) => {
        if (card && card.id) {
          return {
            name: card.name,
            positionLabel: currentSpreadConfig.labels[index],
            isReversed: !!card.isReversed,
          };
        }
        return null;
      })
      .filter((c): c is { name: string; positionLabel: string; isReversed: boolean } => c !== null);

    if (cardDetailsForAI.length !== currentSpreadConfig.cardCount) {
      toast({
        title: "Error",
        description: "Not enough valid cards to interpret for the selected spread.",
        variant: "destructive",
      });
      return;
    }

    const aiInput: InterpretTarotCardsInput = {
      spreadType: currentSpreadConfig.label,
      cards: cardDetailsForAI,
    };

    setIsLoadingInterpretation(true);
    setInterpretation(null);
    try {
      const result = await interpretTarotCards(aiInput);
      setInterpretation(result.interpretation);
      toast({
        title: "Interpretation Received",
        description: `Your ${currentSpreadConfig.label} has been interpreted.`,
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

      <div className="my-8 flex flex-col sm:flex-row items-center gap-4">
        <Select value={selectedSpread} onValueChange={setSelectedSpread} disabled={isLoadingInterpretation}>
          <SelectTrigger className="w-full sm:w-[240px] h-12 text-base">
            <SelectValue placeholder="Select a spread" />
          </SelectTrigger>
          <SelectContent>
            {SPREAD_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          size="lg"
          onClick={handleShuffleAndDraw}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-headline text-xl px-8 py-3 h-12 shadow-lg transform hover:scale-105 transition-transform duration-150 w-full sm:w-auto"
          aria-label={`Shuffle deck and draw ${currentSpreadConfig.cardCount} cards for ${currentSpreadConfig.label}`}
          disabled={isLoadingInterpretation}
        >
          <Dices className="mr-2 h-6 w-6" />
          {hasDrawn ? "Draw Again" : "Shuffle & Draw"}
        </Button>
      </div>

      {hasDrawn && drawnCards.length > 0 && drawnCards[0]?.id && (
        <section aria-label={`Tarot card spread: ${currentSpreadConfig.label}`} className="mb-4 w-full max-w-5xl">
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 w-full">
            {drawnCards.map((card, index) => (
              <TarotCard
                key={card && card.id ? `${card.id}-${index}-${card.isReversed}` : `placeholder-${index}-${selectedSpread}`}
                card={card}
                isFlipped={flippedStates[index]}
                onFlip={() => handleFlipCard(index)}
                label={currentSpreadConfig.labels[index]}
                className="flex-1 min-w-[180px] max-w-[220px] mx-auto"
              />
            ))}
          </div>
        </section>
      )}

      {hasDrawn && allCardsFlipped && !isLoadingInterpretation && !interpretation && (
        <div className="mt-4 mb-8">
          <Button
            size="lg"
            onClick={handleInterpretSpread}
            disabled={isLoadingInterpretation}
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-headline text-xl px-8 py-6 shadow-lg transform hover:scale-105 transition-transform duration-150 mt-20 mb-10"
            aria-label={`Interpret the revealed ${currentSpreadConfig.label}`}
          >
            <BookOpenText className="mr-2 h-6 w-6" />
            Interpret Spread
          </Button>
        </div>
      )}

      {isLoadingInterpretation && (
        <div className="my-8 flex flex-col items-center space-y-2">
          <LoadingSpinner size={48} />
          <p className="text-accent text-lg font-headline">Consulting the digital ether for your {currentSpreadConfig.label}...</p>
        </div>
      )}

      {interpretation && !isLoadingInterpretation && (
        <UICard className="w-full max-w-3xl my-8 bg-card shadow-2xl border-primary/50">
          <CardHeader className="border-b border-primary/30">
            <CardTitle className="text-3xl font-headline text-primary flex items-center gap-2">
              <Wand2 className="h-8 w-8" />
              Your {currentSpreadConfig.label} Reading
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
          <p className="text-muted-foreground/80">Select a spread type and click "Shuffle & Draw" to begin.</p>
        </div>
      )}
    </div>
  );
}
