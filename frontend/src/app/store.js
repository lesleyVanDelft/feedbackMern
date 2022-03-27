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
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
// import notificationReducer from './reducers/notificationReducer';
import userReducer from '../reducers/userReducer';
import feedbackReducer from '../reducers/feedbackReducer';
// import subReducer from '../reducers/subReducer';
// import CommentsReducer from '../reducers/postCommentsReducer';
// import userPageReducer from '../reducers/userPageReducer';
// import subPageReducer from '../reducers/subPageReducer';
// import searchReducer from '../reducers/searchReducer';
// import themeReducer from '../reducers/themeReducer';
import feedbackCommentsReducer from '../reducers/feedbackCommentsReducer';

const reducer = combineReducers({
	user: userReducer,
	//   notification: notificationReducer,
	feedbacks: feedbackReducer,
	feedbackComments: feedbackCommentsReducer,
});

export const store = createStore(
	reducer,
	composeWithDevTools(applyMiddleware(thunk))
);

export default store;
