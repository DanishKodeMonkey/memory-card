import { useState } from 'react';
import './App.css';
import GameBoard from './components/gameBoard';
import ScoreBoard from './components/ScoreBoard';

function App() {
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(
        localStorage.getItem('highScore') || 0
    );
    const [gameOver, setGameOver] = useState(false);

    const handleGameOver = () => {
        setGameOver(true);
        if (score > highScore) {
            try {
                setHighScore(score);
                localStorage.setItem('highScore', highScore);
            } catch (error) {
                console.error('Error updating high score: ', error);
            }
        }
        // add logic to clear gameBoard (via props) and display score modal (TODO)
    };
    if (gameOver) {
        console.log('Game over man... game over!');
    }
    return (
        <div className='app'>
            <ScoreBoard
                score={score}
                highScore={highScore}
            />
            <GameBoard
                score={score}
                setScore={setScore}
                gameOver={gameOver}
                onGameOver={handleGameOver}
            />
        </div>
    );
}

export default App;
