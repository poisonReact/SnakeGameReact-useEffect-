import React, {useState, useEffect} from 'react';
import styles from './snake.module.css';
import cn from 'classnames'

const Snake = ({snakeDotsСoordinates, snakeHeadStyle, gameAreaDotSize}) => {
    
    return (
        <div>
            {snakeDotsСoordinates.map((dot, i) => {
                const style = {
                    left: `${dot[0] * gameAreaDotSize}px`,
                    top: `${dot[1] * gameAreaDotSize}px`,
                    width: `${((i == snakeDotsСoordinates.length - 1) && (snakeHeadStyle[1])) ? 0 : gameAreaDotSize}px`,
                    height: `${((i == snakeDotsСoordinates.length - 1) && (snakeHeadStyle[1])) ? 0 : gameAreaDotSize}px`,
                    borderRight: `${((i == snakeDotsСoordinates.length - 1) && (snakeHeadStyle[1])) ? gameAreaDotSize/2 : 0}px solid ${snakeHeadStyle[2]}`,
                    borderTop: `${((i == snakeDotsСoordinates.length - 1) && (snakeHeadStyle[1])) ? gameAreaDotSize/2 : 0}px solid ${snakeHeadStyle[3]}`,
                    borderLeft: `${((i == snakeDotsСoordinates.length - 1) && (snakeHeadStyle[1])) ? gameAreaDotSize/2 : 0}px solid ${snakeHeadStyle[4]}`,
                    borderBottom: `${((i == snakeDotsСoordinates.length - 1) && (snakeHeadStyle[1])) ? gameAreaDotSize/2 : 0}px solid ${snakeHeadStyle[5]}`,

 

                }
                return (
                    <div className={ cn({[snakeHeadStyle[0]]: i == snakeDotsСoordinates.length - 1}, styles.snakeDot)} key={i} style={style}></div>
                )
            })}
            
        </div>
    )
}

export default Snake;