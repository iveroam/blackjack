import React from 'react';

const Bank = ({ betting, onChangeBet, bank }) => {
    const takeChips = [-1, -5, -25, -50, -100];
    const giveChips = [1, 5, 25, 50, 100];

    return (
        <div className="bank-grid">
            <h2> Bank: ${bank}</h2>
            { betting ? (
                <div className="money-grid">
                    {giveChips.map((b, i) => (
                        <button 
                            className="bank-button"
                            key={`give-${i}`}
                            onClick={() => onChangeBet(b)}
                        >
                            + ${b}
                        </button>
                    ))}
                    {takeChips.map((b, i) => (
                        <button 
                            className="bank-button"
                            key={`take-${i}`}
                            onClick={() => onChangeBet(b)}
                        >
                            - ${Math.abs(b)}
                        </button>
                    ))}
                </div>
            ) : null
            }
        </div>
    );
}

export default Bank;