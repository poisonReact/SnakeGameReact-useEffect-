import React, { useState, useEffect, useCallback } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import styles from './snake.module.css';
import Snake from './snake';
import SnakeFood from './snakeFood';
import GridArea from './gridArea';
import {
    defineSnakeDirection,
    changeSnakeDots,
    countTimePassed,
    setSnakeDots,
    setIsGameRunningFalse,
    setIsGameRunningTrue,
    startGame,
    getRandomCoordinatesOfFood,
    setSnakeSpeed,
    setRows,
    setColumns,
    setGameAreaDotSize,
    setShowGridTrue,
    setShowGridFalse,
    setShowSettingsTrue,
    setShowSettingsFalse,
    setSnakeCollapsed,
    defineGameScore,
    resetGame
} from '../redux/gameReducer';
import {
    mapToSetHighScore
} from '../redux/highScoreReducer';
import GameSettings from './gameSettings.jsx';
import CollapseAlert from './collapseAlert';
import InfoString from './infoString';


const SnakeGame = (props) => {
    const snakeHeadColor = 'black';
    const snakeHeadMouthColor = 'white';
    const snakeHead = props.snakeDots[props.snakeDots.length - 1];


    let snakeHeadStyle;
    const snakeHeadOnTop = (snakeHead[0] === props.snakeFood[0]) && (snakeHead[1] - props.snakeFood[1] === -1)
    const snakeHeadOnDown = (snakeHead[0] === props.snakeFood[0]) && (snakeHead[1] - props.snakeFood[1] === 1)
    const snakeHeadOnLeft = (snakeHead[0] - props.snakeFood[0] === -1) && (snakeHead[1] === props.snakeFood[1])
    const snakeHeadOnRight = (snakeHead[0] - props.snakeFood[0] === 1) && (snakeHead[1] === props.snakeFood[1])

    if (snakeHeadOnTop) {
        snakeHeadStyle = [styles.snakeDotHeadOnTop, true, snakeHeadColor, snakeHeadColor, snakeHeadColor, snakeHeadMouthColor]
    } else if (snakeHeadOnDown) {
        snakeHeadStyle = [styles.snakeDotHeadOnDown, true, snakeHeadColor, snakeHeadMouthColor, snakeHeadColor, snakeHeadColor]
    } else if (snakeHeadOnLeft) {
        snakeHeadStyle = [styles.snakeDotHeadOnLeft, true, snakeHeadMouthColor, snakeHeadColor, snakeHeadColor, snakeHeadColor]
    } else if (snakeHeadOnRight) {
        snakeHeadStyle = [styles.snakeDotHeadOnRight, true, snakeHeadColor, snakeHeadColor, snakeHeadMouthColor, snakeHeadColor]
    } else {
        snakeHeadStyle = [styles.snakeDotHead, false, snakeHeadColor, snakeHeadColor, snakeHeadMouthColor, snakeHeadColor]
    }

    useEffect(() => {
        checkIfOutOfBorders();
        checkIfCollapsed();
        checkIfEat();
    }, [props.snakeDots])

    useEffect(() => {
        let interval;
        if (props.isGameRunning) {
            interval = setInterval(props.countTimePassed, props.snakeSpeed)
            props.changeSnakeDots()
        }
        return () => {
            clearInterval(interval)
        }
    }, [props.timePassed, props.isGameRunning])

    const handleUserKeyPress = useCallback(event => {
        event = event.keyCode || window.event.keyCode;
        return props.defineSnakeDirection(event)
    }, [props.snakeDirection, props.snakeDots]);

    useEffect(() => {
        window.addEventListener('keydown', handleUserKeyPress);
        return () => {
            window.removeEventListener('keydown', handleUserKeyPress);
        };
    }, [handleUserKeyPress]);

    const checkIfOutOfBorders = () => {
        if (snakeHead[0] >= props.gameAreaColumns || snakeHead[1] >= props.gameAreaRows || snakeHead[0] < 0 || snakeHead[1] < 0) {
            props.setSnakeCollapsed('snake left the permitted area!')
            onGameOver();
        }
    }

    const checkIfCollapsed = () => {
        let snake = [...props.snakeDots];
        let head = snake[snake.length - 1];
        snake.pop();
        snake.forEach(dot => {
            if (head[0] === dot[0] && head[1] === dot[1]) {
                props.setSnakeCollapsed('snake has bitten itself!')
                onGameOver()
            }
        })
    }

    const checkIfEat = () => {
        if (snakeHead[0] === props.snakeFood[0] && snakeHead[1] === props.snakeFood[1]) {
            props.getRandomCoordinatesOfFood()
            props.defineGameScore(20)
            enlargeSnake()
        }
    }

    const enlargeSnake = () => {
        let newSnake = [...props.snakeDots];
        newSnake.unshift([])
        props.setSnakeDots(newSnake)
    }

    const onGameOver = () => {

        props.nickName
            ? props.mapToSetHighScore([props.gameScore, props.nickName.values.nickName])
            : props.mapToSetHighScore([props.gameScore, 'Default player'])
        props.setIsGameRunningFalse()
    }

    const snakeInGameStartNewGame = () => {
        (props.nickName != undefined) && Object.keys(props.nickName).indexOf('syncErrors') != -1
            ? (!props.nickName.syncErrors ? props.startGame() : props.setIsGameRunningFalse())
            : props.startGame()




    }

    const snakeInGamePause = () => {
        props.setIsGameRunningFalse()
    }
    const snakeInGamePlay = () => {
        props.setIsGameRunningTrue()
    }

    return (
        <div>
            <GameSettings
                timePassed={props.timePassed}
                snakeCollapsed={props.snakeCollapsed}
                gameAreaRows={props.gameAreaRows}
                gameAreaColumns={props.gameAreaRows}
                gameAreaDotSize={props.gameAreaDotSize}
                snakeSpeed={props.snakeSpeed}
                showGrid={props.showGrid}
                showSettings={props.showSettings}
                setSnakeSpeed={props.setSnakeSpeed}
                setRows={props.setRows}
                setColumns={props.setColumns}
                setGameAreaDotSize={props.setGameAreaDotSize}
                setShowGridFalse={props.setShowGridFalse}
                setShowGridTrue={props.setShowGridTrue}
                setShowSettingsFalse={props.setShowSettingsFalse}
                setShowSettingsTrue={props.setShowSettingsTrue}
            />


            <InfoString
                highScore={props.highScore}
                timePassed={props.timePassed}
                gameScore={props.gameScore}
                isGameRunning={props.isGameRunning}
                snakeCollapsed={props.snakeCollapsed}
                nickName={props.nickName}
            />

            {props.snakeCollapsed && <CollapseAlert
                snakeCollapsed={props.snakeCollapsed}
                gameScore={props.gameScore}
                resetGame={props.resetGame}
                isGameRunning={props.isGameRunning}
            />}

            <div className={styles.gameArea} style={{ width: props.gameAreaColumns * props.gameAreaDotSize, height: props.gameAreaRows * props.gameAreaDotSize, }}>
                {props.showGrid && <GridArea rows={props.gameAreaRows} columns={props.gameAreaColumns} gameAreaDotSize={props.gameAreaDotSize} />}
                <Snake snakeDotsСoordinates={props.snakeDots} snakeHeadStyle={snakeHeadStyle} gameAreaDotSize={props.gameAreaDotSize} />
                <SnakeFood snakeFoodСoordinates={props.snakeFood} gameAreaDotSize={props.gameAreaDotSize} />
            </div>
            <button onClick={snakeInGameStartNewGame} disabled={props.snakeCollapsed}> Start New Game </button>
            {(props.isGameRunning || props.timePassed === 0)
                ? <button onClick={snakeInGamePause} disabled={props.snakeCollapsed}> Pause </button>
                : <button onClick={snakeInGamePlay} disabled={props.snakeCollapsed}> Play </button>}

        </div>
    )
}


