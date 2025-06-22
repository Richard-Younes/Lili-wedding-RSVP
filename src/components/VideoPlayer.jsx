import { useState } from 'react';
import ReactPlayer from 'react-player';
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
	const [isPlaying, setIsPlaying] = useState(false);
	const [videoEnded, setVideoEnded] = useState(false);
	const [formSubmitted, setFormSubmitted] = useState(false);

	const handlePlay = () => {
		setIsPlaying(true);
	};

	const videoUrl = answeredInvite
		? '/wedding-invite.mp4'
		: '/wedding-invite-blank-page-ending-trim.mp4';

	return (
		<div className='custom-video-wrapper'>
			<ReactPlayer
				url={videoUrl}
				playing={isPlaying}
				controls={false} // no native controls
				muted // helps with autoplay policies
				width='100%'
				height='auto'
				onReady={onLoad} // fires when video metadata loads
				onEnded={() => setVideoEnded(true)}
				playsinline // iOS inline playback
			/>

			{!answeredInvite && !formSubmitted && videoEnded && (
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
