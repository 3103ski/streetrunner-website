import * as React from 'react';

// Project
import { Song, Album } from 'types';
import { audioAPI } from 'apis/audioAPI';
import { songs, MockAlbums } from 'mockdata';
import { updateObj } from 'util/index';
// import { NewSongInputInterface } from 'components/cms/cms-types';

// Contexts
import actions from './actionTypes';

interface ContextInterface {
	// Context Data
	songs: Song[];
	albums: Album[];

	// Context State
	isAddingSong: boolean;
	isLoading: boolean;
	error: any;

	// Context Methods
	handleUploadNewSong: Function;
}

interface ActionsInterface {
	type: string;
	song?: Song;
	isAddingSong?: boolean;
	isLoading?: boolean;
	error?: any;
}

const initialState: ContextInterface = {
	// Context Data
	songs: [...songs] as Song[],
	albums: [...MockAlbums] as Album[],

	// Context State
	isAddingSong: false,
	isLoading: false,
	error: null,

	// Context Methods
	handleUploadNewSong: () => null,
};

const ManageDiscographyContext = React.createContext(initialState);

const DiscographyReducer = (state: any, { type, song, isAddingSong, isLoading, error }: ActionsInterface) => {
	let songs;

	switch (type) {
		case actions.SET_ERROR:
			return updateObj(state, { error });
		case actions.TOGGLE_IS_ADDING_SONG:
			return updateObj(state, {
				isAddingSong: isAddingSong ? isAddingSong : !state.isAddingSong,
			});
		case actions.TOGGLE_IS_LOADING:
			return updateObj(state, {
				isLoading: isLoading ? isLoading : !state.isLoading,
			});
		case actions.REMOVE_SONG:
			songs = !song ? songs : state.songs.filter((s: Song) => s._id !== song._id);
			return updateObj(state, {
				songs,
			});
		case actions.UPDATE_SONG:
			songs = !song ? songs : state.songs.map((s: Song) => (s._id === song._id ? song : s));
			return updateObj(state, {
				songs,
			});
		case actions.ADD_SONG:
			return updateObj(state, {
				songs: !song ? songs : [...state.songs, song],
			});
		default:
			return state;
	}
};

const ManageDiscographyProvider = (props: any) => {
	const [state, dispatch] = React.useReducer(DiscographyReducer, ManageDiscographyContext);

	async function handleUploadNewSong(data: any) {
		dispatch({ type: actions.TOGGLE_IS_LOADING, isLoading: true });
		console.log({ data });

		if (data.audio) {
			const multipart_form_data = new FormData();

			await multipart_form_data.append('artist', data.artist);
			await multipart_form_data.append('audio', data.audio);
			await multipart_form_data.append('certified', data.certified);
			await multipart_form_data.append('certifiedFor', data.certifiedFor);
			await multipart_form_data.append('existingAlbum', data.existingAlbum);
			await multipart_form_data.append('newAlbumTitle', data.newAlbumTitle);
			await multipart_form_data.append('newAlbumPhoto', data.newAlbumPhoto);
			await multipart_form_data.append('newAlbumYear', data.newAlbumYear);
			await multipart_form_data.append('nomindated', data.nominated);
			await multipart_form_data.append('nomindatedFor', data.nominatedFor);
			await multipart_form_data.append('nomindatedStatus', data.nominatedStatus);
			await multipart_form_data.append('photo', data.photo);
			await multipart_form_data.append('title', data.title);
			await multipart_form_data.append('useAlbumYear', data.useAlbumYear);
			await multipart_form_data.append('useAlbumPhoto', data.useAlbumPhoto);
			await multipart_form_data.append('useAlbumArtist', data.useAlbumArtist);
			await multipart_form_data.append('year', data.year);

			return audioAPI.addNewSong({ data: multipart_form_data });
		}
	}

	return (
		<ManageDiscographyContext.Provider
			value={{ songs: state.songs, albums: state.albums, handleUploadNewSong }}
			{...props}
		/>
	);
};

export { ManageDiscographyContext, ManageDiscographyProvider };
