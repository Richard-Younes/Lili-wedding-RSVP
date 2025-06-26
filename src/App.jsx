import { useEffect, useState } from 'react';
import { supabase } from './supabase/client';
import VideoPlayer from './components/VideoPlayer';
import './App.css';
import { Toaster } from 'react-hot-toast';

import ClipLoader from 'react-spinners/ClipLoader';
import BackgroundMusic from './components/BackgroundMusic';
function App() {
	const [guest, setGuest] = useState(null);
	const [loading, setLoading] = useState(true);
	const [dataLoaded, setDataLoaded] = useState(false);
	const getGuestId = () => {
		const params = new URLSearchParams(window.location.search);
		return params.get('guestId');
	};
	useEffect(() => {
		const fetchGuest = async () => {
			const guestId = getGuestId();
			if (!guestId) {
				console.error('No guestId found in URL');
				return;
			}

			const { data, error } = await supabase
				.from('invitees')
				.select('*')
				.eq('display_name', guestId)
				.single();

			if (error) {
				console.error('Error fetching guest:', error);
			} else {
				setGuest(data);
				setDataLoaded(true);
			}
		};

		fetchGuest();
	}, []);

	const handleVideoLoad = () => {
		setLoading(false);
	};

	const {
		display_name: displayName,
		first_guest: firstGuest,
		second_guest: secondGuest,
		answered_invite: answeredInvite,
		id,
	} = guest || {};

	return (
		<>
			<Toaster position='top-center' reverseOrder={false} />

			<div className='app-container'>
				{loading && !dataLoaded && <ClipLoader />}

				{!loading && (
					<div style={{ justifySelf: 'start' }}>
						<p className='dear'>Dear,</p>
						<p className='invitee'>{displayName}</p>
					</div>
				)}

				<VideoPlayer
					onLoad={handleVideoLoad}
					loading={loading}
					firstGuest={firstGuest}
					secondGuest={secondGuest}
					answeredInvite={answeredInvite}
					id={id}
				/>

				{!loading && dataLoaded && (
					<footer>
						<p className='username'>Jaleel & Lili</p>
						<p className='message'>
							On July 19th, 2025
							<br />
							At 7pm
							<br />
							At Villa Dr. Nader Nabih Chehayeb
							<br />
							in Ain Hala, Aley
						</p>
					</footer>
				)}
			</div>
		</>
	);
}

export default App;
