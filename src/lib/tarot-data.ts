
export interface TarotCardData {
  id: string;
  name: string;
  arcana: 'Major' | 'Minor';
  suit?: 'Wands' | 'Cups' | 'Swords' | 'Pentacles';
  imageUrl: string;
  dataAiHint: string; // For image generation hints
  keywords?: string[]; // Optional keywords for simpler interpretations or UI hints
  isReversed?: boolean; // Indicates if the card is drawn reversed
}

const majorArcana: Omit<TarotCardData, 'isReversed'>[] = [
  { id: 'MA0', name: 'The Fool', arcana: 'Major', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'jester abyss' },
  { id: 'MA1', name: 'The Magician', arcana: 'Major', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'wizard tools' },
  { id: 'MA2', name: 'The High Priestess', arcana: 'Major', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'mystic scroll' },
  { id: 'MA3', name: 'The Empress', arcana: 'Major', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'queen nature' },
  { id: 'MA4', name: 'The Emperor', arcana: 'Major', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'king throne' },
  { id: 'MA5', name: 'The Hierophant', arcana: 'Major', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'pope keys' },
  { id: 'MA6', name: 'The Lovers', arcana: 'Major', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'couple angel' },
  { id: 'MA7', name: 'The Chariot', arcana: 'Major', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'warrior sphinx' },
  { id: 'MA8', name: 'Strength', arcana: 'Major', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'woman lion' },
  { id: 'MA9', name: 'The Hermit', arcana: 'Major', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'elder lantern' },
  { id: 'MA10', name: 'Wheel of Fortune', arcana: 'Major', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'spinning wheel' },
  { id: 'MA11', name: 'Justice', arcana: 'Major', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'scales sword' },
  { id: 'MA12', name: 'The Hanged Man', arcana: 'Major', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'suspended figure' },
  { id: 'MA13', name: 'Death', arcana: 'Major', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'skeleton horse' },
  { id: 'MA14', name: 'Temperance', arcana: 'Major', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'angel water' },
  { id: 'MA15', name: 'The Devil', arcana: 'Major', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'demon chains' },
  { id: 'MA16', name: 'The Tower', arcana: 'Major', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'falling tower' },
  { id: 'MA17', name: 'The Star', arcana: 'Major', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'woman stars' },
  { id: 'MA18', name: 'The Moon', arcana: 'Major', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'moon dogs' },
  { id: 'MA19', name: 'The Sun', arcana: 'Major', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'sun child' },
  { id: 'MA20', name: 'Judgement', arcana: 'Major', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'angel resurrection' },
  { id: 'MA21', name: 'The World', arcana: 'Major', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'dancer wreath' },
];

const minorArcana: Omit<TarotCardData, 'isReversed'>[] = [
  { id: 'MIW1', name: 'Ace of Wands', arcana: 'Minor', suit: 'Wands', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'hand wand' },
  { id: 'MIC1', name: 'Ace of Cups', arcana: 'Minor', suit: 'Cups', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'hand cup' },
  { id: 'MIS1', name: 'Ace of Swords', arcana: 'Minor', suit: 'Swords', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'hand sword' },
  { id: 'MIP1', name: 'Ace of Pentacles', arcana: 'Minor', suit: 'Pentacles', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'hand pentacle' },
  { id: 'MIW2', name: 'Two of Wands', arcana: 'Minor', suit: 'Wands', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'man wands' },
  { id: 'MIC2', name: 'Two of Cups', arcana: 'Minor', suit: 'Cups', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'couple cups' },
  { id: 'MIS2', name: 'Two of Swords', arcana: 'Minor', suit: 'Swords', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'blindfolded swords' },
  { id: 'MIP2', name: 'Two of Pentacles', arcana: 'Minor', suit: 'Pentacles', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'juggling pentacles' },
  // Example of adding more cards (up to King for each suit)
  // Wands
  { id: 'MIW3', name: 'Three of Wands', arcana: 'Minor', suit: 'Wands', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'ships sea' },
  { id: 'MIW4', name: 'Four of Wands', arcana: 'Minor', suit: 'Wands', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'celebration wands' },
  { id: 'MIW5', name: 'Five of Wands', arcana: 'Minor', suit: 'Wands', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'conflict wands' },
  { id: 'MIW6', name: 'Six of Wands', arcana: 'Minor', suit: 'Wands', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'victory wreath' },
  { id: 'MIW7', name: 'Seven of Wands', arcana: 'Minor', suit: 'Wands', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'defense stand' },
  { id: 'MIW8', name: 'Eight of Wands', arcana: 'Minor', suit: 'Wands', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'flying wands' },
  { id: 'MIW9', name: 'Nine of Wands', arcana: 'Minor', suit: 'Wands', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'wounded resilience' },
  { id: 'MIW10', name: 'Ten of Wands', arcana: 'Minor', suit: 'Wands', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'burdened wands' },
  { id: 'MIWP', name: 'Page of Wands', arcana: 'Minor', suit: 'Wands', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'youthful messenger' },
  { id: 'MIWK', name: 'Knight of Wands', arcana: 'Minor', suit: 'Wands', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'action journey' },
  { id: 'MIWQ', name: 'Queen of Wands', arcana: 'Minor', suit: 'Wands', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'confident queen' },
  { id: 'MIWKI', name: 'King of Wands', arcana: 'Minor', suit: 'Wands', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'leader vision' },
  // Cups
  { id: 'MIC3', name: 'Three of Cups', arcana: 'Minor', suit: 'Cups', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'friendship celebration' },
  // ... (add 4-10, Page, Knight, Queen, King for Cups)
  // Swords
  { id: 'MIS3', name: 'Three of Swords', arcana: 'Minor', suit: 'Swords', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'heartbreak sorrow' },
  // ... (add 4-10, Page, Knight, Queen, King for Swords)
  // Pentacles
  { id: 'MIP3', name: 'Three of Pentacles', arcana: 'Minor', suit: 'Pentacles', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'teamwork skill' },
  // ... (add 4-10, Page, Knight, Queen, King for Pentacles)
];


export const fullTarotDeck: TarotCardData[] = [...majorArcana, ...minorArcana].map(card => ({...card, isReversed: false}));

// Fisher-Yates shuffle algorithm
export function shuffleDeck(deck: TarotCardData[]): TarotCardData[] {
  const shuffled = deck.map(card => ({ ...card })); // Create a new array of new card objects
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function drawCards(deck: TarotCardData[], count: number): TarotCardData[] {
  // Take a slice and then map to new objects to assign reversal status
  return deck.slice(0, count).map(card => ({
    ...card,
    isReversed: Math.random() < 0.5 // 50% chance of being reversed
  }));
}
