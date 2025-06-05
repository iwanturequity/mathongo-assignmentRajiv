"use client";

import React from 'react';
import { useSubject } from './subject-context';
import { cn } from '@/lib/utils';
import { Beaker, Brain, Compass, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function DashboardSidebar() {
  const { currentSubject, setCurrentSubject } = useSubject();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const subjects = [
    { 
      name: 'Physics', 
      icon: <Compass className="h-5 w-5" />,
    },
    { 
      name: 'Chemistry', 
      icon: <Beaker className="h-5 w-5" />,
    },
    { 
      name: 'Mathematics', 
      icon: <Brain className="h-5 w-5" />,
    },
  ] as const;

  const SidebarContent = () => (
    <div className="space-y-4 py-4 h-full flex flex-col">
      <div className="px-4 py-2">
        <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight text-primary">
          JEE Main Analytics
        </h2>
      </div>
      <div className="px-3 flex-1">
        <div className="space-y-3">
          {subjects.map((subject) => (
            <Button
              key={subject.name}
              variant="ghost"
              size="lg"
              onClick={() => {
                setCurrentSubject(subject.name);
                setMobileOpen(false);
              }}
              className={cn(
                "w-full justify-start rounded-full transition-all duration-200 hover:bg-primary/10",
                currentSubject === subject.name && "bg-gradient-to-r from-primary/20 to-primary/5 text-primary shadow-sm"
              )}
            >
              <div className={cn(
                "mr-2 rounded-full p-1.5 transition-colors", 
                currentSubject === subject.name 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground"
              )}>
                {subject.icon}
              </div>
              {subject.name}
            </Button>
          ))}
        </div>
      </div>
      <div className="px-3 py-2 mt-auto">
        <div className="bg-card/20 backdrop-blur-lg rounded-lg p-3 shadow-inner border border-white/5 text-xs text-center text-muted-foreground">
          <p>JEE Main 2025</p>
          <p>Preparation Dashboard</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile menu */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="bg-background/70 backdrop-blur">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-background/95 backdrop-blur border-r border-white/5 w-64 p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-background/30 backdrop-blur-md border-r border-white/5 shadow-xl">
        <SidebarContent />
      </div>
    </>
  );
}