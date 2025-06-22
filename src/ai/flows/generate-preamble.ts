'use server';

/**
 * @fileOverview Generates a personalized preamble for a Nikah certificate based on bride and groom details.
 *
 * - generatePreamble - A function that generates the preamble.
 * - GeneratePreambleInput - The input type for the generatePreamble function.
 * - GeneratePreambleOutput - The return type for the generatePreamble function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePreambleInputSchema = z.object({
  groomName: z.string().describe("Groom's full name."),
  brideName: z.string().describe("Bride's full name."),
  date: z.string().describe('Date of the Nikah ceremony (e.g., January 1, 2024).'),
  place: z.string().describe('Place where the Nikah ceremony is held.'),
  additionalDetails: z
    .string()
    .optional()
    .describe('Any other relevant details about the couple or ceremony.'),
});

export type GeneratePreambleInput = z.infer<typeof GeneratePreambleInputSchema>;

const GeneratePreambleOutputSchema = z.object({
  preamble: z.string().describe('The generated personalized preamble for the Nikah certificate.'),
});

export type GeneratePreambleOutput = z.infer<typeof GeneratePreambleOutputSchema>;

export async function generatePreamble(input: GeneratePreambleInput): Promise<GeneratePreambleOutput> {
  return generatePreambleFlow(input);
}

const generatePreamblePrompt = ai.definePrompt({
  name: 'generatePreamblePrompt',
  input: {schema: GeneratePreambleInputSchema},
  output: {schema: GeneratePreambleOutputSchema},
  prompt: `You are an expert in writing Nikah certificate preambles, specializing in creating personalized and meaningful messages.

  Based on the following details, generate a unique and heartfelt preamble for the Nikah certificate:

  Groom's Name: {{{groomName}}}
  Bride's Name: {{{brideName}}}
  Date: {{{date}}}
  Place: {{{place}}}
  Additional Details: {{{additionalDetails}}}

  The preamble should be respectful, and incorporate relevant details. It should reflect the significance of the marriage in Islam.
  The preamble should be no more than 150 words.
  `,
});

const generatePreambleFlow = ai.defineFlow(
  {
    name: 'generatePreambleFlow',
    inputSchema: GeneratePreambleInputSchema,
    outputSchema: GeneratePreambleOutputSchema,
  },
  async input => {
    const {output} = await generatePreamblePrompt(input);
    return output!;
  }
);
