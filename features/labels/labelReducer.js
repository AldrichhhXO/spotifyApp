
const initialState = {
    type: 'Top_Artists',
    timeFrame: 'medium'
}


export default function labelReducer(state = initialState, action) {
    switch (action.type) {
    case 'labels/timeframeChanged':
        return {
            ...state,
            timeFrame: action.payload
        }
    case 'labels/dataTypeChanged':
        return {
            ...state,
            type: action.payload
        }
        default: 
            return state
    }
}