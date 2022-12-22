import * as React from 'react';

// Project
import { Song, Album } from 'types';
import { audioAPI } from 'apis/audioAPI';
import { MockAlbums } from 'mockdata';
import { updateObj } from 'util/index';

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
	toggleIsLoading: Function;
	toggleIsAddingSong: Function;
}

interface ActionsInterface {
	type: string;
	song?: Song;
	songs?: Song[];
	album?: Album;
	albums?: Album[];
	isAddingSong?: boolean;
	isLoading?: boolean;
	error?: any;
}

const initialState: ContextInterface = {
	// Context Data
	songs: [] as Song[],
	albums: [...MockAlbums] as Album[],

	// Context State
	isAddingSong: false,
	isLoading: false,
	error: null,

	// Context Methods
	handleUploadNewSong: () => null,
	toggleIsLoading: () => null,
	toggleIsAddingSong: () => null,
};

const ManageDiscographyContext = React.createContext(initialState);

const DiscographyReducer = (
	state: any,
	{ type, song, songs, album, isAddingSong, isLoading, albums, error }: ActionsInterface
) => {
	switch (type) {
		case actions.SET_SONGS:
			return updateObj(state, { songs });
		case actions.SET_ALBUMS:
			return updateObj(state, { albums });
		case actions.SET_ERROR:
			return updateObj(state, { error });
		case actions.TOGGLE_IS_ADDING_SONG:
			return updateObj(state, { isAddingSong });
		case actions.TOGGLE_IS_LOADING:
			return updateObj(state, { isLoading });
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
				songs: !song ? songs : [song, ...state.songs],
			});
		case actions.ADD_ALBUM:
			return updateObj(state, {
				albums: !album ? state.albums : [...state.albums, album],
			});
		default:
			return state;
	}
};

const ManageDiscographyProvider = (props: any) => {
	const [state, dispatch] = React.useReducer(DiscographyReducer, ManageDiscographyContext);

	async function handleUploadNewSong(data: any, success: Function, handleError: Function) {
		function successCallback(data: any) {
			const { album, song } = data;
			if (album && song) {
				dispatch({ type: actions.ADD_SONG, song });
				dispatch({ type: actions.ADD_ALBUM, album });
			}

			success();
			toggleIsLoading(false);
			toggleIsAddingSong(false);
		}

		function errorCallback(error: any) {
			toggleIsLoading(false);
			handleError(error);
		}

		if (data.audio) {
			toggleIsLoading(true);
			const multipart_form_data = new FormData();
			Object.entries(data).map((entry: any) => multipart_form_data.append(entry[0], entry[1]));
			return audioAPI.addNewSong({ data: multipart_form_data, successCallback, errorCallback });
		}
	}

	function toggleIsLoading(isLoading: boolean) {
		console.log({ isLoading });
		return dispatch({ type: actions.TOGGLE_IS_LOADING, isLoading });
	}

	function toggleIsAddingSong(isAddingSong: boolean) {
		return dispatch({ type: actions.TOGGLE_IS_ADDING_SONG, isAddingSong });
	}

	function addSong(song: Song) {
		return dispatch({ type: actions.ADD_SONG, song });
	}

	function removeSong(song: Song) {
		return dispatch({ type: actions.REMOVE_SONG, song });
	}

	async function fetchAudio() {
		let { songs } = await audioAPI.fetchSongs();

		let albums = [] as Album[];
		let albumIds = [] as string[];

		await songs.map((song: Song) => {
			if (!albumIds.includes(song.album._id)) {
				albumIds.push(song.album._id);
				albums.push(song.album);
			}
			return null;
		});

		console.log({ songs, albums });
		dispatch({ type: actions.SET_SONGS, songs });
		dispatch({ type: actions.SET_ALBUMS, albums });
		return songs;
	}

	React.useEffect(() => {
		fetchAudio();
	}, []);

	return (
		<ManageDiscographyContext.Provider
			value={{
				// albums: state.albums,
				...state,
				songs: state.songs ? state.songs : [],
				addSong,
				handleUploadNewSong,
				removeSong,
				toggleIsAddingSong,
				toggleIsLoading,
			}}
			{...props}
		/>
	);
};

export { ManageDiscographyContext, ManageDiscographyProvider };
