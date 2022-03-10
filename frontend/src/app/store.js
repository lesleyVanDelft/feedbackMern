import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import feedbackReducer from '../features/feedbacks/feedbackSlice';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

const reducers = combineReducers({
	auth: authReducer,
	feedbacks: feedbackReducer,
});

const persistConfig = {
	key: 'root',
	storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

// export const store = configureStore({
// 	reducer: {
// 		auth: authReducer,
// 		feedbacks: feedbackReducer,
// 	},
// });
export const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: [thunk],
});

export default store;
