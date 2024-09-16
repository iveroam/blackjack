import { useState, useEffect } from 'react';

const CardCount = ({ cardCount }) => {
    const [showCount, setShowCount] = useState(false);
    const [hideOrShow, setHideOrShow] = useState("Show card count: ")

    useEffect(() => {
        if (showCount) {
            setHideOrShow("Hide  hi/lo")
        } else {
            setHideOrShow("Show hi/lo")
        }
    }, [showCount])

    const onShowCount = () => {
        setShowCount(prevShowCount => !prevShowCount);
    };

    return (
        <div className="cardcount-content">
            <button className="count-button" onClick={onShowCount}>
                {hideOrShow}
            </button>
            <h3>{showCount ? cardCount : null}</h3>
        </div>
    );
};

export default CardCount;