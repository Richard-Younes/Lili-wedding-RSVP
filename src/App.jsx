import { useEffect, useState } from 'react';
import { supabase } from './supabase/client';
import VideoPlayer from './components/VideoPlayer';
import './App.css';
function App() {
	const [guest, setGuest] = useState(null);
	const [loading, setLoading] = useState(true);

	const getGuestId = () => {
		const params = new URLSearchParams(window.location.search);
		return params.get('guestId');
	};

	useEffect(() => {
		const fetchGuest = async () => {
			const guestId = getGuestId();
			if (!guestId) {
				console.error('No guestId found in URL');
				setLoading(false);
				return;
			}

			const { data, error } = await supabase
				.from('guests')
				.select('*')
				.eq('guest_id', guestId)
				.single();

			if (error) {
				console.error('Error fetching guest:', error);
			} else {
				setGuest(data);
			}
			setLoading(false);
		};

		fetchGuest();
	}, []);

	// if (loading) {
	// 	return <p>Loading...</p>;
	// }

	// if (!guest) {
	// 	return <p>Guest not found!</p>;
	// }

	return (
		<div className='app-container'>
			<div style={{ justifySelf: 'start' }}>
				<p className='dear'>Dear,</p>
				<p className='invitee'>Melhem & DaliaRayes</p>
			</div>
			<VideoPlayer />
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
		</div>
	);
}

export default App;
