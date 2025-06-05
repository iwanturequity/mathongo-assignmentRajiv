"use client";

import React from 'react';
import { Check, ChevronsUpDown, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface FilterBarProps {
  classes: string[];
  units: string[];
  classFilter: string[];
  setClassFilter: (value: string[]) => void;
  unitFilter: string[];
  setUnitFilter: (value: string[]) => void;
  statusFilter: string[];
  setStatusFilter: (value: string[]) => void;
  weakChaptersOnly: boolean;
  setWeakChaptersOnly: (value: boolean) => void;
  sortBy: 'name' | 'questions';
  setSortBy: (value: 'name' | 'questions') => void;
  viewMode: 'grid' | 'list';
  setViewMode: (value: 'grid' | 'list') => void;
}

export default function FilterBar({
  classes,
  units,
  classFilter,
  setClassFilter,
  unitFilter,
  setUnitFilter,
  statusFilter,
  setStatusFilter,
  weakChaptersOnly,
  setWeakChaptersOnly,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
}: FilterBarProps) {
  // Status options
  const statuses = ['Not Started', 'In Progress', 'Completed'];

  // Helper function for multi-select
  const toggleArrayItem = (array: string[], item: string) => {
    return array.includes(item)
      ? array.filter(i => i !== item)
      : [...array, item];
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 md:items-center">
        {/* Class Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-card/20 backdrop-blur border-white/10 hover:bg-card/40">
              Class {classFilter.length > 0 && `(${classFilter.length})`}
              <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-popover/95 backdrop-blur border-white/10">
            {classes.map(classItem => (
              <DropdownMenuCheckboxItem
                key={classItem}
                checked={classFilter.includes(classItem)}
                onCheckedChange={() => setClassFilter(toggleArrayItem(classFilter, classItem))}
              >
                {classItem}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Unit Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-card/20 backdrop-blur border-white/10 hover:bg-card/40">
              Unit {unitFilter.length > 0 && `(${unitFilter.length})`}
              <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-popover/95 backdrop-blur border-white/10">
            {units.map(unit => (
              <DropdownMenuCheckboxItem
                key={unit}
                checked={unitFilter.includes(unit)}
                onCheckedChange={() => setUnitFilter(toggleArrayItem(unitFilter, unit))}
              >
                {unit}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Status Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-card/20 backdrop-blur border-white/10 hover:bg-card/40">
              Status {statusFilter.length > 0 && `(${statusFilter.length})`}
              <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-popover/95 backdrop-blur border-white/10">
            {statuses.map(status => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={statusFilter.includes(status)}
                onCheckedChange={() => setStatusFilter(toggleArrayItem(statusFilter, status))}
              >
                <Badge variant="outline" className={cn(
                  "mr-2 w-3 h-3 rounded-full",
                  status === "Completed" && "bg-green-500",
                  status === "In Progress" && "bg-amber-500",
                  status === "Not Started" && "bg-red-500"
                )} />
                {status}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-wrap items-center gap-4 justify-between">
        <div className="flex items-center space-x-8">
          {/* Weak Chapters Toggle */}
          <div className="flex items-center space-x-2">
            <Switch 
              id="weak-chapters" 
              checked={weakChaptersOnly} 
              onCheckedChange={setWeakChaptersOnly} 
            />
            <Label htmlFor="weak-chapters" className="text-sm">Weak Chapters Only</Label>
          </div>

          {/* Sort By Toggle */}
          <div className="flex items-center space-x-2">
            <Switch 
              id="sort-by" 
              checked={sortBy === 'questions'} 
              onCheckedChange={(checked) => setSortBy(checked ? 'questions' : 'name')} 
            />
            <Label htmlFor="sort-by" className="text-sm">
              Sort by {sortBy === 'name' ? 'Chapter Name' : 'Total Questions'}
            </Label>
          </div>
        </div>

        {/* View Mode Buttons */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode('grid')}
            className={cn(viewMode === 'grid' ? 'bg-primary/20 text-primary' : '')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode('list')}
            className={cn(viewMode === 'list' ? 'bg-primary/20 text-primary' : '')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Applied Filters Display */}
      {(classFilter.length > 0 || unitFilter.length > 0 || statusFilter.length > 0 || weakChaptersOnly) && (
        <div className="flex flex-wrap gap-2 pt-2">
          {classFilter.map(c => (
            <Badge key={c} variant="secondary" className="bg-primary/10 text-primary">
              {c}
              <button
                className="ml-1 rounded-full hover:bg-primary/20"
                onClick={() => setClassFilter(classFilter.filter(i => i !== c))}
              >
                ×
              </button>
            </Badge>
          ))}
          {unitFilter.map(u => (
            <Badge key={u} variant="secondary" className="bg-primary/10 text-primary">
              {u}
              <button
                className="ml-1 rounded-full hover:bg-primary/20"
                onClick={() => setUnitFilter(unitFilter.filter(i => i !== u))}
              >
                ×
              </button>
            </Badge>
          ))}
          {statusFilter.map(s => (
            <Badge key={s} variant="secondary" className="bg-primary/10 text-primary">
              {s}
              <button
                className="ml-1 rounded-full hover:bg-primary/20"
                onClick={() => setStatusFilter(statusFilter.filter(i => i !== s))}
              >
                ×
              </button>
            </Badge>
          ))}
          {weakChaptersOnly && (
            <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-500">
              Weak Chapters Only
              <button
                className="ml-1 rounded-full hover:bg-yellow-500/20"
                onClick={() => setWeakChaptersOnly(false)}
              >
                ×
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}