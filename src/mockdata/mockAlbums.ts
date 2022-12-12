import { Album, Song } from 'types';
import mockPhotos from './mockPhotos';

const mockAlbums: Album[] = [
	{
		_id: 'cnq3865tnr786v59rg4',
		photo: mockPhotos[0],
		title: 'Khaled Khaled',
		songs: [] as Song[],
		lastUpdated: '2022-11-26T01:23:17.681Z',
		createdAt: '2022-11-26T01:23:17.681Z',
	},
	{
		_id: 'wvneh5tvbw6tvb9wvweqn45',
		photo: mockPhotos[1],
		title: 'Father of Asahd',
		songs: [] as Song[],
		lastUpdated: '2022-11-26T01:23:17.681Z',
		createdAt: '2022-11-26T01:23:17.681Z',
	},
	{
		_id: 'vh893ytwbvrtew893vbgt27',
		photo: mockPhotos[2],
		title: 'Championships',
		songs: [] as Song[],
		lastUpdated: '2022-11-26T01:23:17.681Z',
		createdAt: '2022-11-26T01:23:17.681Z',
	},
	{
		_id: 'bnv9qortnq846vm394623',
		photo: mockPhotos[3],
		title: 'Back of My Mind',
		songs: [] as Song[],
		lastUpdated: '2022-11-26T01:23:17.681Z',
		createdAt: '2022-11-26T01:23:17.681Z',
	},
];

export default mockAlbums;