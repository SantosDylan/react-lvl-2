import { useEffect, useState } from 'react';
import { Category } from '../interfaces/categories.interface';
import { Difficulty } from '../interfaces/difficulties.interface';
import { Answer, AnswerStatus, QuizQuestion } from '../interfaces/quiz-questions.interface';
import { QuizResult } from '../interfaces/quiz-results.interface';
import { localStorageUtils } from '../utils/local-storage.utils';
import { getQuizQuestions, getQuizResultColor } from '../utils/quiz-questions.utils';

export const useQuizQuestions = () => {
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(localStorageUtils.getQuizQuestions());
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizError, setQuizError] = useState<TypeError | null>(null);
  const [canSubmit, setCanSubmit] = useState<boolean>(localStorageUtils.getCanSubmit());
  const [quizResults, setQuizResults] = useState<QuizResult | null>(localStorageUtils.getQuizResults());

  useEffect(() => {
    localStorageUtils.saveQuizQuestions(quizQuestions);
  }, [quizQuestions]);

  useEffect(() => {
    localStorageUtils.saveCanSubmit(canSubmit);
  }, [canSubmit]);

  useEffect(() => {
    localStorageUtils.saveQuizResults(quizResults);
  }, [quizResults]);

  useEffect(() => {
    if (quizQuestions.length === 0) return;

    setCanSubmit(quizQuestions.every((question) => question.answers.some((answer) => answer.selected)));
  }, [quizQuestions]);

  const fetchQuizQuestions = async (category: Category | null, difficulty: Difficulty) => {
    if (!category) {
      return;
    }

    setQuizLoading(true);

    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=5&category=${category.id}&difficulty=${difficulty}&type=multiple`);
      const data = await response.json();
      if (data.response_code === 0) {
        const results: QuizQuestion[] = data.results;
        const questions = getQuizQuestions(results);
        setQuizQuestions(questions);
      }
    } catch (error) {
      setQuizError(error as TypeError);
    } finally {
      setQuizLoading(false);
    }
  };

  const toggleAnswer = (updatedQuestion: QuizQuestion, updatedAnswer: Answer) => {
    const updatedQuestions = quizQuestions.map((question) =>
      updatedQuestion.question === question.question
        ? {
            ...question,
            answers: question.answers.map((answer) =>
              answer.text === updatedAnswer.text ? { ...answer, selected: !answer.selected } : { ...answer, selected: false }
            ),
          }
        : question
    );

    setQuizQuestions(updatedQuestions);
  };

  const submitQuiz = () => {
    updateQuizResults();
    updateAnswerStatus();
  };

  const resetQuiz = () => {
    setQuizQuestions((questions) =>
      questions.map((question) => ({ ...question, answers: question.answers.map((answer) => ({ ...answer, status: 'not-defined' })) }))
    );
    setCanSubmit(false);
    setQuizResults(null);
    localStorageUtils.clearQuizData();
  };

  const updateQuizResults = () => {
    setQuizResults({ numberOfCorrectAnswers: 0, color: 'red' });

    quizQuestions.forEach((question) => {
      const selectedAnswer = question.answers.find((answer) => answer.selected)?.text;
      const correctAnswer = question.correct_answer;

      if (selectedAnswer === correctAnswer) {
        setQuizResults((update) => {
          if (!update) {
            return null;
          }
          return { ...update, numberOfCorrectAnswers: update.numberOfCorrectAnswers + 1 };
        });
      }
    });

    setQuizResults((update) => {
      if (!update) {
        return null;
      }

      return { ...update, color: getQuizResultColor(update.numberOfCorrectAnswers) };
    });
  };

  const updateAnswerStatus = () => {
    const determineAnswerStatus = (question: QuizQuestion, answer: Answer): AnswerStatus => {
      if (answer.text === question.correct_answer) {
        return 'correct';
      }
      if (answer.selected) {
        return 'incorrect';
      }
      return 'not-defined';
    };

    const updatedQuestions = quizQuestions.map((question) => ({
      ...question,
      answers: question.answers.map((answer) => ({
        ...answer,
        status: determineAnswerStatus(question, answer),
      })),
    }));

    setQuizQuestions(updatedQuestions);
  };

  return {
    quizQuestions,
    quizLoading,
    quizError,
    fetchQuizQuestions,
    toggleAnswer,
    canSubmit,
    submitQuiz,
    quizResults,
    resetQuiz,
  };
};
