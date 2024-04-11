import { useState, useEffect } from 'react';
import { fetchCatImages } from './api';
import Card from './card';
import '../styles/gameBoard.css';

export default function GameBoard({ score, setScore, onGameOver, newGame }) {
    // Manage cards state
    const [cards, setCards] = useState([]);

    // Initialize game on component mount
    useEffect(() => {
        startNewGame(); // Call the async function inside useEffect

        // dependency, trigger once on mount.
    }, []);

    // Initialise new game on state change
    useEffect(() => {
        if (newGame) {
            startNewGame(); // Call the async function inside useEffect
        }
        // dependency, trigger on state change.
    }, [newGame]);

    const startNewGame = async () => {
        // get cat.http images
        try {
            const catImageUrls = await fetchCatImages(); // api.js
            // assign cat images to cards
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

    // event handler for card clicks,
    const handleCardClick = (index) => {
        //check if card was touched before
        if (cards[index].touched) {
            onGameOver();
        }
        // if not, update the score
        setScore(score + 1);
        // marks card as touched. in new copy of state array
        const updatedCards = [...cards];
        updatedCards[index].touched = true;
        // then shuffle the cards in copy of state array
        const shuffledCards = shuffleArray(updatedCards);
        // and update state with copy of state array
        setCards(shuffledCards);
    };

    // function using fisher yates shuffle algorithmn for shuffling the array (thanks internet)
    const shuffleArray = (array) => {
        // accept an array, making a copy.
        const newArray = [...array];
        // Iterate in reverse, starting from the second to last element, down to the first.
        for (let i = newArray.length - 1; i > 0; i--) {
            // for each iteration, pick a random array index, from 0 to i
            const j = Math.floor(Math.random() * (i + 1));
            // swap the elements at indices i and j
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
            // repeat until i > 0 (beginning of array)
        }
        // return shuffled array
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
