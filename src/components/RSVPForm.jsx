import { useState } from 'react';
import { supabase } from '../supabase/client';
import toast from 'react-hot-toast';

function RSVPForm({ videoEnded, firstGuest, secondGuest, id, onSuccess }) {
	const [selections, setSelections] = useState({ first: null, second: null });
	const [loading, setLoading] = useState(false);

	const isThreeWordName = (name) => name.trim().split(' ').length === 3;

	if (!firstGuest && !secondGuest) {
		return null;
	}
	let count = (firstGuest ? 1 : 0) + (secondGuest ? 1 : 0);

	if (!videoEnded) {
		return null;
	}

	const handleSelection = (guestKey, value) => {
		setSelections((prev) => ({ ...prev, [guestKey]: value }));
	};
	console.log(id);

	const handleSubmit = async () => {
		setLoading(true);
		try {
			if (firstGuest && secondGuest && selections.first && selections.second) {
				await supabase
					.from('invitees')
					.update({
						first_guest_answer: selections.first === 'yes' ? true : false,
						second_guest_answer: selections.second === 'yes' ? true : false,
						answered_invite: true,
					})
					.eq('id', id);
			} else if (firstGuest && selections.first) {
				await supabase
					.from('invitees')
					.update({
						first_guest_answer: selections.first === 'yes' ? true : false,
						answered_invite: true,
					})
					.eq('id', id);
			} else if (secondGuest && selections.second) {
				await supabase
					.from('invitees')
					.update({
						second_guest_answer: selections.second === 'yes' ? true : false,
						answered_invite: true,
					})
					.eq('id', id);
			} else {
				toast.error('Please select an option before submitting your answer.');
				return;
			}
			onSuccess();
			toast.success('RSVP submitted successfully!');
		} catch (error) {
			console.error('RSVP error:', error);
			toast.error('Submission failed. Try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='RSVP'>
			<h2 className='rsvp-header'>Will you be attending?</h2>
			<p
				className='total-invite'
				style={{ marginBottom: isThreeWordName(firstGuest) ? '0px' : '10px' }}>
				Total invite(s): {count}
			</p>

			{firstGuest && (
				<div className='formContainer'>
					<button
						className={`formButton ${
							selections.first === 'yes' ? 'selected' : ''
						}`}
						onClick={() => handleSelection('first', 'yes')}>
						Yes
					</button>
					<button
						className={`formButton ${
							selections.first === 'no' ? 'selected' : ''
						}`}
						onClick={() => handleSelection('first', 'no')}>
						No
					</button>
					<p
						className='form-label'
						style={{ fontSize: isThreeWordName(firstGuest) ? '13px' : '15px' }}>
						{firstGuest}
					</p>
				</div>
			)}

			{secondGuest && (
				<div className='formContainer'>
					<button
						className={`formButton ${
							selections.second === 'yes' ? 'selected' : ''
						}`}
						onClick={() => handleSelection('second', 'yes')}>
						Yes
					</button>
					<button
						className={`formButton ${
							selections.second === 'no' ? 'selected' : ''
						}`}
						onClick={() => handleSelection('second', 'no')}>
						No
					</button>
					<p
						className='form-label'
						style={{
							fontSize: isThreeWordName(secondGuest) ? '13px' : '15px',
						}}>
						{secondGuest}
					</p>
				</div>
			)}

			<button
				className='formSubmitButton'
				onClick={handleSubmit}
				disabled={loading}>
				{loading ? 'Submitting...' : 'Submit'}
			</button>
		</div>
	);
}

export default RSVPForm;
