import * as React from 'react';

import { Form, Spin } from 'antd';

import { Button } from 'components';
import { ManageDiscographyContext } from 'contexts';
import { useForm } from 'hooks';
import { Song } from 'types';

import SelectNominationSecion from './songFormComponents/section_Nominations';
import SelectCertificationSection from './songFormComponents/section_Certifications';
import SongDetailsSection from './songFormComponents/section_Details';

import Style from '../shared.module.scss';

const UpdateDetails = ({ song }: { song: Song }) => {
	const { values, onChange, setValue } = useForm({
		initialState: {
			artist: song.artist,
			title: song.title,
			year: song.year,

			certified: song.certified,
			certifiedFor: song.certifiedFor,

			nominated: song.nominated,
			nominatedAward: song.nominatedAward === ('null' || '') ? '' : song.nominatedAward,
			nominatedFor: song.nominatedFor,
			nominatedStatus: song.nominatedStatus,

			useAlbumPhoto: song.useAlbumPhoto ? song.useAlbumPhoto : false,
			useAlbumArtist: song.album.artist === song.artist,
			useAlbumYear: song.album.year === song.year,
			photo: song.photo ? song.photo.secure_url : null,
		},
	});
	const [form] = Form.useForm();

	const { setUpdatingSong, handleUpdateSongDetails, isLoading } = React.useContext(ManageDiscographyContext);

	//-------------------
	//== Form Methods
	//-------------------
	const handleConfirmUpdate = () => {
		console.log({ song });
		console.log({ values });
		let data = {
			...values,
			year: values.useAlbumYear === true ? song.album.year : values.year,
			artist: values.useAlbumArtist === true ? song.album.artist : values.artist,
			photo: values.useAlbumPhoto === true ? null : values.photo,
		};
		handleUpdateSongDetails(data, handleUpdateDetailsSuccess, handleUpdateDetailsError);
	};
	const handleCancelUpdate = () => setUpdatingSong(null);

	const handleUpdateDetailsSuccess = (data: any) => {
		console.log('success');
		console.log({ successData: data });
	};
	const handleUpdateDetailsError = (errors: any) => {
		console.log({ errors });
	};

	return (
		<Form className={Style.FormOuter} name='add_song_form' initialValues={values} form={form}>
			{isLoading ? (
				<Spin />
			) : (
				<>
					<SongDetailsSection
						onChange={onChange}
						values={values}
						setValue={setValue}
						hidePhotoOption={true}
					/>
					<SelectNominationSecion onChange={onChange} values={values} />
					<SelectCertificationSection onChange={onChange} values={values} />
					<div
						style={{ width: '100%', display: 'flex', justifyContent: 'space-between', paddingTop: '15px' }}>
						<Button onClick={handleCancelUpdate} type='secondary'>
							Cancel
						</Button>
						<Button onClick={handleConfirmUpdate} type='primary'>
							Update
						</Button>
					</div>
				</>
			)}
		</Form>
	);
};

export default UpdateDetails;
