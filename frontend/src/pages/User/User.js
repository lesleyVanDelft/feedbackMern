import LogoBar from '../../components/LogoBar/LogoBar';
import { useSelector } from 'react-redux';
import BlankProfilePic from '../../assets/blank-profile-picture.png';
import { useMediaQuery } from 'react-responsive';
import PageLogo from '../../components/PageLogo/PageLogo';
import BackBtn from '../../components/Buttons/BackBtn/BackBtn';
import FeedbackItem from '../../components/FeedbackItem/FeedbackItem';
import { motion } from 'framer-motion';
import { GoPencil } from 'react-icons/go';
import './User.css';
import { useEffect } from 'react';

const User = () => {
	const user = useSelector(state => state.user);
	const feedbacks = useSelector(state => state.feedbacks);
	const userFeedbacks = feedbacks.filter(
		feedback => feedback.author === user.id
	);
	const isMobile = useMediaQuery({
		query: '(max-width: 768px)',
	});

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
			<div className="User__information ">
				<div className="User__information--logo">
					{isMobile ? <LogoBar /> : <PageLogo />}
					<BackBtn currentPage="details" />
				</div>

				<div className="User__information--details">
					<h2 className="welcomeMessage">
						Hello again,{' '}
						<span className="bold">@{user ? user.username : 'not found'}</span>!
					</h2>

					<div className="profileImg">
						<img
							src={BlankProfilePic}
							alt="User profile"
							className="profileImage"
						/>
						<button>
							<GoPencil className="editSvg" /> edit profile image
						</button>
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
					{userFeedbacks ? (
						userFeedbacks.map((feedback, i) => {
							return <FeedbackItem key={i} feedback={feedback} />;
						})
					) : (
						<p>None found</p>
					)}
				</div>
			</div>
		</motion.main>
	);
};

export default User;
