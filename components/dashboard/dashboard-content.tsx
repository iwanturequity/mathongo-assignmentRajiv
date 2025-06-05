"use client";

import React, { useState, useMemo } from 'react';
import { useSubject } from './subject-context';
import DashboardHeader from './dashboard-header';
import ChapterList from './chapter-list';
import ChapterGrid from './chapter-grid';
import FilterBar from './filter-bar';
import { Chapter } from '@/lib/types';

interface DashboardContentProps {
  chapters: Chapter[];
}

export default function DashboardContent({ chapters }: DashboardContentProps) {
  const { currentSubject } = useSubject();
  const [classFilter, setClassFilter] = useState<string[]>([]);
  const [unitFilter, setUnitFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [weakChaptersOnly, setWeakChaptersOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'questions'>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredChapters = useMemo(() => {
    return chapters
      .filter(chapter => chapter.subject === currentSubject)
      .filter(chapter => classFilter.length === 0 || classFilter.includes(chapter.class))
      .filter(chapter => unitFilter.length === 0 || unitFilter.includes(chapter.unit))
      .filter(chapter => statusFilter.length === 0 || statusFilter.includes(chapter.status))
      .filter(chapter => !weakChaptersOnly || chapter.isWeakChapter)
      .sort((a, b) => {
        if (sortBy === 'name') {
          return a.chapter.localeCompare(b.chapter);
        } else {
          const totalA = Object.values(a.yearWiseQuestionCount).reduce((sum, count) => sum + count, 0);
          const totalB = Object.values(b.yearWiseQuestionCount).reduce((sum, count) => sum + count, 0);
          return totalB - totalA;
        }
      });
  }, [chapters, currentSubject, classFilter, unitFilter, statusFilter, weakChaptersOnly, sortBy]);

  // Extract unique classes and units for filters
  const classes = useMemo(() => {
    return [...new Set(chapters.filter(c => c.subject === currentSubject).map(c => c.class))];
  }, [chapters, currentSubject]);

  const units = useMemo(() => {
    return [...new Set(chapters.filter(c => c.subject === currentSubject).map(c => c.unit))];
  }, [chapters, currentSubject]);

  return (
    <div className="flex-1 h-screen overflow-auto pb-20">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-4">
        <FilterBar
          classes={classes}
          units={units}
          classFilter={classFilter}
          setClassFilter={setClassFilter}
          unitFilter={unitFilter}
          setUnitFilter={setUnitFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          weakChaptersOnly={weakChaptersOnly}
          setWeakChaptersOnly={setWeakChaptersOnly}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
        
        <div className="mt-6">
          {viewMode === 'grid' ? (
            <ChapterGrid chapters={filteredChapters} />
          ) : (
            <ChapterList chapters={filteredChapters} />
          )}
        </div>
      </main>
    </div>
  );
}