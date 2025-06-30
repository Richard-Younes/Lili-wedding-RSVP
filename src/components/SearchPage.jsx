import { useState } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../supabase/client';

function SearchPage() {
	const [name, setName] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleInputChange = async (e) => {
		const value = e.target.value;
		setName(value);
		setError('');

		if (value.trim() === '') {
			setSuggestions([]);
			return;
		}

		const { data } = await supabase
			.from('invitees')
			.select('display_name, first_guest, second_guest')
			.or(`first_guest.ilike.%${value}%,second_guest.ilike.%${value}%`);

		if (data) {
			setSuggestions(data.map((item) => item.display_name));
		}
	};

	const handleSelect = (displayName) => {
		const encoded = encodeURIComponent(displayName);
		navigate(`/invite?guestId=${encoded}`);
	};

	return (
		<div className='search-page'>
			<div className='search-header'>
				<p className='name'>Jaleel & Lili’s</p>
				<div className='invite-details'>
					<p className='invite'>wedding</p>
					<p className='date'>19.07.2025</p>
				</div>
			</div>

			<div className='search-input'>
				<label className='label' htmlFor='input'>
					RSVP
				</label>
				<input
					id='input'
					type='text'
					placeholder='Full Name'
					value={name}
					onChange={handleInputChange}
				/>

				{error && <p className='error'>{error}</p>}

				<ul className='suggestions'>
					{suggestions.map((s, i) => (
						<li key={i} onClick={() => handleSelect(s)}>
							{s}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default SearchPage;
