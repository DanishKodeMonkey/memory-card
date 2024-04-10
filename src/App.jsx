import { useState } from 'react';
import './App.css';
import GameBoard from './components/gameBoard';
import ScoreBoard from './components/ScoreBoard';
import Header from './components/header';
import Footer from './components/footer';

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
            <header>
                <Header />
            </header>
            <main>
                <div className='game-container'>
                    <div className='rules-and-scoreboard-container'>
                        <div className='rules-container'>
                            <ol aria-label='game rules'>
                                <li>Click on a funny HTTP cat card</li>
                                <li>
                                    The cards will shuffle, click another card,
                                    without clicking a previously clicked card
                                </li>
                                <li>
                                    Repeat the process until you either win or
                                    lose
                                </li>
                            </ol>
                        </div>
                        <ScoreBoard
                            score={score}
                            highScore={highScore}
                        />
                    </div>
                    <div className='gameBoard-container'>
                        <GameBoard
                            score={score}
                            setScore={setScore}
                            gameOver={gameOver}
                            onGameOver={handleGameOver}
                        />
                    </div>
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default App;
