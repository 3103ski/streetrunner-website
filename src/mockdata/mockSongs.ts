import { Song } from 'types';

import mockUploads from './mockAudioUploads';
import mockAlbums from './mockAlbums';

// TODO :: add boolean flag to the data that if nominated for something it
// 		   asks if the song or the album it belongs to was nominated

const songs: Song[] = [
	{
		_id: 'h9v835th925tn2365vb7b23584',
		artist: 'DJ Khaled',
		year: 2021,
		title: 'Higher',
		nominationStatus: 'winner',
		nominatedFor: 'Rap Album of The Year',
		isRIAACertified: true,
		audio: mockUploads[0],
		album: mockAlbums[0],
		useAlbumArt: true,
	},
	{
		_id: 'h9v835th925tn2365vb7b23584',
		artist: 'DJ Khaled',
		year: 2018,
		title: 'Higher',
		nominationStatus: 'winner',
		nominatedFor: 'Rap Album of The Year',
		isRIAACertified: true,
		audio: mockUploads[1],
		album: mockAlbums[1],
		useAlbumArt: true,
	},
	{
		_id: 'h9v835th925tn2365vb7b23584',
		artist: 'Meek Mill',
		year: 2020,
		title: 'Higher',
		nominationStatus: 'NOMINATED',
		nominatedFor: 'Rap Album of The Year',
		isRIAACertified: true,
		audio: mockUploads[2],
		album: mockAlbums[2],
		useAlbumArt: true,
	},
	{
		_id: 'h9v835th925tn2365vb7b23584',
		artist: 'H.E.R.',
		year: 2022,
		title: 'Higher',
		nominationStatus: 'winner',
		nominatedFor: 'Rap Album of The Year',
		isRIAACertified: true,
		audio: mockUploads[1],
		album: mockAlbums[3],
		useAlbumArt: true,
	},
] as Song[];

export { songs };
