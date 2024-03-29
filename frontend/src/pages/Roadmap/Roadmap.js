import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../reducers/userReducer';
import { motion } from 'framer-motion';
import { getFeedbacks } from '../../reducers/feedbackReducer';
import SuggestionsHeader from '../../components/Suggestions/SuggestionsHeader/SuggestionsHeader';
import FeedbackItem from '../../components/FeedbackItem/FeedbackItem';
import { toggleUpvote, toggleDownvote } from '../../reducers/feedbackReducer';
import { useSwipeable } from 'react-swipeable';
import { useMediaQuery } from 'react-responsive';
import PageLogo from '../../components/PageLogo/PageLogo';
import './Roadmap.css';
import LogoBar from '../../components/LogoBar/LogoBar';

const RoadmapPage = () => {
	const [active, setActive] = useState('in-progress');
	const feedbacks = useSelector(state => state.feedbacks);
	const dispatch = useDispatch();
	const isMobile = useMediaQuery({
		query: '(max-width: 768px)',
	});
	const handlers = useSwipeable({
		onSwipedLeft: () => {
			if (active === 'in-progress') {
				setActive('live');
			} else if (active === 'planned') {
				setActive('in-progress');
			}
		},
		onSwipedRight: () => {
			if (active === 'in-progress') {
				setActive('planned');
			} else if (active === 'live') {
				setActive('in-progress');
			}
		},
		delta: 10,
		preventDefaultTouchmoveEvent: true,
	});

	useEffect(() => {
		document.body.style.overflowY = 'auto';
	}, []);

	useEffect(() => {
		dispatch(setUser());
		dispatch(getFeedbacks());
	}, [dispatch]);
	if (!feedbacks) {
		return <h1>Loading</h1>;
	}

	const plannedFeedbacks = feedbacks
		? feedbacks.filter(fb => {
				return fb.status.toString() === 'planned';
		  })
		: [];

	const inProgressFeedbacks = feedbacks
		? feedbacks.filter(fb => {
				return fb.status.toString() === 'in-progress';
		  })
		: [];

	const liveFeedbacks = feedbacks
		? feedbacks.filter(fb => {
				return fb.status.toString() === 'live';
		  })
		: [];

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
			className="RoadmapPage"
			{...handlers}
			variants={initialMotion}
			initial="initial"
			animate="animate">
			{isMobile ? <LogoBar /> : <PageLogo />}
			<SuggestionsHeader roadmap={true} />

			<div className="headers">
				<div
					className={`headers__item ${
						active === 'planned' ? 'orange active' : ''
					}`}
					onClick={() => setActive('planned')}>
					<h4>{`Planned (${plannedFeedbacks.length})`}</h4>
					<span className="description">Ideas prioritized for research</span>
				</div>
				<div
					className={`headers__item ${
						active === 'in-progress' ? 'purple active' : ''
					}`}
					onClick={() => setActive('in-progress')}>
					<h4>{`In-Progress (${inProgressFeedbacks.length})`}</h4>
					<span className="description">Currently being developed</span>
				</div>
				<div
					className={`headers__item ${active === 'live' ? 'blue active' : ''}`}
					onClick={() => setActive('live')}>
					<h4>{`Live (${liveFeedbacks.length})`}</h4>
					<span className="description">Released features</span>
				</div>
			</div>

			<div className="mobileHeaders">
				<h2>
					{active} ({active === 'planned' && plannedFeedbacks.length}
					{active === 'in-progress' && inProgressFeedbacks.length}
					{active === 'live' && liveFeedbacks.length})
				</h2>
				<span className="description">
					{active === 'planned' && 'Ideas prioritized for research'}
					{active === 'in-progress' && 'Currently being developed'}
					{active === 'live' && 'Released features'}
				</span>
			</div>
			<div className="RoadmapPage__content">
				<div className={`plannedList ${active === 'planned' ? 'active' : ''}`}>
					<div className="list">
						{plannedFeedbacks.length > 0 &&
							plannedFeedbacks.map((fb, i) => {
								return (
									<FeedbackItem
										feedback={fb}
										index={i}
										key={i}
										roadmap={true}
										status={'planned'}
										toggleUpvote={toggleUpvote}
										toggleDownvote={toggleDownvote}
									/>
								);
							})}
					</div>
				</div>

				<div
					className={`in-progressList ${
						active === 'in-progress' ? 'active' : ''
					}`}>
					<div className="list">
						{inProgressFeedbacks.length > 0 &&
							inProgressFeedbacks.map((fb, i) => {
								return (
									<FeedbackItem
										feedback={fb}
										index={i}
										key={i}
										roadmap={true}
										status={'in-progress'}
										toggleUpvote={toggleUpvote}
										toggleDownvote={toggleDownvote}
									/>
								);
							})}
					</div>
				</div>

				<div className={`liveList ${active === 'live' ? 'active' : ''}`}>
					<div className="list">
						{liveFeedbacks.length > 0 &&
							liveFeedbacks.map((fb, i) => {
								return (
									<FeedbackItem
										feedback={fb}
										index={i}
										key={i}
										roadmap={true}
										status={'live'}
										toggleUpvote={toggleUpvote}
									/>
								);
							})}
					</div>
				</div>
			</div>
		</motion.main>
	);
};

export default RoadmapPage;
