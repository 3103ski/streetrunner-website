import axios from 'axios';

import routes from 'routes';
import { TOKEN_LABEL } from 'config';

interface APICallInterface {
	data: any;
	successCallback?: Function;
	errorCallback?: Function;
}

let apiInstance = axios.create({
	headers: {
		'Content-Type': 'multipart/form-data',
	},
});

const audioAPI = {
	addNewSong({ data, successCallback, errorCallback }: APICallInterface) {
		let token = localStorage.getItem(TOKEN_LABEL);
		apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

		return apiInstance({
			data,
			method: 'POST',
			url: `${routes.SERVER_URL}${routes.SERVER_CONTENT}${routes.SERVER_CONTENT_MUSIC}`,
		})
			.then(({ data }) => {
				if (successCallback) successCallback(data);
			})
			.catch((errors) => {
				console.log(errors);
				if (errorCallback) errorCallback(errors);
			});
	},
	deleteSong({ data, successCallback, errorCallback }: APICallInterface) {
		let token = localStorage.getItem(TOKEN_LABEL);
		apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		return apiInstance({
			data,
			method: 'DELETE',
			url: `${routes.SERVER_URL}${routes.SERVER_CONTENT}${routes.SERVER_CONTENT_MUSIC}?delete_song=${data._id}`,
		})
			.then(({ data }) => {
				if (successCallback) successCallback(data);
			})
			.catch((errors) => {
				console.log({ errors });
				if (errorCallback) errorCallback(errors);
			});
	},
	updateSong({ data, successCallback, errorCallback, updateId }: APICallInterface & { updateId: string }) {
		let token = localStorage.getItem(TOKEN_LABEL);
		apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

		return apiInstance({
			data,
			method: 'PUT',
			url: `${routes.SERVER_URL}${routes.SERVER_CONTENT}${routes.SERVER_CONTENT_MUSIC}?update_id=${updateId}`,
		})
			.then(({ data }) => successCallback && successCallback(data))
			.catch((errors) => errorCallback && errorCallback(errors));
	},
	replaceAudio({ data, successCallback, errorCallback, updateId }: APICallInterface & { updateId: string }) {
		let token = localStorage.getItem(TOKEN_LABEL);
		apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

		return apiInstance({
			data,
			method: 'PUT',
			url: `${routes.SERVER_URL}${routes.SERVER_CONTENT}${routes.SERVER_CONTENT_MUSIC}${routes.MUSIC_REPLACE_AUDIO}?update_id=${updateId}`,
		})
			.then(({ data }) => successCallback && successCallback(data))
			.catch((errors) => errorCallback && errorCallback(errors));
	},
	updateAlbum({ data, successCallback, errorCallback, updateId }: APICallInterface & { updateId: string }) {
		let token = localStorage.getItem(TOKEN_LABEL);
		apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

		return apiInstance({
			data,
			method: 'PUT',
			url: `${routes.SERVER_URL}${routes.SERVER_CONTENT}${routes.SERVER_CONTENT_MUSIC}${routes.MUSIC_UPDATE_ALBUM}?update_id=${updateId}`,
		})
			.then(({ data }) => successCallback && successCallback(data))
			.catch((errors) => errorCallback && errorCallback(errors));
	},
	fetchSongs(query?: string) {
		return apiInstance({
			method: 'GET',
			url: `${routes.SERVER_URL}${routes.SERVER_CONTENT}${routes.SERVER_CONTENT_MUSIC}${
				query ? `?${query}` : ''
			}`,
		})
			.then(({ data }) => {
				return data;
			})
			.catch((errors) => {
				console.log(errors);
			});
	},
};

export { audioAPI };
