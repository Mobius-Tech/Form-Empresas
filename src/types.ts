export type QuestionType = 'text' | 'choice' | 'email' | 'rating';

export type Question = {
  id: string;
  type: QuestionType;
  question: string;
  description?: string;
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

export type FormData = {
  [key: string]: string | number;
}

// Add a runtime export as well to ensure this is always treated as a full module
export const VERSION = '1.0.0';
