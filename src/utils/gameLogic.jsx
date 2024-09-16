const cardValues = new Set(['2', '3', '4', '5', '6', '7', '8', '9', '10']);

export const calculateScore = (hand) => {
    let score = 0
    let numberOfAces = 0

    hand.forEach(card => {
        if (['J', 'Q', 'K'].includes(card.value)) {
            score += 10
        } else if (cardValues.has(card.value)) {
            score += parseInt(card.value)
        } else if (card.value === 'A') {
            score += 11
            numberOfAces += 1
        }
    });

    while (score > 21 && numberOfAces > 0) {
        score -= 10;
        numberOfAces -= 1;
    }

    return score;
};

export const calculateDealerScore = (deck, setDeck, dealer, setDealer, setCount) => {
    let localDeck = [...deck.deck]
    let upcards = [dealer.hand[0]];

    let dealerHand = dealer.hand;
    let dealerScore = calculateScore(dealerHand)

    let newCard;

    while (dealerScore < 17 && localDeck.length > 0) {
        newCard = localDeck.pop()
        upcards.push(newCard)
        dealerHand = [...dealerHand, newCard]
        dealerScore = calculateScore(dealerHand)
    }

    setDealer({ hand: dealerHand, score: dealerScore })
    setDeck(prevDeck => ({...prevDeck, deck: localDeck}))
    setCount(prevCount => prevCount += calculateValue(upcards))
    return dealerScore
}

export const turnHolecard = (dealer, setDealer, setCount) => {
    const newDealerScore = calculateScore(dealer.hand)
    setCount(prevCount => prevCount + calculateValue([dealer.hand[0]]))
    setDealer(prevDealer => ({...prevDealer, score: newDealerScore}))
    return newDealerScore
}

export const calculateValue = (cards) => {

    if (!Array.isArray(cards)) {
        throw new Error("Undefined input in calculateValue");
    }

    let count = 0;

    cards.forEach(card => {
        if (card && card.value) {
            if (['2', '3', '4', '5', '6'].includes(card.value)) {
                count += 1
            } else if (['10', 'J', 'Q', 'K', 'A'].includes(card.value)) {
                count -= 1
            }
        } else {
            console.error("Encountered undefined card!!")
        }
    })
    return count
}