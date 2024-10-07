import { Answer, QuizQuestion, Result } from "../interfaces/quiz-questions.interface";

export function getQuizResultColor(numberOfCorrectAnswers: number): 'red' | 'green' | 'yellow' {
    if (numberOfCorrectAnswers >= 4) return 'green';
    else if (numberOfCorrectAnswers >= 2) return 'yellow';
    else return 'red';
  }
  
  export function getQuizQuestions(results: Result[]): QuizQuestion[] {
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
  
  export function getAnswers(correct_answer: string, incorrect_answer: string[]): Answer[] {
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
  