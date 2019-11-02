import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './infoString.module.css';
import NickNameFormContainer from './nickNameForm';

const InfoString = ({ snakeCollapsed,
    gameScore,
    timePassed,
    isGameRunning,
    nickName,
    highScore }) => {

    let [nickNameEdit, setNickNameEdit] = useState(false)

    let playerNickName = nickName != undefined
        ? (Object.keys(nickName).indexOf('values') != -1
            ? nickName.values.nickName : 'Default player')
        : 'Default player'

    const millisToMinutesAndSeconds = (time) => {
        let minutes = Math.floor(time / 60000);
        let seconds = ((time % 60000) / 1000).toFixed(0)

        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    const setNickNameEditTrue = () => {
        setNickNameEdit(true)
    }
    const setNickNameEditFalse = () => {
        !nickName.syncErrors && setNickNameEdit(false)
    }
    return (
        <div className={styles.infoStringWrapper}>

            <div className={styles.nickNameWrapper}>
                <div className={styles.nickNameLabel}>Your NickName:</div>
                {nickNameEdit
                    ? <NickNameFormContainer setNickNameEditFalse={setNickNameEditFalse} />
                    : <div className={styles.nickNameBox} onDoubleClick={setNickNameEditTrue}>
                        <div className={styles.nickName}>{playerNickName}</div>
                        <div className={styles.nickNameToEdit}>(double click to edit)</div>
                    </div>}
            </div>
            <div>
                <div>{`Your score`}</div>
                <div>{`${gameScore} pts`}</div>
            </div>
            <div>
                <div>Game time</div>
                <div>{millisToMinutesAndSeconds(timePassed)}</div>
            </div>
            <div>
                <div>HIGH SCORE {highScore[0][0]}</div>
                <NavLink to='/highscore'>to leaderboard</NavLink>
            </div>
        </div>
    )
}

export default InfoString