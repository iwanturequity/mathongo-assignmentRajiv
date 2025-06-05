"use client";

import React from 'react';
import { Chapter } from '@/lib/types';
import { ArrowDown, ArrowUp, BookOpen, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ChapterGridProps {
  chapters: Chapter[];
}

export default function ChapterGrid({ chapters }: ChapterGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {chapters.length === 0 ? (
        <div className="col-span-full flex justify-center py-10">
          <div className="text-center space-y-2">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="text-lg font-medium">No chapters found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters to find what you're looking for.
            </p>
          </div>
        </div>
      ) : (
        chapters.map((chapter) => {
          // Calculate total questions
          const totalQuestions = Object.values(chapter.yearWiseQuestionCount).reduce((sum, count) => sum + count, 0);
          const solvedPercentage = Math.round((chapter.questionSolved / totalQuestions) * 100);
          
          // Question trend (2024 to 2025)
          const questionCount2024 = chapter.yearWiseQuestionCount[2024] || 0;
          const questionCount2025 = chapter.yearWiseQuestionCount[2025] || 0;
          const trendIncreasing = questionCount2025 > questionCount2024;
          
          return (
            <Card 
              key={chapter.chapter} 
              className={cn(
                "overflow-hidden border-white/5 backdrop-blur-md bg-card/30 hover:bg-card/40 transition-all group",
                chapter.isWeakChapter && "ring-1 ring-yellow-500/30"
              )}
            >
              <CardHeader className="relative p-4 space-y-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-base text-card-foreground truncate">
                    {chapter.chapter}
                  </h3>
                  {chapter.isWeakChapter && (
                    <Badge 
                      variant="outline" 
                      className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 flex items-center gap-1"
                    >
                      <Lightbulb className="h-3 w-3" />
                      Weak
                    </Badge>
                  )}
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className="truncate">{chapter.unit} • {chapter.class}</span>
                </div>
                
                {/* Status badge */}
                <Badge 
                  className={cn(
                    "absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                    chapter.status === "Completed" && "bg-green-500",
                    chapter.status === "In Progress" && "bg-amber-500",
                    chapter.status === "Not Started" && "bg-red-500"
                  )}
                >
                  {chapter.status}
                </Badge>
              </CardHeader>
              
              <CardContent className="p-4 pt-0 space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-card/30 rounded-lg p-2 text-center">
                    <div className="text-xs text-muted-foreground">2025</div>
                    <div className="font-medium flex items-center justify-center">
                      {questionCount2025} Qs
                      {trendIncreasing ? (
                        <ArrowUp className="ml-1 h-3 w-3 text-green-500" />
                      ) : (
                        <ArrowDown className="ml-1 h-3 w-3 text-red-500" />
                      )}
                    </div>
                  </div>
                  <div className="bg-card/30 rounded-lg p-2 text-center">
                    <div className="text-xs text-muted-foreground">2024</div>
                    <div className="font-medium">{questionCount2024} Qs</div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>{chapter.questionSolved} / {totalQuestions}</span>
                  </div>
                  <Progress 
                    value={solvedPercentage} 
                    className="h-2"
                    indicatorClassName={cn(
                      solvedPercentage < 30 && "bg-red-500",
                      solvedPercentage >= 30 && solvedPercentage < 70 && "bg-amber-500",
                      solvedPercentage >= 70 && "bg-green-500"
                    )}
                  />
                </div>
              </CardContent>
              
              <CardFooter className="p-4 pt-0">
                <div className="w-full">
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-muted-foreground">
                      Total Questions: {totalQuestions}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {solvedPercentage}% complete
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          );
        })
      )}
    </div>
  );
}