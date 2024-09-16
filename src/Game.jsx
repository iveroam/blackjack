import React from 'react';
import { useState, useEffect } from 'react'

import './styles/Betting.css'
import './styles/Hand.css'
import './styles/Buttons.css'
import './styles/Count.css'
import './styles/Result.css'
import './styles/Controls.css'
import './styles/Bank.css'
import './styles/Decks.css'

import { createDeck, reshuffle } from './utils/deck'
import { calculateScore, calculateDealerScore, calculateValue, turnHolecard } from './utils/gameLogic'

import Dealer from './components/Dealer';
import Controls from './components/Controls';
import PlayAgain from './components/PlayAgain';
import Player from './components/Player'
import Deal from './components/Deal';
import Bank from './components/Bank';
import Bets from './components/Bets';
import Result from './components/Result'
import Decks from './components/Decks'
import CardCount from './components/CardCount'
import DeckCount from './components/DeckCount'

const Game = () => {
    const [deck, setDeck] = useState({
        deck: createDeck(4),
        numDecks: 4,
        cutCard: null
    });

    const [dealer, setDealer] = useState({hand: [], score: 0});
    const [player, setPlayer] = useState({hand: [], score: 0});

    const [gameState, setGameState] = useState({
        gameStage: "BETTING",
        isFirstRound: false
    });

    const [money, setMoney] = useState({
        bets: 0,
        bank: 1000
    });

    const [result, setResult] = useState("");
    const [shuffleStatus, setShuffleStatus] = useState("");
    const [count, setCount] = useState(0);
    const [shouldStand, setShouldStand] = useState(false);

    useEffect(() => {
        let index = deck.deck.length*0.25;
        setDeck({...deck, cutCard: index});
    }, []);

    useEffect(() => {
        if (shouldStand) {
            stand();
            setShouldStand(false);
        }
    }, [shouldStand]);

    const readyStates = (upcards) => {
        setGameState({ gameStage: "PLAYING", isFirstRound: true});
        setResult("");
        setCount(prevCount => prevCount += calculateValue(upcards))
    }

    const deal = () => {
        let localDeck;

        if (deck.deck.length < deck.cutCard) {
            localDeck = createDeck(deck.numDecks);
            setCount(0);
            reshuffle(setGameState, setShuffleStatus, "PLAYING")
            setTimeout(() => {
                finalizeDeal(localDeck)
            }, 900)
        } else {
            localDeck = [...deck.deck];
            finalizeDeal(localDeck)
        }
    }

    const finalizeDeal = (localDeck) => {
        const playerHand = [localDeck.pop(), localDeck.pop()];
        const dealerHand = [localDeck.pop(), localDeck.pop()];

        const playerScore = calculateScore(playerHand)
        const dealerScore = calculateScore([dealerHand[1]])

        const readyPlayer = { hand: playerHand, score: playerScore }
        const readyDealer = { hand: dealerHand, score: dealerScore }

        setPlayer(readyPlayer)
        setDealer(readyDealer);
        setDeck({...deck, deck: localDeck})

        readyStates([...playerHand, dealerHand[1]]);
        
        if (playerScore === 21) {
            turnHolecard(dealer, setDealer, setCount)
            gameOver(100)
        }
    };

    const handlePlayerAction = (action) => {
        gameState.isFirstRound && setGameState({
            ...gameState, 
            isFirstRound: !gameState.isFirstRound
        })

        switch (action) {
            case 'hit':
                hit(false)
                break;
            case 'double':
                hit(true)
                break;
            case 'stand':
                stand()
                break;
            case 'surrender':
                surrender()
                break;
            default:
                break;
        }
    }

    const hit = (isDouble) => {
        let localDeck = [...deck.deck]
        const newCard = localDeck.pop()
        const newHand = [...player.hand, newCard];
        const newScore = calculateScore(newHand);
        const newPlayer = { hand: newHand, score: newScore};

        isDouble && setMoney(prevMoney => ({
            bank: prevMoney.bank-prevMoney.bets, 
            bets: prevMoney.bets*2
        }))

        setDeck({...deck, deck: localDeck});
        setCount(prevCount => prevCount += calculateValue([newCard]))
        setPlayer(newPlayer)

        if (newScore === 21) {
            turnHolecard(dealer, setDealer, setCount)
            gameOver(1)
        } else if (newScore > 21) {
            turnHolecard(dealer, setDealer, setCount)
            gameOver(-1)
        } else if (isDouble){
            setShouldStand(true);
        }
    }

    const stand = () => {
        const dealerScore = calculateDealerScore(
            deck, 
            setDeck, 
            dealer, 
            setDealer, 
            setCount
        );

        if (player.score === dealerScore) {
            gameOver(0);
        } else if (dealerScore === 21) {
            gameOver(-1)
        } else if (dealerScore > 21 || player.score > dealerScore) {
            gameOver(1)
        } else {
            gameOver(-1)
        }
    };

    const surrender = () => {
        const dealerScore = turnHolecard(dealer, setDealer, setCount)

        if (dealerScore === 21) {
            gameOver(-1)
        } else {
            gameOver(-100)
        }
    }

    const gameOver = (result) => {
        setGameState({...gameState, gameStage: "RESULTS"});
        
        switch (result) {
            case 100:
                setMoney({
                    ...money, 
                    bank: money.bank + money.bets + (money.bets * 1.5)
                })
                setResult('Blackjack!')
                break;
            case 1:
                setMoney(prevMoney => ({
                    ...prevMoney, 
                    bank: prevMoney.bank + (prevMoney.bets * 2)
                }))
                setResult('You win!')
                break;
            case 0:
                setMoney(prevMoney => ({
                    ...prevMoney, 
                    bank: prevMoney.bank + prevMoney.bets
                }))
                setResult('Push!')
                break;
            case -1:
                setResult('Dealer wins!')
                break;
            case -100:
                const halfBet = Math.floor(money.bets / 2);
                setMoney({
                    ...money, 
                    bank: money.bank + halfBet
                })
                setResult('You surrendered')
                break;
            default:
                break;
        }
    }

    const handlePlayAgain = () => {
        setGameState({...gameState, gameStage: "BETTING"});
        setPlayer({hand: [], score: 0})
        setMoney({...money, bets: 0})
    }

    const changeBet = (wager) => {
        if ((wager > 0 && money.bank >= wager) || 
            (wager < 0 && money.bets + wager >= 0)
        ) {
            setMoney({bank: money.bank-wager, bets: money.bets + wager})
        }
    };

    const reset = (numDecks) => {
        const newDeck = createDeck(numDecks)
        reshuffle(setGameState, setShuffleStatus, 'BETTING');

        setDeck({deck: newDeck, 
            numDecks: numDecks, 
            cutCard: newDeck.length*0.25
        })
        setDealer({hand: [], score: 0});
        setPlayer({hand: [], score: 0});
        setMoney({bets: 0, bank: 1000});
        setResult("");
        setCount(0);
        setShouldStand(false);
    }

    return (
        <>
            <div className="cardcount-section">
                <CardCount 
                    cardCount={count}
                />
            </div>

            <div className="num-decks">
                <Decks
                    deck={deck}
                    setDeck={setDeck}
                    onReset={reset}
                />
            </div>

            <div className="table"/>

            { gameState.gameStage != "SHUFFLING" && (
                <div className="deckcount-section">
                    <DeckCount 
                        deckCount={deck.deck.length}
                    />
                </div>
            )}

            { gameState.gameStage != "BETTING" && 
            gameState.gameStage != "SHUFFLING" ? (
                <div className="dealer-section">
                    <Dealer
                        gameStage={gameState.gameStage}
                        hand={dealer.hand}
                        score={dealer.score}
                    />
                </div>
            ) : (
                null
            )}

            <div className="controls-section">
                {gameState.gameStage === "RESULTS" ? (
                    <PlayAgain
                        onPlayAgain={handlePlayAgain}
                    />
                ) : gameState.gameStage === "BETTING" ? (
                    <Deal
                        onDeal={deal}
                        bets={money.bets}
                />
                ) : gameState.gameStage === "SHUFFLING" ? (
                    <div>
                        <h2>{shuffleStatus}</h2>
                    </div>
                ) : (
                    <Controls 
                        isFirstRound={gameState.isFirstRound}
                        onHandlePlayerAction={handlePlayerAction}
                    />
                )}
            </div>

            { gameState.gameStage != "BETTING" && 
            gameState.gameStage != "SHUFFLING" ? (
                <div className="player-section">
                    <Player
                        hand={player.hand}
                        score={player.score}
                    />
                </div>
            ) : (
                null
            )}

            { gameState.gameStage === 'RESULTS' ? (
                <div className="result-section">
                    <Result result={result}/>
                </div>
            ) : (
                null
            )}

            <div className="betting-section">
                <Bets bets={money.bets}/>
            </div>

            {gameState.gameStage === "BETTING" ?
                <div className="player-section">
                    <h1> PLACE BETS → </h1>
                </div>
            : null
            }

            <div className="bank-section">
                <Bank 
                    betting={gameState.gameStage === "BETTING"} 
                    onChangeBet={changeBet} bank={money.bank} 
                    bet={money.bets}
                />
            </div>
        </>
    )
}

export default Game;