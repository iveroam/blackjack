import React from 'react';

const Dealer = ({ gameStage, hand, score }) => {
    
    return (
        <div className="player">
            <h3> value { score } </h3>
            <div className="hand">
            { gameStage === "PLAYING" ? (
                <>
                    <img
                        alt={"card back"}
                        src={'cards/card_back.png'}
                        className="holecard-img"
                    />
                    <img
                        alt={"card front"}
                        src={`cards/${hand[1].suit}${hand[1].value}.svg`}
                        className="upcard-img"
                    />
                </>
            ) : (
                hand.map((c, i) => 
                    <img
                        key={i}
                        alt={c}
                        src={`cards/${c.suit}${c.value}.svg`}
                        className="upcard-img"
                    />
                )
            )}
            </div>
        </div>
    )
}

export default Dealer;