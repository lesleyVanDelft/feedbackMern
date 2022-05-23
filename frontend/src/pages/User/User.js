import LogoBar from '../../components/LogoBar/LogoBar';
import { useSelector } from 'react-redux';
import BlankProfilePic from '../../assets/blank-profile-picture.png';
import ImageModal from '../../components/ImageModal/ImageModal';
import { useMediaQuery } from 'react-responsive';
import PageLogo from '../../components/PageLogo/PageLogo';
import BackBtn from '../../components/Buttons/BackBtn/BackBtn';
import FeedbackItem from '../../components/FeedbackItem/FeedbackItem';
import EmptyFeedback from '../../components/EmptyFeedback/EmptyFeedback';
import UserModal from './UserModal/UserModal';
import { motion, AnimatePresence } from 'framer-motion';
import { GoPencil } from 'react-icons/go';
import './User.css';
import { useEffect, useState } from 'react';

const User = () => {
	const [active, setActive] = useState(false);
	const [imgModal, setImgModal] = useState(false);
	const [imgModalState, setImgModalState] = useState(false);
	const [image, setImage] = useState();
	const user = useSelector(state => state.user);
	const feedbacks = useSelector(state => state.feedbacks);
	const userFeedbacks = feedbacks.filter(
		feedback => feedback.author === user.id
	);
	const isMobile = useMediaQuery({
		query: '(max-width: 768px)',
	});

	const getImageModal = mdl => {
		setImgModal(mdl);
	};

	const getImage = img => {
		setImage(img);
	};

	useEffect(() => {
		document.body.style.overflow = 'unset';
	}, []);

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

							<button onClick={() => setActive(!active)} className="editImage">
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
