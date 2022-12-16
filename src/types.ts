export type Photo = {
	_id: string;
	userId: string;
	public_id: string;
	tags: string[];
	width: Number;
	height: Number;
	format: string;
	bytes: Number;
	url: string;
	secure_url: string;
	fileName: string;
	folder: string;
	lastUpdated: string;
	createdAt: string;
};

export type Album = {
	photo?: Photo;
	// required
	_id: string;
	title: string;
	songs: Song[];
	lastUpdated: string;
	createdAt: string;
};

export type AudioUpload = {
	_id: string;
	songId: string;
	size: number;
	duration: number;
	secure_url: string;
	lastUpdated: string;
	createdAt: string;
};

export type Song = {
	album?: Album;
	photo?: Photo;
	_id: string;
	audio: AudioUpload;
	title: string;
	artist: string;
	year: number;
	//
	useAlbumArt: boolean;
	nominationStatus: 'winner' | 'nominated' | 'none'; // default 'none'
	nominatedForLabel?: string;
	nominatedFor?: 'Song' | 'Album' | string;

	isRIAACertified: boolean; // default false
	//
	lastUpdated: string;
	createdAt: string;
};
