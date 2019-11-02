import React, { useState, useEffect, useCallback } from 'react';
import styles from './snake.module.css';
import sidebarLogo from '../assets/images/sidebarLogo.png'
import cn from 'classnames';


const GameSettings = (
    { snakeCollapsed,
        timePassed,
        gameAreaRow,
        gameAreaColumns,
        gameAreaDotSize,
        snakeSpeed,
        showGrid,
        showSettings,
        setSnakeSpeed,
        setRows,
        setColumns,
        setGameAreaDotSize,
        setShowGridFalse,
        setShowGridTrue,
        setShowSettingsFalse,
        setShowSettingsTrue, }
) => {

    let snakeSpeedValue
    switch (snakeSpeed) {
        case 100:
            snakeSpeedValue = '10'
            break;
        case 200:
            snakeSpeedValue = '9'
            break;
        case 300:
            snakeSpeedValue = '8'
            break;
        case 400:
            snakeSpeedValue = '7'
            break;
        case 500:
            snakeSpeedValue = '6'
            break;
        case 600:
            snakeSpeedValue = '5'
            break;
        case 700:
            snakeSpeedValue = '4'
            break;
        case 800:
            snakeSpeedValue = '3'
            break;
        case 900:
            snakeSpeedValue = '2'
            break;
        case 1000:
            snakeSpeedValue = '1'
            break;
        default:
            break;
    }


    const changeDotSize = (e) => {
        setGameAreaDotSize(e.target.value)
    }

    const changeSnakeSpeed = (e) => {
        if (timePassed === 0) {
            switch (e.target.value) {
                case '10':
                    setSnakeSpeed(100)
                    break;
                case '9':
                    setSnakeSpeed(200)
                    break;
                case '8':
                    setSnakeSpeed(300)
                    break;
                case '7':
                    setSnakeSpeed(400)
                    break;
                case '6':
                    setSnakeSpeed(500)
                    break;
                case '5':
                    setSnakeSpeed(600)
                    break;
                case '4':
                    setSnakeSpeed(700)
                    break;
                case '3':
                    setSnakeSpeed(800)
                    break;
                case '2':
                    setSnakeSpeed(900)
                    break;
                case '1':
                    setSnakeSpeed(1000)
                    break;
                default:
                    break;
            }
        }

    }

    const changeGameArea = (e) => {
        if (timePassed === 0) {
            setRows(e.target.value)
            setColumns(e.target.value)
        }
    }

    const changeShowGrid = () => {
        showGrid ? setShowGridFalse() : setShowGridTrue()
    }

    const changeShowSettings = () => {
        !snakeCollapsed && (showSettings ? setShowSettingsFalse() : setShowSettingsTrue())
    }



    return (
        <div className={styles.gameSettingsWrapper}>
            <div className={styles.gameSettingsHeader}>
                <div onClick={changeShowSettings} className={styles.sidebarLogo} >
                    {showSettings ? <span className={styles.sidebarLogoX}> X </span> :
                        <img src={sidebarLogo} className={styles.sidebarLogoHamburger} />
                    }
                </div>
                <span>Game Settings</span>
            </div>
            <div className={cn({ [styles.gameSettingsNone]: !showSettings }, styles.gameSettings)}>
                <div>
                    <div>Game Area Size {gameAreaColumns}х{gameAreaColumns}</div>
                    <span>5<input type="range" min="5" max="20" step="1" value={gameAreaColumns} onChange={changeGameArea} />20</span>
                </div>
                <div>
                    <div>Game Area Cell Size {gameAreaDotSize} px</div>
                    <span>15<input type="range" min="15" max="45" step="3" value={gameAreaDotSize} onChange={changeDotSize} />45</span>
                </div>
                <div>
                    <div>Game Speed {snakeSpeedValue}</div>
                    <span>1<input type="range" min="1" max="10" step="1" value={snakeSpeedValue} onChange={changeSnakeSpeed} />10</span>
                </div>
                <div>
                    <span>
                        <input type="checkbox" id="showGrid" value="Show grid" checked={showGrid} onChange={changeShowGrid} />
                        <label for="Show grid">Show Grid</label>
                    </span>
                </div>
            </div>

        </div>
    )
}

export default GameSettings