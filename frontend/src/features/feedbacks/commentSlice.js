import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import commentService from './commentService';

const initialState = {
	comments: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const addComment = createAsyncThunk(
	'comment/addComment',
	async (data, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await commentService.addComment(data, token);
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

export const commentSlice = createSlice({
	name: 'comment',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(addComment.pending, state => {
				state.isLoading = true;
			})
			.addCase(addComment.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.comments.push(action.payload.text);
			})
			.addCase(addComment.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});
