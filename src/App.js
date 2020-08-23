import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QuizCard from './QuizCard'
import ScoreCard from './ScoreCard'
import './App.css';

function App() {

  const [data, setData] = useState([]);
  const [startQuiz, setStartQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [incorrectAnswer, setIncorrectAnswer] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [isOptionSelected, setOptionSelected] = useState(false);
  const [startTime,setStartTime]= useState(undefined);
  const [endTime,setEndTime]= useState(undefined);

  useEffect(() => {
    axios.get('https://opentdb.com/api.php?amount=5')
      .then(res => {
        setData(res.data.results.map((questionItem, index) => {
          const answer = questionItem.correct_answer;
          const options = [...questionItem.incorrect_answers, answer];
          return {
            id: `${index}-${Date.now()}`,
            questions: questionItem.question,
            correctAnswer: answer,
            options: options.sort(() => Math.random() - .5)
          }
        }))
      })

  }, []);

  const handleAnswer = (answer) => {
    console.log(answer);
    //change scrore if correct
    if (answer === data[currentQuestion].correctAnswer) {
      setCorrectAnswer(correctAnswer + 1);
    } else {
      setIncorrectAnswer(incorrectAnswer + 1);
    }
    setOptionSelected(true);
  }

  const showNextQuestion = (currentQuestionIndex) => {
    //goto next question if not the last question
    setOptionSelected(false);
    if (currentQuestionIndex === data.length - 1) {
      setGameEnded(true);
      setEndTime(Date.now());
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  const handleStartQuiz=()=>{
    //quiz started and noted the quiz start time
    setStartQuiz(true);
    setStartTime(Date.now());
  }

  return (
    <div className="app">
      {!startQuiz && <div className="app__intro">
        <h1 className="app__intro__text">
          Lets Play Quiz &#128077;
            </h1>
        <button className="app__intro__button " onClick={handleStartQuiz}>Start</button>
      </div>}
      {startQuiz && data.length > 0 && !gameEnded && <QuizCard
        question={data[currentQuestion].questions}
        correctAnswer={data[currentQuestion].correctAnswer}
        options={data[currentQuestion].options}
        handleAnswer={handleAnswer}
        showNextQuestion={showNextQuestion}
        currentQuestionIndex={currentQuestion}
        isOptionSelected={isOptionSelected}
      />}
      {gameEnded && 
      <ScoreCard 
        correctAnswer={correctAnswer} 
        incorrectAnswer={incorrectAnswer}
        totalQues={data.length}
        playTime={Math.round((endTime-startTime)/1000)}
       />}
    </div>
  );
}

export default App;
