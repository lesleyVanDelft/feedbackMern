import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const user = localStorage.getItem('user');
const initState = {
	user: user ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

// export const loginUser = createAsyncThunk('user/login', async (user) =>{

// })
