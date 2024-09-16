import React from 'react';

const Controls = ({ 
    isFirstRound,
    onHandlePlayerAction
}) => {
    return (
        <div>
            <button className="button" disabled={!isFirstRound} onClick={() => onHandlePlayerAction('surrender')}>
                Surrender
            </button>
            <button className="button" disabled={!isFirstRound} onClick={() => onHandlePlayerAction('double')}>
                Double
            </button>
            <button className="button" onClick={() => onHandlePlayerAction('hit')}>
                Hit
            </button>
            <button className="button" onClick={() => onHandlePlayerAction('stand')}>
                Stand
            </button>
        </div>
    )
}

export default Controls;