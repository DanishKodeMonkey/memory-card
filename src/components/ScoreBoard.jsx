const ScoreBoard = ({ score, highScore }) => {
    return (
        <div className='scoreboard'>
            <div className='scoreboard-section'>
                <span className='score'>Score: {score}</span> <hr />
                <span className='high-score'>High score: {highScore}</span>
            </div>
        </div>
    );
};

export default ScoreBoard;
