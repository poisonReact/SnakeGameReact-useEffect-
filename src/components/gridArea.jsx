import React from 'react';
import styles from './snake.module.css';
import Dot from './dot';

const GridArea = ({rows, columns, gameAreaDotSize}) => {
    const width = columns * gameAreaDotSize
    let rowsArr = []

    for (let i=0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let dotId = i + '_' +j;

            rowsArr.push(
                <Dot
                dotClass={styles.dot}
                key={dotId}
                dotId={dotId}
                row={i}
                column={j}
                gameAreaDotSize={gameAreaDotSize}
                
                />
            )
        }
    }
    return (
        <div className={styles.grid} style={{width: width}}>
            {rowsArr}
        </div>
            
    )
}

export default GridArea;