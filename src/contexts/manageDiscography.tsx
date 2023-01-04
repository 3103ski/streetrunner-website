import * as React from 'react';

// Project
import { Song, Album } from 'types';
import { audioAPI } from 'apis';
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
	isRemovingSongPhoto: boolean;
	songPhotoUploadFocus: Song | null;

	updatingSong: null | Song;
	replaceAudio: null | Song;
	updatingAlbum: null | Album;

	error: any;

	// Context Methods
	setUpdatingSong: Function;
	setReplaceAudio: Function;
	setUpdatingAlbum: Function;
	setSongPhotoUploadFocus: Function;

	handleUploadNewSong: Function;
	handleUpdateSongDetails: Function;
	handleDeleteSong: Function;
	handleReplaceAudio: Function;
	handleAddSongPhoto: Function;
	handleDeleteSongPhoto: Function;
	handleUpdateAlbum: Function;
	removeSong: Function;

	toggleIsLoading: Function;
	toggleIsAddingSong: Function;
	toggleIsRemovingSongPhoto: Function;
}

interface ActionsInterface {
	type: string;
	song?: Song;
	songs?: Song[];
	album?: Album;
	albums?: Album[];
	isAddingSong?: boolean;
	songPhotoUploadFocus?: null | Song;
	updatingSong?: null | Song;
	updatingAlbum?: null | Album;
	replaceAudio?: null | Song;
	isLoading?: boolean;
	error?: any;
}

const initialState: ContextInterface = {
	// Context Data
	albums: [...MockAlbums] as Album[],
	songs: [] as Song[],

	// Context State
	error: null,
	isAddingSong: false,
	isLoading: false,
	isRemovingSongPhoto: false,
	songPhotoUploadFocus: null,
	replaceAudio: null,
	updatingAlbum: null,
	updatingSong: null,

	// Context Methods
	handleAddSongPhoto: () => null,
	handleDeleteSong: () => null,
	handleReplaceAudio: () => null,
	handleDeleteSongPhoto: () => null,
	handleUpdateAlbum: () => null,
	handleUpdateSongDetails: () => null,
	handleUploadNewSong: () => null,

	removeSong: () => null,

	setReplaceAudio: () => null,
	setUpdatingAlbum: () => null,
	setUpdatingSong: () => null,

	toggleIsAddingSong: () => null,
	toggleIsLoading: () => null,
	toggleIsRemovingSongPhoto: () => null,
	setSongPhotoUploadFocus: () => null,
};

const ManageDiscographyContext = React.createContext(initialState);

/**
 * >>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 * >>>>>>>>>>>>>>>>>>> TODO <<<<<<<<<<<<<<<<<<<<<<<<<<
 * >>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 *
 * --> Finish the Song Photo Upload feature
 * - Change boolean flag for song photo to hold a song so only one modal opens
 * - Set up upload function that created MultipartForm and submits to API
 * - Create success and error handler here. Success changes the focus song for modal close
 * - Run local update song handler using returned song
 *
 * --> Add option to remove Song Photo
 * - Set up api handler
 * - Put focus song in state
 * - Run local update song handler using returned song
 */

