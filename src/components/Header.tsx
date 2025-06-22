"use client";

import { Save, Download, Menu, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onSave: () => void;
  onDownload: () => void;
}

export default function Header({ onSave, onDownload }: HeaderProps) {
  return (
    <header id="app-header" className="flex items-center justify-between p-4 bg-card border-b shadow-sm">
      <div className="flex items-center gap-3">
        <Users className="h-7 w-7 text-primary" />
        <h1 className="text-xl md:text-2xl font-bold font-headline text-foreground tracking-tight">
          Nikah Certificate Generator
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onSave}>
          <Save className="h-4 w-4 md:mr-2" />
          <span className="hidden md:inline">Save</span>
        </Button>
        <Button onClick={onDownload}>
          <Download className="h-4 w-4 md:mr-2" />
          <span className="hidden md:inline">Download PDF</span>
        </Button>
      </div>
    </header>
  );
}
