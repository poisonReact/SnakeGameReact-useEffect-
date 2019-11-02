import React from 'react';
import styles from './snake.module.css';

const CollapseAlert = ({snakeCollapsed, gameScore, resetGame}) => {

    const resetGameOnClick = () => {
    resetGame()
    }
return (
    <div className={styles.collapseAlertWrapper}>
        <div>{`Unfortunately your ${snakeCollapsed}`}</div>
        <div>{`Your score is ${gameScore} pts`}</div>
        <button onClick={resetGameOnClick} >OK</button>
    </div>
)
}

export default CollapseAlert