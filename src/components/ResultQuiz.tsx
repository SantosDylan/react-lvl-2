import { QuizResult } from '../hooks/quiz-results.hook';

interface ResultQuizProps {
  quizResults: QuizResult | null;
  numberOfQuizQuestions: number;
}

export default function ResultQuiz({ quizResults, numberOfQuizQuestions }: ResultQuizProps) {
  if (!quizResults) return;
  const { color, numberOfCorrectAnswers } = quizResults;

  const getClasses = (color: 'red' | 'yellow' | 'green'): string => {
    const defaultClasses = 'p-2';
    const colorClasses = {
      red: 'bg-red-300',
      yellow: 'bg-yellow-300',
      green: 'bg-green-300 text-white',
    };

    return `${defaultClasses} ${colorClasses[color]}`;
  };
  return (
    <div className={getClasses(color)}>
      Your scored {numberOfCorrectAnswers} out of {numberOfQuizQuestions}
    </div>
  );
}
