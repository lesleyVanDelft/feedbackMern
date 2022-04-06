import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../reducers/userReducer';
// import setFeed
import { getFeedbacks } from '../../reducers/feedbackReducer';
import SuggestionsHeader from '../../components/Suggestions/SuggestionsHeader/SuggestionsHeader';
import './Roadmap.css';
import FeedbackItem from '../../components/FeedbackItem/FeedbackItem';

const RoadmapPage = () => {
	const [active, setActive] = useState('in-progress');
	const feedbacks = useSelector(state => state.feedbacks);
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setUser());
		dispatch(getFeedbacks());
	}, []);

	if (!feedbacks) {
		return <h1>Loading</h1>;
	}

	const plannedFeedbacks =
		feedbacks &&
		feedbacks.filter(fb => {
			return fb.status.toString() === 'planned';
		});

	const inProgressFeedbacks =
		feedbacks &&
		feedbacks.filter(fb => {
			return fb.status.toString() === 'in-progress';
		});

	const liveFeedbacks =
		feedbacks &&
		feedbacks.filter(fb => {
			return fb.status.toString() === 'live';
		});

	return (
		<main className="RoadmapPage">
			<SuggestionsHeader roadmap={true} />

			<div className="headers">
				<div
					className={`headers__item ${
						active === 'planned' ? 'orange active' : null
					}`}
					onClick={() => setActive('planned')}>
					<h4>{`Planned (${plannedFeedbacks.length})`}</h4>
					<span className="description">Ideas prioritized for research</span>
				</div>
				<div
					className={`headers__item ${
						active === 'in-progress' ? 'purple active' : null
					}`}
					onClick={() => setActive('in-progress')}>
					<h4>{`In-Progress (${inProgressFeedbacks.length})`}</h4>
					<span className="description">Currently being developed</span>
				</div>
				<div
					className={`headers__item ${
						active === 'live' ? 'blue active' : null
					}`}
					onClick={() => setActive('live')}>
					<h4>{`Live (${liveFeedbacks.length})`}</h4>
					<span className="description">Released features</span>
				</div>
			</div>

			<div className="RoadmapPage__content">
				<div
					className={`plannedList ${active === 'planned' ? 'active' : null}`}>
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
									/>
								);
							})}
					</div>
				</div>

				<div
					className={`in-progressList ${
						active === 'in-progress' ? 'active' : null
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
									/>
								);
							})}
					</div>
				</div>

				<div className={`liveList ${active === 'live' ? 'active' : null}`}>
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
									/>
								);
							})}
					</div>
				</div>
			</div>
		</main>
	);
};

export default RoadmapPage;
