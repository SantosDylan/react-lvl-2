import { QuizQuestion } from '../interfaces/quiz-questions.interface';
import { QuizResult } from '../interfaces/quiz-results.interface';

const QUIZ_QUESTIONS_KEY = 'quizQuestions';
const QUIZ_RESULTS_KEY = 'quizResults';
const CAN_SUBMIT_KEY = 'canSubmit';

export const localStorageUtils = {
  saveQuizQuestions: (questions: QuizQuestion[]) => {
    localStorage.setItem(QUIZ_QUESTIONS_KEY, JSON.stringify(questions));
  },

  getQuizQuestions: (): QuizQuestion[] => {
    const storedQuestions = localStorage.getItem(QUIZ_QUESTIONS_KEY);
    return storedQuestions ? JSON.parse(storedQuestions) : [];
  },

  saveQuizResults: (results: QuizResult | null) => {
    localStorage.setItem(QUIZ_RESULTS_KEY, JSON.stringify(results));
  },

  getQuizResults: (): QuizResult | null => {
    const storedResults = localStorage.getItem(QUIZ_RESULTS_KEY);
    return storedResults ? JSON.parse(storedResults) : null;
  },

  saveCanSubmit: (canSubmit: boolean) => {
    localStorage.setItem(CAN_SUBMIT_KEY, JSON.stringify(canSubmit));
  },

  getCanSubmit: (): boolean => {
    const storedCanSubmit = localStorage.getItem(CAN_SUBMIT_KEY);
    return storedCanSubmit ? JSON.parse(storedCanSubmit) : false;
  },

  clearQuizData: () => {
    localStorage.removeItem(QUIZ_QUESTIONS_KEY);
    localStorage.removeItem(QUIZ_RESULTS_KEY);
    localStorage.removeItem(CAN_SUBMIT_KEY);
  },
};