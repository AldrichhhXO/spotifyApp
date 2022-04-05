import { combineReducers } from 'redux'

import labelReducer from '../features/labels/labelReducer'
import userReducer from '../features/user/userReducer'

 const rootReducer = combineReducers({
    labelReducer,
    userReducer
})


