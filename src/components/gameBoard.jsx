import { useState, useEffect } from 'react';
import { fetchCatImages } from './api';
import Card from './card';
import '../styles/gameBoard.css';

export default function GameBoard() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        // get cat.http images
        const fetchData = async () => {
            try {
                const catImageUrls = await fetchCatImages(); // api.js
                const newCards = catImageUrls.map((imageUrl) => ({
                    imageUrl,
                    touched: false,
                }));
                // add cards to state
                setCards(newCards);
            } catch (error) {
                console.error('Error fetching cat images:', error);
            }
        };

        fetchData(); // Call the async function inside useEffect
    }, []);

    // event handler for card clicks,
    const handleCardClick = (index) => {
        console.log('click');
        // marks card as touched.
        const updatedCards = [...cards];
        updatedCards[index].touched = true;
        setCards(updatedCards);

        // shuffles array
        const shuffledCards = shuffleArray(updatedCards);
        setCards(shuffledCards);
    };

    // function using fisher yates shuffle algorithmn for shuffling the array (thanks internet)
    const shuffleArray = (array) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };
    return (
        <div className='game-board'>
            {cards.map((card, index) => (
                <Card
                    key={index}
                    imageUrl={card.imageUrl}
                    onClick={() => handleCardClick(index)}
                />
            ))}
        </div>
    );
}
