export interface TarotCardData {
  id: string;
  name: string;
  arcana: 'Major' | 'Minor';
  suit?: 'Wands' | 'Cups' | 'Swords' | 'Pentacles';
  imageUrl: string;
  dataAiHint: string; // For image generation hints
  keywords?: string[]; // Optional keywords for simpler interpretations or UI hints
}

const majorArcana: TarotCardData[] = [
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

// For brevity, only including Aces for Minor Arcana. A full app would have all 56.
const minorArcana: TarotCardData[] = [
  { id: 'MIW1', name: 'Ace of Wands', arcana: 'Minor', suit: 'Wands', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'hand wand' },
  { id: 'MIC1', name: 'Ace of Cups', arcana: 'Minor', suit: 'Cups', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'hand cup' },
  { id: 'MIS1', name: 'Ace of Swords', arcana: 'Minor', suit: 'Swords', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'hand sword' },
  { id: 'MIP1', name: 'Ace of Pentacles', arcana: 'Minor', suit: 'Pentacles', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'hand pentacle' },
  // Add more minor arcana cards here...
  // For example: Two of Wands, Three of Wands ... King of Wands, etc. for all suits.
  // To complete the 78 card deck, you would add 13 more cards for each of the 4 suits.
  // For now, we'll use a smaller deck for easier example.
  { id: 'MIW2', name: 'Two of Wands', arcana: 'Minor', suit: 'Wands', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'man wands' },
  { id: 'MIC2', name: 'Two of Cups', arcana: 'Minor', suit: 'Cups', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'couple cups' },
  { id: 'MIS2', name: 'Two of Swords', arcana: 'Minor', suit: 'Swords', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'blindfolded swords' },
  { id: 'MIP2', name: 'Two of Pentacles', arcana: 'Minor', suit: 'Pentacles', imageUrl: 'https://placehold.co/275x475/673AB7/D1C4E9.png', dataAiHint: 'juggling pentacles' },
];


export const fullTarotDeck: TarotCardData[] = [...majorArcana, ...minorArcana];

// Fisher-Yates shuffle algorithm
export function shuffleDeck(deck: TarotCardData[]): TarotCardData[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function drawCards(deck: TarotCardData[], count: number): TarotCardData[] {
  return deck.slice(0, count);
}
