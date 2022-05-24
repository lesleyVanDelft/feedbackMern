import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { setUser } from '../../reducers/userReducer';
import { motion, AnimatePresence } from 'framer-motion';
import { GoPencil } from 'react-icons/go';
import BlankProfilePic from '../../assets/blank-profile-picture.png';
import BackBtn from '../../components/Buttons/BackBtn/BackBtn';
import EmptyFeedback from '../../components/EmptyFeedback/EmptyFeedback';
import FeedbackItem from '../../components/FeedbackItem/FeedbackItem';
import ImageModal from '../../components/ImageModal/ImageModal';
import LogoBar from '../../components/LogoBar/LogoBar';
import PageLogo from '../../components/PageLogo/PageLogo';
import UserModal from './UserModal/UserModal';
import './User.css';
import axios from 'axios';

const User = () => {
	const [active, setActive] = useState(false);
	const [imgModal, setImgModal] = useState(false);
	const [image, setImage] = useState();
	const user = useSelector(state => state.user);
	const feedbacks = useSelector(state => state.feedbacks);
	const userFeedbacks = feedbacks.filter(
		feedback => feedback.author === user.id
	);

	const dispatch = useDispatch();

	const isMobile = useMediaQuery({
		query: '(max-width: 768px)',
	});

	// Get state from inside IMAGE modal, to close
	const getImageModal = mdl => {
		setImgModal(mdl);
	};

	// Get image state from USER dropdown modal
	const getImage = img => {
		setImage(img);
	};

	const getUser = async () => {
		const response = await axios.get('/user');
		return response.data;
	};

	useEffect(() => {
		getUser();
	}, []);

	useEffect(() => {
		dispatch(setUser());
	}, [dispatch]);

	// Reset body overflow
	useEffect(() => {
		document.body.style.overflow = 'unset';
	}, []);

	// useEffect(() => {
	// 	console.log(user.profileImg.imageId);
	// }, [dispatch, user.profileImg.imageId]);

	const initialMotion = {
		initial: {
			opacity: 0,
		},
		animate: {
			opacity: 1,
			transition: {
				duration: 0.5,
			},
		},
	};

	return (
		<motion.main
			className="User"
			variants={initialMotion}
			initial="initial"
			animate="animate">
			<div className="User__logo">
				{isMobile ? <LogoBar /> : <PageLogo />}
				<BackBtn currentPage="details" />
			</div>
			<h2 className="User__welcome">
				Hello again,{' '}
				<span className="bold">@{user ? user.username : 'not found'}</span>!
			</h2>

			<div className="flex-container">
				<div className="User__information">
					<div className="User__information--details">
						<div className="profileImg">
							<div
								onClick={() => setImgModal(!imgModal)}
								className={'profileImg__container'}>
								<img
									src={
										user.profileImg.exists
											? `/images/${user.profileImg.imageId}`
											: BlankProfilePic
									}
									alt="User profile"
									className="profileImage"
								/>
							</div>

							<button
								onClick={() => setActive(!active)}
								// onBlur={() => {
								// 	setActive(false);
								// }}
								className="editImage">
								<GoPencil className="editSvg" /> edit profile image
							</button>

							<AnimatePresence>
								{active && <UserModal getImage={getImage} />}
							</AnimatePresence>
							{imgModal && (
								<ImageModal
									active={imgModal}
									getState={getImageModal}
									image={
										user.profileImg.exists
											? `/images/${user.profileImg.imageId}`
											: BlankProfilePic
									}
								/>
							)}
						</div>

						<div className="userInfo">
							<p>
								Username: <span>@{user ? user.username : 'not found'}</span>
							</p>
							<p>
								Name: <span>{user ? user.name : 'not found'}</span>
							</p>
							<p>
								Feedbacks posted: <span>{user ? userFeedbacks.length : 0}</span>
							</p>
							<p>
								Email: <span>{user ? user.email : 'not found'}</span>
							</p>

							<button disabled>
								<GoPencil />
								Edit Details
							</button>
						</div>
					</div>
				</div>

				<div className="User__userFeedbackList">
					<h2>Feedbacks posted by you:</h2>
					<div className="User__userFeedbackList--content">
						{!userFeedbacks.length ? (
							<EmptyFeedback userDetails={true} />
						) : (
							userFeedbacks.map((feedback, i) => {
								return <FeedbackItem key={i} feedback={feedback} />;
							})
						)}
					</div>
				</div>
			</div>
		</motion.main>
	);
};

export default User;