const DiscographyReducer = (
	state: any,
	{
		type,
		song,
		songs,
		album,
		isAddingSong,
		updatingSong,
		replaceAudio,
		updatingAlbum,
		songPhotoUploadFocus,
		isLoading,
		albums,
		error,
	}: ActionsInterface
) => {
	switch (type) {
		// ==>> Data Setters
		case actions.SET_SONGS:
			return updateObj(state, { songs });
		case actions.SET_ALBUMS:
			return updateObj(state, { albums });
		case actions.SET_ERROR:
			return updateObj(state, { error });

		// >> Update Focus Setters
		case actions.SET_UPDATE_SONG_DETAILS:
			return updateObj(state, { updatingSong });
		case actions.SET_REPLACE_AUDIO:
			return updateObj(state, { replaceAudio });
		case actions.SET_UPDATING_ALBUM:
			return updateObj(state, { updatingAlbum });

		// ==>> Toggles
		case actions.TOGGLE_IS_ADDING_SONG:
			return updateObj(state, { isAddingSong });
		case actions.TOGGLE_IS_LOADING:
			return updateObj(state, { isLoading });
		case actions.TOGGLE_IS_UPLOADING_SONG_PHOTO:
			return updateObj(state, { songPhotoUploadFocus });

		// ==>> State Data Actions
		case actions.REMOVE_SONG:
			songs = !song ? songs : state.songs.filter((s: Song) => s._id.toString() !== song._id.toString());
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
		case actions.UPDATE_ALBUM:
			albums = !album ? state.albums : state.albums.map((a: Album) => (a._id !== album._id ? a : album));
			songs = !album
				? state.songs
				: state.songs.map((s: Song) => {
						if (s.album._id === album._id) return { ...s, album };
						return s;
				  });
			return updateObj(state, {
				albums,
				songs,
			});
		default:
			return state;
	}
};

