/*
src/actions/timerActions.js
*/

let timer = null;
export const startAction = () => dispatch => {
    
    dispatch({
        type: 'START_TIMER',
        payload: 'result_of_simple_action'
    })
}

export const moreAction = () => dispatch => {
    dispatch({
        type: 'MORE_TIMER',
        payload: 'result_of_simple_action'
    })
}

export const pauseAction = () => dispatch => {

    dispatch({
        type: 'PAUSE_TIMER',
        payload: 'result_of_simple_action'
    })
}

export const resetAction = () => dispatch => {
    dispatch({
        type: 'RESET_TIMER',
        payload: 'result_of_simple_action'
    })
}
