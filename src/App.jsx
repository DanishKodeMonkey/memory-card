import { useState } from 'react';
import './App.css';
import GameBoard from './components/gameBoard';
import ScoreBoard from './components/ScoreBoard';
import Header from './components/header';
import Footer from './components/footer';
import Modal from './components/modal';

function App() {
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(
        localStorage.getItem('highScore') || 0
    );
    const [gameOver, setGameOver] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [newGame, setNewGame] = useState(0);

    const handleGameOver = () => {
        console.log('game over bro...');
        setGameOver(true);
        if (score > highScore) {
            try {
                setHighScore(score);
                localStorage.setItem('highScore', highScore);
            } catch (error) {
                console.error('Error updating high score: ', error);
            }
        }
        setModalOpen(true);
        // add logic to clear gameBoard (via props) and display score modal (TODO)
    };
    const handleTryAgain = () => {
        setScore(0);
        setGameOver(false);
        setNewGame((newGame) => newGame + 1);
    };
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
                            newGame={newGame}
                            score={score}
                            setScore={setScore}
                            onGameOver={handleGameOver}
                        />
                    </div>
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
            {/* Renders gameOver modal when gameOver is true */}
            {gameOver && (
                <Modal
                    isOpen={modalOpen}
                    score={score}
                    highScore={highScore}
                    onTryAgain={handleTryAgain}
                />
            )}
        </div>
    );
}

export default App;
