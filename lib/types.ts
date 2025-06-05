export interface Chapter {
  subject: 'Physics' | 'Chemistry' | 'Mathematics';
  chapter: string;
  class: string;
  unit: string;
  yearWiseQuestionCount: {
    [year: number]: number;
  };
  questionSolved: number;
  status: 'Not Started' | 'In Progress' | 'Completed';
  isWeakChapter: boolean;
}