export interface QuizQuestionsResponse {
    response_code: number
    results: Result
  }
  
  export interface Result {
    type: string
    difficulty: string
    category: string
    question: string
    correct_answer: string
    incorrect_answers: string[]
  }

  export interface QuizQuestion {
    type: string
    difficulty: string
    category: string
    question: string
    correct_answer: string
    incorrect_answers: string[]
    answers: Answer[];
  }
  
  export interface Answer {
    text: string
    selected: boolean
    status: AnswerStatus
  }

  export type AnswerStatus =  'not-defined' | 'correct' | 'incorrect'