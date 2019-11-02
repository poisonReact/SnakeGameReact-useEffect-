
const SET_HIGH_SCORE = 'highScoreReducer/HIGH_SCORE'
const initialState = {
    highScore: [
        [150, 'Default Snake'],
        [140, 'Default Snake'],
        [130, 'Default Snake'],
        [120, 'Default Snake'],
        [110, 'Default Snake'],
        [100, 'Default Snake'],
        [90, 'Default Snake'],
        [80, 'Default Snake'],
    ],
}

const highScoreReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case SET_HIGH_SCORE:
            return {
                ...state,
                highScore: action.payload
            }
            default:
                return state;
        }
    }

const setHighScore = (payload) => {
    return {
        type: SET_HIGH_SCORE,
        payload
    }

}

export const mapToSetHighScore = (payload) => (dispatch, getState) => {
    const { highScoreData } = getState()
        let result = highScoreData.highScore
        let indexOfInsert = 0
        result.map( (val, i) => {
            if (payload[0] < val[0]) {
                indexOfInsert = i + 1
            }
        })

        result.splice(indexOfInsert, 0, payload)


    dispatch(setHighScore(result))

}

    
export default highScoreReducer;
    