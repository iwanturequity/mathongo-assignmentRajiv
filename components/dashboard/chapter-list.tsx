"use client";

import React from 'react';
import { Chapter } from '@/lib/types';
import { ArrowDown, ArrowUp, BookOpen, Lightbulb } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ChapterListProps {
  chapters: Chapter[];
}

export default function ChapterList({ chapters }: ChapterListProps) {
  if (chapters.length === 0) {
    return (
      <div className="flex justify-center py-10">
        <div className="text-center space-y-2">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="text-lg font-medium">No chapters found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters to find what you're looking for.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg border-border bg-card/20 backdrop-blur-md overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/10">
          <TableRow>
            <TableHead>Chapter</TableHead>
            <TableHead className="hidden md:table-cell">Class / Unit</TableHead>
            <TableHead className="w-[100px] text-center">2025</TableHead>
            <TableHead className="w-[100px] text-center hidden sm:table-cell">2024</TableHead>
            <TableHead className="hidden md:table-cell">Progress</TableHead>
            <TableHead className="w-[100px] text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {chapters.map((chapter) => {
            // Calculate total questions
            const totalQuestions = Object.values(chapter.yearWiseQuestionCount).reduce((sum, count) => sum + count, 0);
            const solvedPercentage = Math.round((chapter.questionSolved / totalQuestions) * 100);
            
            // Question trend (2024 to 2025)
            const questionCount2024 = chapter.yearWiseQuestionCount[2024] || 0;
            const questionCount2025 = chapter.yearWiseQuestionCount[2025] || 0;
            const trendIncreasing = questionCount2025 > questionCount2024;
            
            return (
              <TableRow 
                key={chapter.chapter} 
                className="group hover:bg-muted/5 transition-colors"
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {chapter.chapter}
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
                </TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">
                  {chapter.class} / {chapter.unit}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center">
                    {questionCount2025}
                    {trendIncreasing ? (
                      <ArrowUp className="ml-1 h-3 w-3 text-green-500" />
                    ) : (
                      <ArrowDown className="ml-1 h-3 w-3 text-red-500" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-center hidden sm:table-cell">
                  {questionCount2024}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={solvedPercentage} 
                      className="h-2 flex-1"
                      indicatorClassName={cn(
                        solvedPercentage < 30 && "bg-red-500",
                        solvedPercentage >= 30 && solvedPercentage < 70 && "bg-amber-500",
                        solvedPercentage >= 70 && "bg-green-500"
                      )}
                    />
                    <span className="text-xs text-muted-foreground w-16">
                      {chapter.questionSolved}/{totalQuestions}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Badge 
                    className={cn(
                      chapter.status === "Completed" && "bg-green-500",
                      chapter.status === "In Progress" && "bg-amber-500",
                      chapter.status === "Not Started" && "bg-red-500"
                    )}
                  >
                    {chapter.status}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}