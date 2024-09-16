import React from 'react'

const Result = ({ result }) => {
    let resultClass;
    if (result === "You win!") {
        resultClass = 'win-result'
    } else if (result === "Dealer wins!") {
        resultClass = 'lose-result'
    } else if (result === "Push!") {
        resultClass = 'push-result'
    } else if (result === "Blackjack!") {
        resultClass = 'blackjack-result'
    } else {
        resultClass = 'surrender-result'
    }

    return (
        <div className="result-box">
            <h2 className={resultClass}> { result } </h2>
        </div>
    )
}

export default Result;