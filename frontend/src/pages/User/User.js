import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { FaLock } from 'react-icons/fa';
import { GoPencil } from 'react-icons/go';
import { motion, AnimatePresence } from 'framer-motion';
import { logoutUser } from '../../reducers/userReducer';
import BlankProfilePic from '../../assets/blank-profile-picture.png';
import BackBtn from '../../components/Buttons/BackBtn/BackBtn';
import EmptyFeedback from '../../components/EmptyFeedback/EmptyFeedback';
import FeedbackItem from '../../components/FeedbackItem/FeedbackItem';
import ImageModal from '../../components/ImageModal/ImageModal';
import LogoBar from '../../components/LogoBar/LogoBar';
import PageLogo from '../../components/PageLogo/PageLogo';
import Modal from '../../components/Modal/Modal';
import UserModal from './UserModal/UserModal';
import axios from 'axios';
import './User.css';
import PasswordModal from './PasswordModal/PasswordModal';
import { handleOutsideClick } from '../../utils/handleOutsideClick';

const User = () => {
	const [active, setActive] = useState(false);
	const [imgModal, setImgModal] = useState(false);
	const [logoutModal, setLogoutModal] = useState(false);
	const [passwordModal, setPasswordModal] = useState(false);
	const [passwordData, setPasswordData] = useState('');

	const dropdownRef = useRef(null);
	const [listening, setListening] = useState(false);
	// const [userActive, setUserActive] = useState(false);
	const toggle = () => setActive(!active);
	useEffect(
		handleOutsideClick(listening, setListening, dropdownRef, setActive)
	);

	const [image, setImage] = useState();
	const [userImage, setUserImage] = useState();
	const user = useSelector(state => state.user);
	const feedbacks = useSelector(state => state.feedbacks);
	const userFeedbacks = feedbacks.filter(
		feedback => feedback.author === user.id
	);

	const dispatch = useDispatch();
	const navigate = useNavigate();

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

	// get updated password
	const getPasswordData = data => {
		setPasswordData(data);
	};

	// Get current user
	const getUser = async () => {
		const response = await axios.get(
			`https://feedback-lesley.herokuapp.com/user/${user.id}`
		);
		// const response = await axios.get(`http://localhost:5000/user/${user.id}`);
		return response.data;
	};

	useEffect(() => {
		getUser();
	}, []);

	useEffect(() => {
		setUserImage(user.profileImg.imageId);
	}, [user.profileImg.imageId]);

	// Reset body overflow
	useEffect(() => {
		document.body.style.overflowY = 'auto';
	}, []);

	// Framer motion
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

	// Logout confirm  modal
	const openLogoutModal = e => {
		e.preventDefault();
		setLogoutModal(true);
	};
	const closeLogoutModal = e => {
		e.preventDefault();
		setLogoutModal(false);
	};

	// Password Modal
	const openPasswordModal = e => {
		e.preventDefault();
		setPasswordModal(true);
	};
	const closePasswordModal = e => {
		setPasswordModal(false);
	};

	// Logout handler
	const handleLogout = () => {
		setTimeout(() => {
			navigate('/login');
			dispatch(logoutUser());
		}, 100);
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
						<div className="profileImg" ref={dropdownRef}>
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
							<button onClick={toggle} className="editImage">
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

							<>
								<button className="editDetails" onClick={openPasswordModal}>
									<FaLock />
									Change Password
								</button>
								{/* {passwordModal && (
									<Modal
										active={passwordModal}
										closeModal={closePasswordModal}
										handleDelete={handleLogout}
										getPasswordData={getPasswordData}
										param="password"
									/>
								)} */}
								{passwordModal && (
									<PasswordModal
										active={passwordModal}
										closeModal={closePasswordModal}
									/>
								)}
							</>
							<>
								<button onClick={openLogoutModal} className="logoutBtn">
									Logout
								</button>
								{logoutModal && (
									<Modal
										active={logoutModal}
										closeModal={closeLogoutModal}
										handleDelete={handleLogout}
										param="logout"
									/>
								)}
							</>
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
