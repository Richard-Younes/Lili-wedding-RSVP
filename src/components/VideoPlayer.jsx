import { useRef, useState } from 'react';
import RSVPForm from './RSVPForm';
import ClipLoader from 'react-spinners/ClipLoader';
import ThankYouPage from './ThankYouPage';

function VideoPlayer({
	loading,
	onLoad,
	firstGuest,
	secondGuest,
	answeredInvite,
	id,
}) {
	const videoRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [videoEnded, setVideoEnded] = useState(false);
	const [formSubmitted, setFormSubmitted] = useState(false);

	const handlePlay = () => {
		videoRef.current?.play();
		setIsPlaying(true);
	};

	return (
		<div className='custom-video-wrapper'>
			<video
				ref={videoRef}
				src={
					answeredInvite
						? '/wedding-invite.mp4'
						: '/wedding invite- blank-page-ending - Trim.mp4'
				}
				controls={false}
				onLoadedData={onLoad}
				onEnded={() => setVideoEnded(true)}
			/>
			{!answeredInvite && !formSubmitted && (
				<RSVPForm
					videoEnded={videoEnded}
					firstGuest={firstGuest}
					secondGuest={secondGuest}
					id={id}
					onSuccess={() => setFormSubmitted(true)}
				/>
			)}

			{formSubmitted && <ThankYouPage />}

			{!isPlaying && !loading && (
				<button className='custom-play-button' onClick={handlePlay}>
					Open
				</button>
			)}
		</div>
	);
}

export default VideoPlayer;
