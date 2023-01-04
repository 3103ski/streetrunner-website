import * as React from 'react';

import { Form } from 'antd';

import { PhotoInput, Button, Loader } from 'components';
import { useForm } from 'hooks';
import { ManageDiscographyContext } from 'contexts';

const ManageSongPhotoForm = () => {
	const { setSongPhotoUploadFocus, isLoading, songPhotoUploadFocus, handleAddSongPhoto, handleDeleteSongPhoto } =
		React.useContext(ManageDiscographyContext);
	const [form] = Form.useForm();
	const { values, onChange } = useForm({
		initialState: {
			photo: null,
		},
	});

	const confirmPhotoUpload = () =>
		songPhotoUploadFocus && handleAddSongPhoto({ ...values, songId: songPhotoUploadFocus._id });

	const confirmDeleteSongPhoto = () => {
		console.log({ songPhotoUploadFocus });
		return songPhotoUploadFocus && handleDeleteSongPhoto(songPhotoUploadFocus._id);
	};

	const [photoUpdatePreview, setPhotoUpdatePreview] = React.useState(
		songPhotoUploadFocus && songPhotoUploadFocus.photo ? songPhotoUploadFocus.photo.secure_url : ''
	);

	return (
		<Form form={form}>
			{isLoading ? (
				<Loader />
			) : (
				songPhotoUploadFocus && (
					<>
						<PhotoInput.PhotoPreview preview={photoUpdatePreview} name='photo' />
						<PhotoInput.ResetWrapper name='photo'>
							<PhotoInput name='photo' setterCallback={setPhotoUpdatePreview} onChange={onChange} />
						</PhotoInput.ResetWrapper>
						<div style={{ padding: '10px' }}>
							<Button onClick={() => setSongPhotoUploadFocus(null)} type='secondary'>
								Cancel
							</Button>
							<Button onClick={confirmPhotoUpload} type='primary'>
								Update
							</Button>
							{songPhotoUploadFocus.photo && (
								<Button onClick={confirmDeleteSongPhoto}>Remove & Use Album Photo</Button>
							)}
						</div>
					</>
				)
			)}
		</Form>
	);
};

export default ManageSongPhotoForm;
