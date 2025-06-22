import { supabase } from '../supabase/client';

export async function generateAndSaveUrls() {
	const baseUrl = 'https://jaleelandlili.com/?guestId=';

	let { data: invitees, error } = await supabase
		.from('invitees')
		.select('id, display_name');

	if (error) {
		console.error('Error fetching invitees:', error);
		return;
	}

	for (const invitee of invitees) {
		const encodedName = encodeURIComponent(invitee.display_name);
		const fullUrl = `${baseUrl}${encodedName}`;
		const { error: updateError } = await supabase
			.from('invitees')
			.update({ url: fullUrl })
			.eq('id', invitee.id);

		if (updateError) {
			console.error(`Failed to update URL for id ${invitee.id}`, updateError);
		} else {
			console.log(`Updated URL for ${invitee.display_name}`);
		}
	}

	console.log('All URLs generated and saved.');
}
