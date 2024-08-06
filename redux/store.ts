import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const authPresistConfig = (
    {
        key: 'user',
        storage,
        whitelist: ['currentUser'],
    }
)

const rootReducer = combineReducers({
    user: persistReducer(authPresistConfig, userReducer),
})



export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false
            }),
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']