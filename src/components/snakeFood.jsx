import React, {useState, useEffect} from 'react';
import styles from './snake.module.css';

const SnakeFood = ({snakeFoodСoordinates, gameAreaDotSize}) => {
    const style = {
        left: `${snakeFoodСoordinates[0] * gameAreaDotSize}px`,
        top: `${snakeFoodСoordinates[1] * gameAreaDotSize}px`,
        width: `${gameAreaDotSize}px`,
        height: `${gameAreaDotSize}px`,
    }
    return (
        <div className={styles.snakeFood} style={style}>
        </div>
    )
}

export default SnakeFood;