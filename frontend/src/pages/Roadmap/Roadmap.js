import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../reducers/userReducer';
// import setFeed
import { getFeedbacks } from '../../reducers/feedbackReducer';
import SuggestionsHeader from '../../components/Suggestions/SuggestionsHeader/SuggestionsHeader';
import './Roadmap.css';
import FeedbackItem from '../../components/FeedbackItem/FeedbackItem';

const RoadmapPage = () => {
	const feedbacks = useSelector(state => state.feedbacks);
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setUser());
		// dispatch(setFeedbacks())

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
			<div className="RoadmapPage__content">
				<div className="planned">
					<h4>{`Planned (${plannedFeedbacks.length})`}</h4>
					<span className="description">Ideas prioritized for research</span>

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
				<div className="in-progress">
					<h4>{`In-Progress (${inProgressFeedbacks.length})`}</h4>
					<span className="description">Currently being developed</span>

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
				<div className="live">
					<h4>{`Live (${liveFeedbacks.length})`}</h4>
					<span className="description">Released features</span>

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
