import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import userReducer from '../reducers/userReducer';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import { setProfileImage } from '../reducers/userReducer';
import axios from 'axios';

const Test = () => {
	return (
		<>
			<LoadingSpinner />
		</>
	);
};

export default Test;
