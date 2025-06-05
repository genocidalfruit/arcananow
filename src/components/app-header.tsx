import { Sparkles } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="py-8 text-center">
      <h1 className="font-headline text-5xl font-bold text-primary flex items-center justify-center gap-3">
        <Sparkles className="h-12 w-12 text-accent" />
        Arcana Now
        <Sparkles className="h-12 w-12 text-accent" />
      </h1>
      <p className="text-accent mt-2 text-lg">Unveil your destiny, one card at a time.</p>
    </header>
  );
}
