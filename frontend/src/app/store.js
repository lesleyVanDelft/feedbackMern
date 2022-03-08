import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import feedbackReducer from '../features/feedbacks/feedbackSlice';
export const store = configureStore({
	reducer: {
		auth: authReducer,
		feedbacks: feedbackReducer,
	},
});
