/*
 src/reducers/timerReducer.js
*/
const initialState = {
initialcounter: undefined,
counterdecrement: undefined,
counter: undefined,
baseTime: undefined
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'START_TIMER':
            return {
            result: action.payload
            }
        case 'PAUSE_TIMER':
            return {
                result: action.payload
            }
        case 'RESET_TIMER':
            return {
                result: action.payload
            }
        default:
            return state
    }
}