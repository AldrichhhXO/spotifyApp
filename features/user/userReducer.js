const initialState = {
    accessToken: '',
    refreshToken: ''
}


export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'user/userLoggedIn':
            return {
                
            }
        default:
            return state
    }
}