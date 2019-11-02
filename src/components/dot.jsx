import React from 'react';
import styles from './snake.module.css';

const Dot = ({dotClass, dotId, gameAreaDotSize}) => {
    const style = {
        width: `${gameAreaDotSize}px`,
        height: `${gameAreaDotSize}px`,
    }

    const stylePixel = {
        width: `${gameAreaDotSize/15}px`,
        height: `${gameAreaDotSize/15}px`,
    }
    return (
        <div
        className={styles.dot}
        id={dotId} 
        style={style}
        >
        <div className={styles.pixel} style={stylePixel}></div>    
        </div>
            
    )
}

export default Dot;