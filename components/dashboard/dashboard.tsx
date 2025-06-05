"use client";

import React, { useState } from 'react';
import DashboardSidebar from './dashboard-sidebar';
import DashboardContent from './dashboard-content';
import { SubjectProvider } from '@/components/dashboard/subject-context';
import { mockChapters } from '@/lib/mock-data';

export default function Dashboard() {
  return (
    <SubjectProvider>
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 flex flex-col md:flex-row">
        <DashboardSidebar />
        <DashboardContent chapters={mockChapters} />
      </div>
    </SubjectProvider>
  );
}