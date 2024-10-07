import { Route, Routes } from 'react-router';
import Quiz from './routes/Quiz';
import Results from './routes/Results';
import { QuizProvider } from './contexts/quiz-questions.context';

function App() {
  return (
    <QuizProvider>
      <Routes>
        <Route path='/' element={<Quiz />}></Route>
        <Route path='/result' element={<Results />}></Route>
      </Routes>
    </QuizProvider>
  );
}

export default App;
