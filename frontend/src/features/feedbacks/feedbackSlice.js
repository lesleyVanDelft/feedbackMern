import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import feedbackService from './feedbackService';

const initialState = {
	feedbacks: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

// Create new feedback
export const createFeedback = createAsyncThunk(
	'feedback/create',
	async (feedbackData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await feedbackService.createFeedback(feedbackData, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// get user feedbacks
export const getFeedbacks = createAsyncThunk(
	'feedback/getAll',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await feedbackService.getFeedbacks(token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// get single feedback
export const getSingleFeedback = createAsyncThunk(
	'feedback/getOne',
	async (id, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await feedbackService.getSingleFeedback(id, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// delete feedback
export const deleteFeedback = createAsyncThunk(
	'feedback/delete',
	async (id, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await feedbackService.deleteFeedback(id, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// feedback slice
export const feedbackSlice = createSlice({
	name: 'feedback',
	initialState,
	reducers: {
		reset: state => initialState,
	},
	extraReducers: builder => {
		builder
			.addCase(createFeedback.pending, state => {
				state.isLoading = true;
			})
			.addCase(createFeedback.fulfilled, (state, action) => {
				state.isSuccess = true;
				state.isLoading = false;
				state.feedbacks.push(action.payload);
			})
			.addCase(createFeedback.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getFeedbacks.pending, state => {
				state.isLoading = true;
			})
			.addCase(getFeedbacks.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.feedbacks = action.payload;
			})
			.addCase(getFeedbacks.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getSingleFeedback.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getSingleFeedback.pending, state => {
				state.isLoading = true;
			})
			.addCase(getSingleFeedback.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.feedbacks = action.payload;
			})
			.addCase(deleteFeedback.pending, state => {
				state.isLoading = true;
			})
			.addCase(deleteFeedback.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.feedbacks = state.feedbacks.filter(
					feedback => feedback._id !== action.payload.id
				);
			})
			.addCase(deleteFeedback.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = feedbackSlice.actions;
export default feedbackSlice.reducer;
