import { useState, useEffect } from 'react';
import { fetchCatImages } from './api';
import Card from './card';

export default function GameBoard() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const catImageUrls = await fetchCatImages(); // Await the result of fetchCatImages
                const newCards = catImageUrls.map((imageUrl) => ({
                    imageUrl,
                    flipped: false,
                }));
                setCards(newCards);
            } catch (error) {
                console.error('Error fetching cat images:', error);
            }
        };

        fetchData(); // Call the async function inside useEffect
    }, []);

    return (
        <div className='game-board'>
            {cards.map((card, index) => (
                <Card
                    key={index}
                    imageUrl={card.imageUrl}
                />
            ))}
        </div>
    );
}
