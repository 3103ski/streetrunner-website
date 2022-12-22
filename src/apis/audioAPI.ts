import axios from 'axios';

import routes from 'routes';
import { TOKEN_LABEL } from 'config';

interface AddNewSongInterface {
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
	addNewSong({ data, successCallback, errorCallback }: AddNewSongInterface) {
		let token = localStorage.getItem(TOKEN_LABEL);
		apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

		return apiInstance({
			data,
			method: 'POST',
			url: `${routes.SERVER_URL}${routes.SERVER_CONTENT}${routes.SERVER_CONTENT_MUSIC}`,
		})
			.then(({ data }) => {
				console.log({ returned: data });
				if (successCallback) successCallback(data);
			})
			.catch((errors) => {
				console.log(errors);
				if (errorCallback) errorCallback(errors);
			});
	},
	fetchSongs() {
		return apiInstance({
			method: 'GET',
			url: `${routes.SERVER_URL}${routes.SERVER_CONTENT}${routes.SERVER_CONTENT_MUSIC}`,
		})
			.then(({ data }) => {
				console.log(data);
				return data;
			})
			.catch((errors) => {
				console.log(errors);
			});
	},
};

export { audioAPI };
