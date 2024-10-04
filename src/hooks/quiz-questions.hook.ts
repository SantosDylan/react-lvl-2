import { useEffect, useState } from 'react';
import { Category } from '../interfaces/categories.interface';
import { Difficulty } from '../interfaces/difficulties.interface';
import { Answer, AnswerStatus, QuizQuestion, Result } from '../interfaces/quiz-questions.interface';
import { QuizResult } from './quiz-results.hook';

export const useQuizQuestions = () => {
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizError, setQuizError] = useState<TypeError | null>(null);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [quizResults, setQuizResults] = useState<QuizResult | null>(null);

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
    const getStatus = (isCorrectAnswer: boolean): AnswerStatus => {
      return isCorrectAnswer ? 'correct' : 'incorrect';
    };

    const cleanQuestions = quizQuestions.map((question) => ({
      ...question,
      answers: question.answers.map((answer) => ({ ...answer, status: 'not-defined' as AnswerStatus })),
    }));
    const questions = cleanQuestions.map((question) => ({
      ...question,
      answers: question.answers.map((answer) => (answer.selected ? { ...answer, status: getStatus(isCorrectAnswer(question)) } : answer)),
    }));
    setQuizQuestions(questions);
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
  };
};

function getQuizResultColor(numberOfCorrectAnswers: number): 'red' | 'green' | 'yellow' {
  if (numberOfCorrectAnswers >= 4) return 'green';
  else if (numberOfCorrectAnswers >= 2) return 'yellow';
  else return 'red';
}

function getQuizQuestions(results: Result[]): QuizQuestion[] {
  return results.map((quizQuestion) => ({
    ...quizQuestion,
    question: decodeHtmlEntities(quizQuestion.question),
    answers: getAnswers(quizQuestion.correct_answer, quizQuestion.incorrect_answers),
  }));
}

function decodeHtmlEntities(text: string) {
  const parser = new DOMParser();
  const decodedString = parser.parseFromString(text, 'text/html').body.textContent || '';
  return decodedString;
}

function getAnswers(correct_answer: string, incorrect_answer: string[]): Answer[] {
  const answers = [...incorrect_answer, correct_answer];

  return shuffle(answers).map((answer) => ({ text: answer, status: 'not-defined', selected: false }));
}

function shuffle(arr: string[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function isCorrectAnswer(question: QuizQuestion) {
  const selectedAnswer = question.answers.find((answer) => answer.selected)?.text;
  const correctAnswer = question.correct_answer;

  return selectedAnswer === correctAnswer;
}
