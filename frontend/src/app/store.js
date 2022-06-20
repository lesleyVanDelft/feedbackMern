// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../features/auth/authSlice';
// import feedbackReducer from '../features/feedbacks/feedbackSlice';
// import storage from 'redux-persist/lib/storage';
// import { combineReducers } from '@reduxjs/toolkit';
// import { persistReducer } from 'redux-persist';
// import thunk from 'redux-thunk';

// const reducers = combineReducers({
// 	auth: authReducer,
// 	feedbacks: feedbackReducer,
// });

// const persistConfig = {
// 	key: 'root',
// 	storage,
// };

// const persistedReducer = persistReducer(persistConfig, reducers);

// // export const store = configureStore({
// // 	reducer: {
// // 		auth: authReducer,
// // 		feedbacks: feedbackReducer,
// // 	},
// // });
// export const store = configureStore({
// 	reducer: persistedReducer,
// 	devTools: process.env.NODE_ENV !== 'production',
// 	middleware: [thunk],
// });

// export default store;

// pre redux persist test v2
///////////////////////////
// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
// // import notificationReducer from './reducers/notificationReducer';
// import userReducer from '../reducers/userReducer';
// import feedbackReducer from '../reducers/feedbackReducer';
// // import feedbackCommentsReducer from '../reducers/feedbackCommentsReducer';
// import feedbackPageReducer from '../reducers/feedbackCommentsReducer';
// import errorReducer from '../reducers/errorReducer';

// const reducer = combineReducers({
// 	user: userReducer,
// 	//   notification: notificationReducer,
// 	feedbacks: feedbackReducer,
// 	// singleFeedback: feedbackCommentsReducer,
// 	singleFeedback: feedbackPageReducer,
// 	errorMessage: errorReducer,
// });

// export const store = createStore(
// 	reducer,
// 	composeWithDevTools(applyMiddleware(thunk))
// );

// export default store;
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import userReducer from '../reducers/userReducer';
import feedbackReducer from '../reducers/feedbackReducer';
import feedbackPageReducer from '../reducers/feedbackCommentsReducer';
import errorReducer from '../reducers/errorReducer';
import tempUserReducer from '../reducers/tempUserReducer';

const persistConfig = {
	key: 'root',
	storage,
	// blacklist: ['user.profileImg.imageId'],
};

// const userPersistConfig = {
// 	key: 'user',
// 	storage,
// 	blacklist: ['user.profileImg.imageId'],
// };
const reducer = combineReducers({
	user: userReducer,
	feedbacks: feedbackReducer,
	singleFeedback: feedbackPageReducer,
	errorMessage: errorReducer,
	tempUser: tempUserReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: [thunk],
});

export default store;
