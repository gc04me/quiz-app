import React from 'react';
import './ScoreCard.css';

function ScoreCard({ correctAnswer, incorrectAnswer, playTime, totalQues }) {
    const grade = (correctAnswer / totalQues) * 100;
    const status = grade > 50 ? "Pass" : "Fail";
    return (
        <div className="scorecard">
            <div className="scorecard__header"> ScoreBoard</div>
            <div className="scorecard__content">
                <div className="scorecard__left__content">
                    <p>Total Time : {playTime} sec</p>
                    <p>Correct Answer : {correctAnswer}</p>
                    <p>Wrong Answer : {incorrectAnswer}</p>
                    <p>Grade : {grade} %</p>
                    <p className={grade>50?"pass":"fail"}>Status : {status}</p>
                </div>            
            </div>
           
        </div>
    )
}

export default ScoreCard
