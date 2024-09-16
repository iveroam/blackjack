const createCard = ( suit, value ) => {
    return { suit, value };
}

const shuffle = ( array ) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

export const createDeck = (amount) => {
    const suits = ['C', 'D', 'H', 'S']
    let values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let deck = []

    for (let i = 0; i < amount; i++) {
        suits.forEach(suit => {
            values.forEach(value => {
                const card = createCard(suit, value)
                deck.push(card)
                })
            }
        )
    }

    return shuffle(deck)
}

export const reshuffle = (setGameState, setShuffleStatus, state) => {
    setGameState(prevState => ({...prevState, gameStage: "SHUFFLING"}));
    setShuffleStatus("Shuffling.");

    setTimeout(() => {
        setShuffleStatus("Shuffling..")
    }, 300);

    setTimeout(() => {
        setShuffleStatus("Shuffling...")
    }, 600);

    setTimeout(() => {
        setGameState(prevState => ({...prevState, gameStage: state}));
        setShuffleStatus("");
    }, 900);
};