import * as React from 'react';

import { Form, notification } from 'antd';

import { Input, Button, Loader } from 'components';
import { useForm } from 'hooks';
import { Spacer } from 'layout';
import { authAPI } from 'apis/authAPI';
import axios from 'axios';
import routes from 'routes';

const ManageAccount = () => {
	const [messageApi, contextHolder] = notification.useNotification();

	//----------------------
	//--> Password Update
	//----------------------
	const pwInitialState = { password: '', newPassword: '', confirmPassword: '' };
	const { values: pwVals, onChange: pwOnChange, setValue: pwResetVal } = useForm({ initialState: pwInitialState });
	const [isLoadingUpdatePassword, toggleIsLoadingUpdatePassword] = React.useState<boolean>(false);
	const [pwForm] = Form.useForm();

	async function handleUpdatePassword() {
		toggleIsLoadingUpdatePassword(true);
		return authAPI.updatePassword({ data: pwVals, successCallback, errorHandler });
	}

	function successCallback() {
		pwForm.setFieldsValue(pwInitialState);

		pwResetVal(pwInitialState);
		toggleIsLoadingUpdatePassword(false);

		messageApi.success({
			placement: 'topLeft',
			message: 'Password Updated Successfully!',
		});
	}

	function errorHandler(errors: any) {
		console.log({ errors });
		messageApi.error({
			placement: 'topLeft',
			message: 'There was an error while updating password. Try refreshing the page then try again.',
		});
	}

	//----------------------
	//--> Youtube Update
	//----------------------
	const ytInitialState = { playlistId: '' };
	const { values: ytVals, onChange: ytOnChange, setValue: ytSetVals } = useForm({ initialState: ytInitialState });

	const [isUpdatingYouTube, toggleIsUpdatingYouTube] = React.useState<boolean>(false);
	const [ytForm] = Form.useForm();

	async function handleYouTubeUpdate() {
		toggleIsUpdatingYouTube(true);
		return authAPI.updateYouTubePlaylist(ytVals, handleSuccessYoutubeUpdate, handleErrorYoutubeUpdate);
	}

	function handleSuccessYoutubeUpdate() {
		ytForm.setFieldsValue(ytInitialState);
		ytSetVals(ytInitialState);
		getCurrentYoutubeInfo();
		toggleIsUpdatingYouTube(false);
	}

	function handleErrorYoutubeUpdate(errors: any) {
		toggleIsUpdatingYouTube(false);

		messageApi.error({
			placement: 'topLeft',
			message: 'There was an error while updating the YouTube playlist. Try refreshing the page then try again.',
		});
	}

	const [currentYoutubeData, setCurrentYoutubeData] = React.useState<any>(null);
	const getCurrentYoutubeInfo = React.useCallback(async () => {
		let { data } = await axios.get(
			`${routes.SERVER_URL}${routes.SERVER_CONTENT}${routes.SERVER_CONTENT_VIDEO}${routes.VIDEO_YOUTUBE_INFO}`
		);

		if (data.playlist) {
			setCurrentYoutubeData(data.playlist);
		}
	}, []);

	React.useEffect(() => {
		if (!currentYoutubeData) {
			getCurrentYoutubeInfo();
		}
	}, [currentYoutubeData, getCurrentYoutubeInfo]);

	return (
		<div>
			{contextHolder}
			<h1>Change Password</h1>
			{isLoadingUpdatePassword ? (
				<Loader />
			) : (
				<Form form={pwForm}>
					<Form.Item>
						<Input
							type='password'
							name='password'
							onChange={pwOnChange}
							value={pwVals.password}
							placeholder='Current Password'
						/>
					</Form.Item>
					<Form.Item>
						<Input
							type='password'
							name='newPassword'
							onChange={pwOnChange}
							value={pwVals.newPassword}
							placeholder='New Password'
						/>
					</Form.Item>
					<Form.Item>
						<Input
							type='password'
							name='confirmPassword'
							onChange={pwOnChange}
							value={pwVals.confirmPassword}
							placeholder='Confirm New Password'
						/>
					</Form.Item>
					<Form.Item>
						<Button onClick={handleUpdatePassword}>Update Password</Button>
					</Form.Item>
				</Form>
			)}
			<Spacer height='25px' />
			<h1>YouTube Playlist</h1>
			{!currentYoutubeData || isUpdatingYouTube ? (
				<Loader />
			) : (
				<>
					<h5>Current Playlist Title : {currentYoutubeData.title}</h5>
					<h5>Current Playlist ID : {currentYoutubeData.playlistId}</h5>
					<Form form={ytForm}>
						<Form.Item>
							<Input
								name='playlistId'
								value={ytVals.playlistId}
								onChange={ytOnChange}
								placeholder='New YouTube Playlist ID'
							/>
						</Form.Item>
						<Form.Item>
							<Button onClick={handleYouTubeUpdate}>Update Playlist ID</Button>
						</Form.Item>
					</Form>
				</>
			)}
		</div>
	);
};

export default ManageAccount;
