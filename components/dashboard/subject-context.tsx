"use client";

import React, { createContext, useContext, useState } from 'react';

type Subject = 'Physics' | 'Chemistry' | 'Mathematics';

interface SubjectContextType {
  currentSubject: Subject;
  setCurrentSubject: (subject: Subject) => void;
}

const SubjectContext = createContext<SubjectContextType | undefined>(undefined);

export function SubjectProvider({ children }: { children: React.ReactNode }) {
  const [currentSubject, setCurrentSubject] = useState<Subject>('Physics');

  return (
    <SubjectContext.Provider value={{ currentSubject, setCurrentSubject }}>
      {children}
    </SubjectContext.Provider>
  );
}

export function useSubject() {
  const context = useContext(SubjectContext);
  if (context === undefined) {
    throw new Error('useSubject must be used within a SubjectProvider');
  }
  return context;
}