
const RIGHT = 'gameReducer/RIGHT';
const LEFT = 'gameReducer/LEFT';
const UP = 'gameReducer/UP';
const DOWN = 'gameReducer/DOWN';
const SET_DIRECTION = 'gameReducer/SET_DIRECTION';
const SET_SNAKE_DOTS = 'gameReducer/SET_SNAKE_DOTS';
const SET_SNAKE_FOOD = 'gameReducer/SET_SNAKE_FOOD';
const SET_TIME_PASSED = 'gameReducer/SET_TIME_PASSED';
const SET_IS_GAME_RUNNING_TRUE = 'gameReducer/SET_IS_GAME_RUNNING_TRUE';
const SET_IS_GAME_RUNNING_FALSE = 'gameReducer/SET_IS_GAME_RUNNING_FALSE';
const SET_SNAKE_SPEED = 'gameReducer/SET_SNAKE_SPEED';
const SET_GAME_AREA_DOT_SIZE = 'gameReducer/SET_GAME_AREA_DOT_SIZE';
const SET_ROWS = 'gameReducer/SET_ROWS';
const SET_COLUMNS = 'gameReducer/SET_COLUMNS';
const SET_SHOW_GRID_TRUE = 'gameReducer/SET_SHOW_GRID_TRUE';
const SET_SHOW_GRID_FALSE = 'gameReducer/SET_SHOW_GRID_FALSE';
const SET_SHOW_SETTINGS_TRUE = 'gameReducer/SET_SHOW_SETTINGS_TRUE';
const SET_SHOW_SETTINGS_FALSE = 'gameReducer/SET_SHOW_SETTINGS_FALSE';
const SET_SNAKE_COLLAPSED = 'gameReducer/SET_SNAKE_COLLAPSED';
const SET_GAME_SCORE = 'gameReducer/SET_GAME_SCORE';

const initialState = {
    gameAreaRows: 10,
    gameAreaColumns: 10,
    gameAreaDotSize: '15',
    snakeDots: [[0, 0], [1, 0], [2, 0]],
    snakeSpeed: 100,
    snakeFood: [0, 0],
    snakeDirection: RIGHT,
    isGameRunning: false,
    timePassed: 0,
    showGrid: true,
    showSettings: false,
    snakeCollapsed: false,
    gameScore: 0,
}

const gameReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case SET_GAME_SCORE:
            return {
                ...state,
                gameScore: action.payload
            }
        case SET_SNAKE_COLLAPSED:
            return {
                ...state,
                snakeCollapsed: action.payload
            }
        case SET_SHOW_SETTINGS_TRUE:
            return {
                ...state,
                showSettings: true
            }
        case SET_SHOW_SETTINGS_FALSE:
            return {
                ...state,
                showSettings: false
            }
        case SET_SHOW_GRID_TRUE:
            return {
                ...state,
                showGrid: true
            }
        case SET_SHOW_GRID_FALSE:
            return {
                ...state,
                showGrid: false
            }
        case SET_IS_GAME_RUNNING_TRUE:
            return {
                ...state,
                isGameRunning: true
            }
        case SET_IS_GAME_RUNNING_FALSE:
            return {
                ...state,
                isGameRunning: false
            }
        case SET_DIRECTION:
            return {
                ...state,
                snakeDirection: action.payload
            }
        case SET_TIME_PASSED:
            return {
                ...state,
                timePassed: action.payload
            }
        case SET_SNAKE_DOTS:
            return {
                ...state,
                snakeDots: action.payload
            }
        case SET_SNAKE_FOOD:
            return {
                ...state,
                snakeFood: action.payload
            }
        case SET_ROWS:
            return {
                ...state,
                gameAreaRows: action.payload
            }
        case SET_COLUMNS:
            return {
                ...state,
                gameAreaColumns: action.payload
            }
        case SET_GAME_AREA_DOT_SIZE:
            return {
                ...state,
                gameAreaDotSize: action.payload
            }
        case SET_SNAKE_SPEED:
            return {
                ...state,
                snakeSpeed: action.payload
            }
        default:
            return state;
    }
}


const setGameScore = (payload) => {
    return {
        type: SET_GAME_SCORE,
        payload
    }
}

export const defineGameScore = (payload) => (dispatch, getState) => {
    const { gameData } = getState()
    let result = gameData.gameScore + payload
    dispatch(setGameScore(result))
}

export const setSnakeCollapsed = (payload) => {
    return {
        type: SET_SNAKE_COLLAPSED,
        payload
    }
}

export const setShowSettingsTrue = () => {
    return {
        type: SET_SHOW_SETTINGS_TRUE,
    }
}

export const setShowSettingsFalse = () => {
    return {
        type: SET_SHOW_SETTINGS_FALSE,
    }
}

export const setShowGridTrue = () => {
    return {
        type: SET_SHOW_GRID_TRUE,
    }
}

