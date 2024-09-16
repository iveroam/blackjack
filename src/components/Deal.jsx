import React from 'react';

const Deal = ({
    onDeal, 
    bets
}) => {
    return (
        <div>
            <button className="button" disabled={bets === 0} onClick={onDeal}>
                Deal
            </button>
        </div>
    )
}

export default Deal;