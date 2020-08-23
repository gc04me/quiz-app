import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import './QuizCard.css'


function QuizCard({ question, correctAnswer, options, handleAnswer, showNextQuestion, currentQuestionIndex, isOptionSelected }) {
    const [selectedAnswer, setSelectedAnswer] = useState(undefined);

    const handleClick = (e) => {
        //one of the option is selected
        const selectedAnswer = e.target.textContent;
        handleAnswer(selectedAnswer);
        setSelectedAnswer(selectedAnswer);
    }

    return (
        <div className="quizCard">
            <div className="quizCard__question">
                <p dangerouslySetInnerHTML={{ __html: question }} />
            </div>
            <ul className="quizCard__options" >
                {options.map((option, index) => {
                    const bgColor = isOptionSelected ? option === correctAnswer ? 'bg_green' : 'bg_red' : 'bg_white'
                    return <li className={`${bgColor}`} key={index} dangerouslySetInnerHTML={{ __html: option }} onClick={handleClick} ></li>
                })}

            </ul>
            <div className="quizCard__button">
                <div className="correctIncorrectAnswer">
                    {isOptionSelected ? selectedAnswer === correctAnswer ? <div>Correct Answer &#128077;</div> : <div>Wrong Answer &#128078;</div> : <div></div>}
                </div>
                <Button variant="contained" color="primary" disableElevation onClick={() => showNextQuestion(currentQuestionIndex)}>{currentQuestionIndex<4?'Next':'Finish'}</Button>
            </div>

        </div>
    )
}

export default QuizCard
