import { useEffect, useRef } from 'react';

function BackgroundMusic() {
	const audioRef = useRef(null);

	useEffect(() => {
		const audio = audioRef.current;

		if (!audio) return;

		audio.volume = 1;

		const playOnInteraction = () => {
			audio.play().catch((e) => console.warn('Autoplay failed:', e));
			window.removeEventListener('click', playOnInteraction);
		};

		window.addEventListener('click', playOnInteraction);

		return () => {
			window.removeEventListener('click', playOnInteraction);
		};
	}, []);

	return (
		<audio ref={audioRef} src='/music.mp3' loop preload='auto' muted={false} />
	);
}
export default BackgroundMusic;