let mapStateToProps = (state) => ({
    gameAreaRows: state.gameData.gameAreaRows,
    gameAreaColumns: state.gameData.gameAreaColumns,
    gameAreaDotSize: state.gameData.gameAreaDotSize,
    snakeDots: state.gameData.snakeDots,
    snakeSpeed: state.gameData.snakeSpeed,
    snakeFood: state.gameData.snakeFood,
    isGameRunning: state.gameData.isGameRunning,
    timePassed: state.gameData.timePassed,
    showGrid: state.gameData.showGrid,
    showSettings: state.gameData.showSettings,
    snakeCollapsed: state.gameData.snakeCollapsed,
    gameScore: state.gameData.gameScore,
    nickName: state.form.nickname,
    highScore: state.highScoreData.highScore
})

export default compose(
    withRouter,
    connect(mapStateToProps, {
        defineSnakeDirection,
        changeSnakeDots,
        countTimePassed,
        setSnakeDots,
        setIsGameRunningFalse,
        setIsGameRunningTrue,
        startGame,
        getRandomCoordinatesOfFood,
        setSnakeSpeed,
        setRows,
        setColumns,
        setGameAreaDotSize,
        setShowGridTrue,
        setShowGridFalse,
        setShowSettingsTrue,
        setShowSettingsFalse,
        setSnakeCollapsed,
        defineGameScore,
        resetGame,
        mapToSetHighScore

    }),
)(SnakeGame)
