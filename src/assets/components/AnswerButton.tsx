import { Answer, AnswerStatus } from '../../interfaces/quiz-questions.interface';

interface AnswerButtonProps {
  answer: Answer;
  onButtonClick: () => void;
}

export default function AnswerButton({ answer, onButtonClick }: AnswerButtonProps) {
  const getButtonClasses = (answer: Answer) => {
    const baseClasses = 'text-sm font-medium py-2 px-3 text-center rounded-lg border focus:outline-none focus:ring-2';

    const variantClasses: Record<AnswerStatus, string> = {
      'not-defined': '',
      correct: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-900',
      incorrect: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900',
    };

    const selectedClasses = answer.selected ? 'bg-cyan-500 text-white' : '';

    return `${baseClasses} ${variantClasses[answer.status]} ${selectedClasses}`;
  };

  return (
    <button className={getButtonClasses(answer)} onClick={() => onButtonClick()}>
      {answer.text}
    </button>
  );
}
