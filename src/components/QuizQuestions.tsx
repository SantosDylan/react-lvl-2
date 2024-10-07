import { Answer, QuizQuestion } from '../interfaces/quiz-questions.interface';
import AnswerButton from './AnswerButton';

interface QuestionsQuizProps {
  questions: QuizQuestion[];
  loading: boolean;
  onAnswerButtonClick?: (question: QuizQuestion, answer: Answer) => void;
}
export default function QuizQuestionsList({ questions, loading, onAnswerButtonClick }: QuestionsQuizProps) {
  if (loading) return <div>Loading ...</div>;

  const handleAnswerButtonClick = (question: QuizQuestion, answer: Answer) => {
    if (!onAnswerButtonClick) {
      return;
    }

    onAnswerButtonClick(question, answer);
  };

  return (
    <div className='flex flex-col gap-4'>
      {questions.map((question, id) => (
        <div key={id}>
          <div>{question.question}</div>
          <div className='flex gap-4 items-center'>
            {question.answers.map((answer, id) => (
              <AnswerButton key={id} answer={answer} onButtonClick={() => handleAnswerButtonClick(question, answer)} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