export const setShowGridFalse = () => {
    return {
        type: SET_SHOW_GRID_FALSE,
    }
}

export const setSnakeSpeed = (payload) => {
    return {
        type: SET_SNAKE_SPEED,
        payload
    }
}

export const setRows = (payload) => {
    return {
        type: SET_ROWS,
        payload
    }
}

export const setColumns = (payload) => {
    return {
        type: SET_COLUMNS,
        payload
    }
}

export const setGameAreaDotSize = (payload) => {
    return {
        type: SET_GAME_AREA_DOT_SIZE,
        payload
    }
}


export const setIsGameRunningTrue = () => {
    return {
        type: SET_IS_GAME_RUNNING_TRUE,
    }
}

export const setIsGameRunningFalse = () => {
    return {
        type: SET_IS_GAME_RUNNING_FALSE,
    }
}

export const resetGame = () => (dispatch) => {
    dispatch(setSnakeFoodCoordinates(initialState.snakeFood))
    dispatch(setSnakeDots(initialState.snakeDots))
    dispatch(setSnakeDirection((initialState.snakeDirection)))
    dispatch(setTimePassed(initialState.timePassed))
    dispatch(setSnakeCollapsed(initialState.snakeCollapsed))
    dispatch(setGameScore(initialState.gameScore))
    dispatch(setShowSettingsFalse())

}

export const startGame = () => (dispatch) => {
    dispatch(resetGame())
    dispatch(setIsGameRunningTrue())
    dispatch(getRandomCoordinatesOfFood())

}


export const countTimePassed = () => (dispatch, getState) => {
    const { gameData } = getState()
    dispatch(setTimePassed(gameData.timePassed + gameData.snakeSpeed))
}

const setTimePassed = (payload) => {
    return {
        type: SET_TIME_PASSED,
        payload
    }
}

export const getRandomCoordinatesOfFood = () => (dispatch, getState) => {
    const { gameData } = getState()
    let arrayOfFieldDots = []
    for (let i = 0; i < gameData.gameAreaRows; i++) {
        for (let j = 0; j < gameData.gameAreaColumns; j++) {
            arrayOfFieldDots.push([j, i])
        }
    }
    let arrayOfFieldDotsJoined = arrayOfFieldDots.map((el) => el.join())
    let snakeDotsJoined = gameData.snakeDots.map((el) => el.join())
    let arrayOfAvailableDots = arrayOfFieldDotsJoined.filter((el) => !snakeDotsJoined.includes(el));
    let randomElement = Math.floor((Math.random() * arrayOfAvailableDots.length));
    let result = arrayOfAvailableDots[randomElement].split(',').map((el) => +el)

    dispatch(setSnakeFoodCoordinates(result))
}

const setSnakeFoodCoordinates = (payload) => {
    return {
        type: SET_SNAKE_FOOD,
        payload
    }
}

export const defineSnakeDirection = (payload) => (dispatch, getState) => {
    const { gameData } = getState()
    const snakeHead = gameData.snakeDots[gameData.snakeDots.length - 1];
    const snakeNeck = gameData.snakeDots[gameData.snakeDots.length - 2];

    switch (payload) {
        case 38:
            snakeHead[1] - snakeNeck[1] === 1
                ? dispatch(setSnakeDirection(gameData.snakeDirection))
                : dispatch(setSnakeDirection(UP));
            break;
        case 40:
            snakeHead[1] - snakeNeck[1] === -1
                ? dispatch(setSnakeDirection(gameData.snakeDirection))
                : dispatch(setSnakeDirection(DOWN));
            break;
        case 37:
            snakeHead[0] - snakeNeck[0] === 1
                ? dispatch(setSnakeDirection(gameData.snakeDirection))
                : dispatch(setSnakeDirection(LEFT));
            break;
        case 39:
            snakeHead[0] - snakeNeck[0] === -1
                ? dispatch(setSnakeDirection(gameData.snakeDirection))
                : dispatch(setSnakeDirection(RIGHT));
            break;
        default:
            return dispatch(setSnakeDirection(gameData.snakeDirection));
    }
}


export const setSnakeDirection = (payload) => {
    return {
        type: SET_DIRECTION,
        payload
    }

}


export const changeSnakeDots = (payload) => (dispatch, getState) => {
    const { gameData } = getState()
    let dots = [...gameData.snakeDots];
    let head = dots[dots.length - 1];

    switch (gameData.snakeDirection) {
        case RIGHT:
            head = [head[0] + 1, head[1]]
            break;
        case LEFT:
            head = [head[0] - 1, head[1]];
            break;
        case DOWN:
            head = [head[0], head[1] + 1];
            break;
        case UP:
            head = [head[0], head[1] - 1];
            break;
    }
    dots.push(head);
    dots.shift();
    dispatch(setSnakeDots(dots));

}

export const setSnakeDots = (payload) => {
    return {
        type: SET_SNAKE_DOTS,
        payload
    }

}





export default gameReducer;