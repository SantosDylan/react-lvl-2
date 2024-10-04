import { useState } from 'react';
import './App.css';
import CategorySelect from './assets/components/CategorySelect';
import DifficultySelect from './assets/components/DifficultySelect';
import { useCategories } from './hooks/categories.hook';
import { Category } from './interfaces/categories.interface';
import CreateButton from './assets/components/CreateButton';
import QuizQuestionsList from './assets/components/QuizQuestions';
import { Difficulty } from './interfaces/difficulties.interface';
import { useQuizQuestions } from './hooks/quiz-questions.hook';
import { Answer, QuizQuestion } from './interfaces/quiz-questions.interface';
import SubmitButton from './assets/components/SubmitButton';

function App() {
  const { categories, error, loading } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('easy');
  const { quizQuestions, quizLoading, fetchQuizQuestions, toggleAnswer, canSubmit, quizResults, submitQuiz } = useQuizQuestions();

  const handleCategoryChange = (categoryName: string) => {
    const foundCategory = categories.find((category) => category.name === categoryName);
    setSelectedCategory(foundCategory ?? null);
  };

  const handleDifficultyChange = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handleCreateButtonClick = () => fetchQuizQuestions(selectedCategory, selectedDifficulty);

  const handleAnswerButtonClick = (question: QuizQuestion, answer: Answer) => toggleAnswer(question, answer);

  const handleSubmitButton = () => submitQuiz();

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
        <SubmitButton canSubmit={canSubmit} onButtonClick={handleSubmitButton} />
        <div>{quizResults?.color}  {quizResults?.numberOfCorrectAnswers} </div> 
      </div>
    </div>
  );
}

export default App;
