import { createContext, ReactNode, useContext } from 'react';
import { QuizResult } from '../interfaces/quiz-results.interface';
import { Category } from '../interfaces/categories.interface';
import { Difficulty } from '../interfaces/difficulties.interface';
import { Answer, QuizQuestion } from '../interfaces/quiz-questions.interface';
import { useQuizQuestions } from '../hooks/quiz-questions.hook';

interface QuizContextProps {
  quizQuestions: QuizQuestion[];
  quizLoading: boolean;
  quizError: TypeError | null;
  canSubmit: boolean;
  quizResults: QuizResult | null;
  fetchQuizQuestions: (category: Category | null, difficulty: Difficulty) => void;
  toggleAnswer: (updatedQuestion: QuizQuestion, updatedAnswer: Answer) => void;
  submitQuiz: () => void;
  resetQuiz: () => void;
}

export const QuizContext = createContext<QuizContextProps | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const { quizQuestions, quizLoading, quizError, fetchQuizQuestions, toggleAnswer, canSubmit, submitQuiz, quizResults, resetQuiz } = useQuizQuestions();

  return (
    <QuizContext.Provider
      value={{
        quizQuestions,
        quizLoading,
        quizError,
        fetchQuizQuestions,
        toggleAnswer,
        canSubmit,
        submitQuiz,
        quizResults,
        resetQuiz,
      }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuizContext must be used within a QuizProvider');
  }
  return context;
};
