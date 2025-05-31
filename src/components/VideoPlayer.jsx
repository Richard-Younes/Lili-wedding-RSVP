import { useRef, useState } from 'react';

function VideoPlayer() {
	const videoRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);

	const handlePlay = () => {
		videoRef.current?.play();
		setIsPlaying(true);
	};

	return (
		<div className='custom-video-wrapper'>
			<video
				ref={videoRef}
				src='/wedding invite- blank-page-ending.mp4'
				controls={false}
			/>

			{!isPlaying && (
				<button className='custom-play-button' onClick={handlePlay}>
					Open
				</button>
			)}
		</div>
	);
}

export default VideoPlayer;
