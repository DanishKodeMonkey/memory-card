import '../styles/modal.css';

const Modal = ({ isOpen, score, highScore, onTryAgain }) => {
    if (!isOpen) return null;

    return (
        <div className='modal'>
            <div className='modal-content'>
                <h2>Game Over!</h2>
                <p>Score: {score}</p>
                <hr />
                <p>High Score: {highScore}</p>
                <button onClick={onTryAgain}>Try again?</button>
            </div>
        </div>
    );
};

export default Modal;
