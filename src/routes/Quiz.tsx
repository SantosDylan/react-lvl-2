import { useEffect, useState } from 'react';
import CategorySelect from '../components/CategorySelect';
import CreateButton from '../components/CreateButton';
import DifficultySelect from '../components/DifficultySelect';
import QuizQuestionsList from '../components/QuizQuestions';
import SubmitButton from '../components/SubmitButton';
import { useCategories } from '../hooks/categories.hook';
import { Category } from '../interfaces/categories.interface';
import { Difficulty } from '../interfaces/difficulties.interface';
import { QuizQuestion, Answer } from '../interfaces/quiz-questions.interface';
import { Link } from 'react-router-dom';
import { useQuizContext } from '../contexts/quiz-questions.context';

function Quiz() {
  const { categories, error, loading } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('easy');
  const { quizQuestions, quizLoading, fetchQuizQuestions, toggleAnswer, canSubmit, submitQuiz, resetQuiz } = useQuizContext();

  useEffect(() => resetQuiz(), []);

  const handleCategoryChange = (categoryName: string) => {
    const foundCategory = categories.find((category) => category.name === categoryName);
    setSelectedCategory(foundCategory ?? null);
  };

  const handleDifficultyChange = (difficulty: Difficulty) => setSelectedDifficulty(difficulty);

  const handleCreateButtonClick = () => fetchQuizQuestions(selectedCategory, selectedDifficulty);

  const handleAnswerButtonClick = (question: QuizQuestion, answer: Answer) => toggleAnswer(question, answer);

  return (
    <div className='w-full h-full'>
      <div className='w-full pt-12 flex gap-4 flex-col justify-center items-center'>
        <h2 className='font-bold text-xl'>QUIZ MAKER</h2>
        <div className='flex gap-2'>
          <CategorySelect categories={categories} error={error} loading={loading} selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
          <DifficultySelect selectedDifficulty={selectedDifficulty} onDifficultyChange={handleDifficultyChange} />
          <CreateButton selectedCategory={selectedCategory} onButtonClick={handleCreateButtonClick} />
        </div>
        <QuizQuestionsList questions={quizQuestions} loading={quizLoading} onAnswerButtonClick={handleAnswerButtonClick} />

        <Link to={'/result'}>
          <SubmitButton onButtonClick={submitQuiz} canSubmit={canSubmit} />
        </Link>
      </div>
    </div>
  );
}

export default Quiz;
