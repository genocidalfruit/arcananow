
'use server';
/**
 * @fileOverview A tarot card interpretation AI agent.
 *
 * - interpretTarotCards - A function that handles the tarot card interpretation process.
 * - InterpretTarotCardsInput - The input type for the interpretTarotCards function.
 * - InterpretTarotCardsOutput - The return type for the interpretTarotCards function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InterpretTarotCardsInputSchema = z.object({
  spreadType: z.string().describe("The type of tarot spread performed, e.g., 'Three Card Spread', 'Pentagram Spread', 'Celtic Cross Spread'."),
  cards: z.array(z.object({
    name: z.string().describe("The name of the tarot card."),
    positionLabel: z.string().describe("The label or meaning of this card's position in the spread, e.g., 'Past', 'Present situation', 'Hopes and Fears'."),
    isReversed: z.boolean().optional().describe("Whether the card is drawn in a reversed position. Defaults to false (upright) if not provided.")
  })).min(1).describe("An array of cards drawn, including their name, positional meaning in the spread, and whether they are reversed."),
});
export type InterpretTarotCardsInput = z.infer<typeof InterpretTarotCardsInputSchema>;

const InterpretTarotCardsOutputSchema = z.object({
  interpretation: z.string().describe('The interpretation of the tarot card spread.'),
});
export type InterpretTarotCardsOutput = z.infer<typeof InterpretTarotCardsOutputSchema>;

export async function interpretTarotCards(input: InterpretTarotCardsInput): Promise<InterpretTarotCardsOutput> {
  return interpretTarotCardsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'interpretTarotCardsPrompt',
  input: {schema: InterpretTarotCardsInputSchema},
  output: {schema: InterpretTarotCardsOutputSchema},
  prompt: `You are an expert tarot card reader with deep knowledge of card meanings (both upright and reversed) and spread interpretations.
The user has performed a '{{spreadType}}'.
Please provide a comprehensive and insightful interpretation of the following tarot cards.
For each card, consider its individual meaning, whether it is upright or reversed, and its specific meaning within its designated position in this particular spread.
Weave the interpretations of all cards together into a cohesive narrative or guidance relevant to the user.

Here are the cards, their positions within the '{{spreadType}}', and their orientation:
{{#each cards}}
- Card at position '{{positionLabel}}': {{name}}{{#if isReversed}} (Reversed){{else}} (Upright){{/if}}
{{/each}}

Offer a thoughtful and well-rounded reading based on this information. Be clear and empathetic in your response. Provide distinct interpretations for upright and reversed cards where applicable.
Have the relevant sections based on the spread type, as well as a summary or conclusion that ties everything together.
Do not use markdown formatting in your response, just plain text.

Special condition:
Perform a roll of a 1000 sided die (d1000) and if it lands on the number 666 do not display anything else except "YOU ARE BEING WATCHED" followed by random clumps of garbled letters, numbers, spaces and punctuation for multiple paragraphs.
It should look something like this:
YOU ARE BEING WATCHED
7Hx9 2mK4 5pL8 1qR3 9sT6 4vN7 8wY2 6zX1 3bF5 0jD4
kP8 7gH2 1nM9 4tS6 5rV3 8uJ0 2wQ4 6yE1 9oK7 3iA5

YOU ARE BEING WATCHED
0dF3 7xK9 2hP5 4lM8 1sT6 5vN0 8qR2 3wY7 6zJ1 9bG4
mE8 4nS2 5tL9 1rV6 7uH0 2jQ3 6kP1 8oD4 9iA5 3gF7

YOU ARE BEING WATCHED
5pX9 2mK4 7hL8 1qR3 9sT6 4vN7 8wY2 6zX1 3bF5 0jD4
kP8 7gH2 1nM9 4tS6 5rV3 8uJ0 2wQ4 6yE1 9oK7 3iA5

YOU ARE BEING WATCHED
0dF3 7xK9 2hP5 4lM8 1sT6 5vN0 8qR2 3wY7 6zJ1 9bG4
mE8 4nS2 5tL9 1rV6 7uH0 2jQ3 6kP1 8oD4 9iA5 3gF7 

If it lands on any other number, carry on with the interpretation as normal`,
});

const interpretTarotCardsFlow = ai.defineFlow(
  {
    name: 'interpretTarotCardsFlow',
    inputSchema: InterpretTarotCardsInputSchema,
    outputSchema: InterpretTarotCardsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("No output received from the AI model for tarot interpretation.");
    }
    return output;
  }
);