const ManageDiscographyProvider = (props: any) => {
	const [state, dispatch] = React.useReducer(DiscographyReducer, ManageDiscographyContext);

	//----------------------------
	// ==> STATE Functions
	//----------------------------
	// --> UI Toggles
	function toggleIsLoading(isLoading: boolean) {
		return dispatch({ type: actions.TOGGLE_IS_LOADING, isLoading });
	}

	function toggleIsAddingSong(isAddingSong: boolean) {
		return dispatch({ type: actions.TOGGLE_IS_ADDING_SONG, isAddingSong });
	}

	// --> UI Setters
	function setSongPhotoUploadFocus(songPhotoUploadFocus: Song | null) {
		return dispatch({ type: actions.TOGGLE_IS_UPLOADING_SONG_PHOTO, songPhotoUploadFocus });
	}

	function setUpdatingSong(updatingSong: Song | null) {
		return dispatch({ type: actions.SET_UPDATE_SONG_DETAILS, updatingSong });
	}

	function setReplaceAudio(replaceAudio: Song | null) {
		return dispatch({ type: actions.SET_REPLACE_AUDIO, replaceAudio });
	}

	function setUpdatingAlbum(updatingAlbum: Album | null) {
		return dispatch({ type: actions.SET_UPDATING_ALBUM, updatingAlbum });
	}

	// --> Local Data Updates
	function addSong(song: Song) {
		return dispatch({ type: actions.ADD_SONG, song });
	}

	function removeSong(song: Song) {
		return dispatch({ type: actions.REMOVE_SONG, song });
	}

	//----------------------------
	//==> API Functions
	//----------------------------
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

	async function handleUpdateSongDetails(data: any, success: Function, handleError: Function) {
		function successCallback(data: any) {
			const { song } = data;
			if (song) {
				dispatch({ type: actions.UPDATE_SONG, song });
			} else {
				console.log('Did not get a song back from api success');
			}

			success(data);

			setUpdatingSong(null);
			toggleIsLoading(false);
		}

		function errorCallback(errors: any) {
			toggleIsLoading(false);
			handleError(errors);
		}

		if (data && state.updatingSong) {
			toggleIsLoading(true);
			const multipart_form_data = new FormData();
			Object.entries(data).map((entry: any) => multipart_form_data.append(entry[0], entry[1]));
			return audioAPI.updateSong({
				data: multipart_form_data,
				successCallback,
				errorCallback,
				updateId: state.updatingSong._id,
			});
		}
	}

	async function handleReplaceAudio(data: any, success: Function, handleError: Function) {
		function successCallback(data: any) {
			const { song } = data;
			if (song) {
				dispatch({ type: actions.UPDATE_SONG, song });
			} else {
				console.log('Did not get a song back from api success');
			}

			success(data);

			setReplaceAudio(null);
			toggleIsLoading(false);
		}

		function errorCallback(errors: any) {
			toggleIsLoading(false);
			handleError(errors);
		}

		if (data && state.replaceAudio) {
			toggleIsLoading(true);
			const multipart_form_data = new FormData();

			Object.entries(data).map((entry: any) => multipart_form_data.append(entry[0], entry[1]));
			return audioAPI.replaceAudio({
				data: multipart_form_data,
				successCallback,
				errorCallback,
				updateId: state.replaceAudio._id,
			});
		}
	}

	async function handleDeleteSong(song: Song, successCallback: Function, errorCallback: Function) {
		return audioAPI.deleteSong({ data: song, successCallback, errorCallback });
	}

	async function handleUpdateAlbum(data: any, success: Function, handleError: Function) {
		function successCallback(data: any) {
			const { album } = data;

			if (album) {
				dispatch({ type: actions.UPDATE_ALBUM, album });
			} else {
				console.log('Did not get a song back from api success');
			}

			success(data);

			setUpdatingAlbum(null);
			toggleIsLoading(false);
		}

		function errorCallback(errors: any) {
			toggleIsLoading(false);
			handleError(errors);
		}

		if (data && state.updatingAlbum) {
			toggleIsLoading(true);
			const multipart_form_data = new FormData();

			Object.entries(data).map((entry: any) => multipart_form_data.append(entry[0], entry[1]));
			return audioAPI.updateAlbum({
				data: multipart_form_data,
				successCallback,
				errorCallback,
				updateId: state.updatingAlbum._id,
			});
		}
	}

	async function handleAddSongPhoto(data: any, handleSuccess?: Function, handleError?: Function) {
		toggleIsLoading(true);
		const multipart_form_data = new FormData();
		Object.entries(data).map((entry: any) => multipart_form_data.append(entry[0], entry[1]));

		function successCallback(data: any) {
			console.log({ data });
			const { song } = data;
			if (song) {
				console.log('got the song');
				if (handleSuccess) handleSuccess();
				dispatch({ type: actions.UPDATE_SONG, song });
				setSongPhotoUploadFocus(null);
			} else {
				console.log('got no song');
			}
			toggleIsLoading(false);
		}
		function errorCallback(errors: any) {
			if (handleError) handleError(errors);
			toggleIsLoading(false);
		}

		return audioAPI.uploadSongPhoto({ data: multipart_form_data, successCallback, errorCallback });
	}

	async function handleDeleteSongPhoto(songId: string) {
		toggleIsLoading(true);
		console.log({ songId });

		function successCallback(data: any) {
			console.log({ data });
			if (data.song) {
				dispatch({ type: actions.UPDATE_SONG, song: data.song });
				setSongPhotoUploadFocus(null);
			} else {
				console.log('no song came back');
			}

			toggleIsLoading(false);
		}

		function errorCallback(errors: any) {
			console.log({ errors });
		}

		return audioAPI.deleteSongPhoto({ data: { songId }, successCallback, errorCallback });
	}

	/**
	 *---------------------
	 * FETCHING AUDIO INIT
	 *---------------------
	 * This context only mounts if the user is authenticated. Fetch all audio in DB and load into state
	 */
	async function fetchAdminAudio() {
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

		dispatch({ type: actions.SET_SONGS, songs });
		dispatch({ type: actions.SET_ALBUMS, albums });
		return songs;
	}

	React.useEffect(() => {
		fetchAdminAudio();
	}, []);

	return (
		<ManageDiscographyContext.Provider
			value={{
				// Data
				...state,
				songs: state.songs ? state.songs : [],

				// Data updates
				addSong,
				removeSong,
				handleUploadNewSong,
				handleDeleteSong,
				handleUpdateSongDetails,
				handleDeleteSongPhoto,
				handleReplaceAudio,
				handleUpdateAlbum,
				handleAddSongPhoto,

				// Toggles
				toggleIsAddingSong,
				toggleIsLoading,
				setSongPhotoUploadFocus,
				setUpdatingSong,
				setReplaceAudio,
				setUpdatingAlbum,
			}}
			{...props}
		/>
	);
};

export { ManageDiscographyContext, ManageDiscographyProvider };
