const DeckCount = ({ deckCount }) => {

    return (
        <div className="deckcount-content">
            <h3>{deckCount}</h3>
            <img
                alt={"card back"}
                src={'cards/card_back.png'}
            />
        </div>
    );
};

export default DeckCount;