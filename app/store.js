import { configureStore } from "@reduxjs/toolkit";
import rootReducer from './reducer';

// let preloadedState

// // Function for extracting the access and refresh tokens from url if present.
// function parseToken(token) {
//     let splitToken = token.split('-R')
//     return {
//         accessToken: splitToken[0],
//         refreshToken: splitToken[1]
//     }
// }

// const persistedAccessToken = localStorage.getItem('acccess-token')
// if (persistedAccessToken) preloadedState = parseToken(persistedAccessToken)

const store = configureStore(rootReducer)
