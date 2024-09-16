const Player = ({hand, score}) => {
    return (
        <>
            <div className="player">
                <h3>value {score}</h3>
                <div className="hand">
                    {hand.map((c, i) => 
                        <img
                            key={i}
                            alt={c}
                            src={`cards/${c.suit}${c.value}.svg`}
                            className="upcard-img"
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default Player;