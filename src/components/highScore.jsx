import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styles from './highScore.module.css';

const HighScore = ({highScore}) => {

    return (
        
        <div>
            <NavLink to='/'>back to game</NavLink>
            <div className={styles.listItemHeader} style={{backgroundColor: 'pink'}}> 
               <span className={styles.position}><b>Pos.</b></span>
               <span className={styles.nickName}><b>NickName</b></span>
               <span className={styles.result}><b>Score</b></span>
               </div>
           {highScore && highScore.map( (val, i) => {
               
               return (
               <div className={styles.listItem}> 
               <span className={styles.position}>{i + 1 }</span>
               <span className={styles.nickName}>{val[1]}</span>
               <span className={styles.result}>{val[0]}</span>
               </div>)
           } ) }
           
        </div>
    )


}


let mapStateToProps = (state) => ({
    highScore: state.highScoreData.highScore
})

export default compose(
    withRouter,
    connect(mapStateToProps, {   
    }),
)(HighScore)
