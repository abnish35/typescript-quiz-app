import React, {useState} from 'react';
import './App.css';
import QuestionsCard from './components/QuestionsCard';
import { fetchQuizQuestions, QuestionState, Difficulties } from './API';

export type AnswerObject ={
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

function App() {
const [loading, setLoading] = useState(false);
const [questions, setQuestions] = useState<QuestionState[]>([]);
const [number, setNumber] = useState(0);
const [userAnswers, setUserAnswers]
 = useState<AnswerObject[]>([]);
 const [score, setScore] = useState(0);
const [gameOver, setGameOver] = useState(true);

console.log(questions)

  const startTrivia =async ()=> {
    setLoading(true);
    setGameOver(false);

    const newQestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulties.EASY
    );

      setQuestions(newQestions);
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setLoading(false)
  }

  const checkAnswer =(e: React.MouseEvent<HTMLButtonElement>)=>{

    if(!gameOver){
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if(correct) setScore(prevScore=> prevScore+1)
      // save answer in the array for user answer
      const answerObject ={
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers(prev=>[...prev, answerObject])
    }

  }

  const nextQuestion=()=>{
    // move on to the next question if not the last question

    const nextQuestion = number +1;
    if(nextQuestion === TOTAL_QUESTIONS){
      setGameOver(true)
    }
    setNumber(nextQuestion)
  }

  return (
    <div className="App">

    <h1>React Quiz</h1>
    {gameOver || userAnswers.length === TOTAL_QUESTIONS?(
    <button className="start" onClick={startTrivia}>Start</button>): null}

    {!gameOver?(
    <p className="score">Score: {score}</p>): null}

    {loading?<p>Loading Questions...</p>: null}

      {!loading && !gameOver? (
    <QuestionsCard 
      questionNumber={number + 1}
      totalQuestions={TOTAL_QUESTIONS}
      question={questions[number].question}
      answers={questions[number].answers}
      userAnswer={userAnswers? userAnswers[number] : undefined}
      callback={checkAnswer}

    />) : null}


    {!gameOver && !loading && userAnswers.length === number+1 && number !== TOTAL_QUESTIONS-1 ? (<button className="next" onClick={nextQuestion}>Next</button>):null}

    <button className="next" onClick={nextQuestion}>Previous</button>
    </div>
  );
}

export default App;
