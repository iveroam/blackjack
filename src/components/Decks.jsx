import { useState } from 'react'

const Decks = ({deck, onReset}) => {
    const [isOpen, setIsOpen] = useState(false)

    const options = [1, 2, 4, 6, 8]

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const handleOptionClick = (num) => {
        setIsOpen(false);
        onReset(num);
    }

    return (
        <div className="dropdown">
            <button onClick={toggleDropdown} className="dropdown-button">
                Decks: {deck.numDecks}
            </button>
            {isOpen && (
                <ul className="dropdown-menu">
                    {options.map((option) => (
                        <li
                            key={option}
                            onClick={() => handleOptionClick(option)}
                            className="dropdown-item"
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Decks;