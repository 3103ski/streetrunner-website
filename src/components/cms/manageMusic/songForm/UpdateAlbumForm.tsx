import * as React from 'react';

import { Form, Spin } from 'antd';

import { ManageDiscographyContext } from 'contexts';
import { Input, Button, PhotoInput } from 'components';
import { useForm } from 'hooks';

const UpdateAlbumForm = () => {
	const { isLoading, setUpdatingAlbum, updatingAlbum, handleUpdateAlbum } =
		React.useContext(ManageDiscographyContext);
	const [form] = Form.useForm();
	const { values, onChange, setValue } = useForm({
		initialState: {
			title: updatingAlbum ? updatingAlbum.title : '',
			year: updatingAlbum ? updatingAlbum.year : null,
			artist: updatingAlbum ? updatingAlbum.artist : '',
			newAlbumPhoto: null,
		},
	});

	function handleConfirmUpdateAlbum() {
		return handleUpdateAlbum(values, successCallback, errorCallback);
	}

	function successCallback(data: any) {
		console.log({ data });
	}

	function errorCallback(errors: any) {
		console.log({ errors });
	}

	const [photoUpdatePreview, setPhotoUpdatePreview] = React.useState(
		updatingAlbum && updatingAlbum.photo ? updatingAlbum.photo.secure_url : ''
	);

	const cancelAlbumUpdate = React.useCallback(() => {
		setUpdatingAlbum(null);
	}, [setUpdatingAlbum]);

	React.useEffect(() => {
		if (!updatingAlbum && values.newAlbumPhoto !== null) {
			setPhotoUpdatePreview('');
			form.setFieldsValue({
				title: '',
				year: null,
				artist: '',
				newAlbumPhoto: null,
			});
			setValue({ newAlbumPhoto: null });
		}
	}, [form, setValue, updatingAlbum, values.newAlbumPhoto]);

	return React.useMemo(
		() => (
			<Form form={form}>
				{isLoading ? (
					<Spin />
				) : (
					<>
						<Form.Item>
							<Input name='title' value={values.title} onChange={onChange} placeholder='Album Title' />
						</Form.Item>
						<Form.Item>
							<Input name='artist' value={values.artist} onChange={onChange} placeholder='Artist' />
						</Form.Item>
						<Form.Item>
							<Input name='year' value={values.year} onChange={onChange} placeholder='Year' />
						</Form.Item>
						{updatingAlbum && (
							<PhotoInput.PhotoPreview
								preview={
									photoUpdatePreview === '' && updatingAlbum.photo
										? updatingAlbum.photo.secure_url
										: photoUpdatePreview
								}
								name='newAlbumPhoto'
							/>
						)}
						<PhotoInput.ResetWrapper name='newAlbumPhoto'>
							<PhotoInput
								name='newAlbumPhoto'
								setterCallback={setPhotoUpdatePreview}
								onChange={onChange}
							/>
						</PhotoInput.ResetWrapper>
						s
						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'space-between',
								paddingTop: '15px',
							}}>
							<Button onClick={cancelAlbumUpdate} type='secondary'>
								Cancel
							</Button>
							<Button onClick={handleConfirmUpdateAlbum} type='primary'>
								Update Album
							</Button>
						</div>
					</>
				)}
			</Form>
		),
		[
			cancelAlbumUpdate,
			form,
			isLoading,
			onChange,
			photoUpdatePreview,
			updatingAlbum,
			values.artist,
			values.title,
			values.year,
		]
	);
};

export default UpdateAlbumForm;
