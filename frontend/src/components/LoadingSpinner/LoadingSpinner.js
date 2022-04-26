import './LoadingSpinner.css';
const LoadingSpinner = () => {
	return (
		<div className="LoadingSpinner">
			<div className="LoadingSpinner__container">
				<div className="LoadingSpinner__container--content"></div>
			</div>
			<h2>Loading...</h2>
		</div>
	);
};

export default LoadingSpinner;
