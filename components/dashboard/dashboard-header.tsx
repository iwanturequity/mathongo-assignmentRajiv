"use client";

import React from 'react';
import { useSubject } from './subject-context';
import { ModeToggle } from '@/components/mode-toggle';
import { Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function DashboardHeader() {
  const { currentSubject } = useSubject();

  return (
    <header className="sticky top-0 z-30 w-full border-b border-white/5 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <div className="md:hidden w-8"></div>
        <h1 className="text-xl font-semibold tracking-tight flex-1">
          {currentSubject}
          <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
            JEE Main 2025
          </Badge>
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive"></span>
          </Button>
          <ModeToggle />
          <Button variant="outline" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}