"use client";

import { Users } from "lucide-react";

interface HeaderProps {
  onSave?: () => void;
  onDownload?: () => void;
}

export default function Header({ onSave, onDownload }: HeaderProps) {
  return (
    <header id="app-header" className="flex items-center justify-between p-4 bg-card border-b shadow-sm">
      <div className="flex items-center gap-3">
        <Users className="h-7 w-7 text-primary" />
        <h1 className="text-xl md:text-2xl font-bold font-headline text-foreground tracking-tight">
          Qafar Rakaakayak Sheriqah Cokmih Buxa
        </h1>
      </div>
    </header>
  );
}