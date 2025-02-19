export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizAttempt {
  id: string;
  date: string;
  score: number;
  timeSpent: number;
  answers: Record<number, number>;
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: Record<number, number>;
  timeRemaining: number;
  isComplete: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}