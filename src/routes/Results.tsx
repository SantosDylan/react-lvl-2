import { Link } from 'react-router-dom';
import QuizQuestionsList from '../components/QuizQuestions';
import { useQuizContext } from '../contexts/quiz-questions.context';
import ResultQuiz from '../components/ResultQuiz'

function Results() {
  const { quizQuestions, quizLoading, quizResults, resetQuiz } = useQuizContext();

  const numberOfQuizQuestions = quizQuestions.length;

  return (
    <div className='w-full h-full'>
      <div className='w-full pt-12 flex gap-4 flex-col justify-center items-center'>
        <h2 className='font-bold text-xl'>RESULT</h2>
        <div className='flex gap-2'></div>
        <QuizQuestionsList questions={quizQuestions} loading={quizLoading} />
        <ResultQuiz quizResults={quizResults} numberOfQuizQuestions={numberOfQuizQuestions}/>
        <Link to={'/'}>
          <button onClick={() => resetQuiz()} className='text-sm font-medium py-2 px-3 text-center rounded-lg border focus:outline-none focus:ring-2'>Create a new Quiz</button>
        </Link>
      </div>
    </div>
  );
}

export default Results;
