// ==> React
import * as React from 'react';

// ==> Packages
import { Form, Spin } from 'antd';

// ==> Project
import { NewSongInputInterface } from 'components/cms/cms-types';
import { Album } from 'types';
import { Button, IconifyIcon, ICON_CLOSE } from 'components';
import { ManageDiscographyContext } from 'contexts';
import { useForm } from 'hooks';

// ==> Component
import SongDetailsSection from './songFormComponents/section_Details';
import SelectAlbumSection from './songFormComponents/section_Album';
import SelectNominationSecion from './songFormComponents/section_Nominations';
import SelectCertificationSection from './songFormComponents/section_Certifications';
import UploadAudioSection from './songFormComponents/section_Audio';

import Style from './songForm.module.scss';

const initialState: NewSongInputInterface = {
	artist: '',
	audio: null,
	certified: false,
	certifiedFor: 'song',
	existingAlbum: null,
	newAlbumTitle: '',
	newAlbumArtist: '',
	newAlbumPhoto: '',
	newAlbumYear: null,
	nominated: false,
	nominatedAward: null,
	nominatedFor: 'song',
	nominatedStatus: 'nominated',
	photo: '',
	title: '',
	useAlbumPhoto: true,
	useAlbumArtist: true,
	useAlbumYear: true,
	year: null,
};
interface AddSongInterface {
	notificationAPI: any;
}

export interface SongFormInterface {
	onChange: any;
	values: any;
	setValue?: Function;
	form?: any;
	albums?: Album[];
}

const SongForm = ({ notificationAPI }: AddSongInterface) => {
	// =>> Set up form data for use by inputs and Form Element
	const { values, onChange, setValue } = useForm({ initialState });
	const [form] = Form.useForm();
	const [errors, setErrors] = React.useState<any>({});

	// ==> Setup forms submission protocol
	const { handleUploadNewSong, isLoading, toggleIsAddingSong, albums } = React.useContext(ManageDiscographyContext);

	const onSubmit = () => {
		// TODO :: VALIDATE SONG VALUES BEFORE UPLOAD
		let payload = values;
		if (payload.useAlbumPhoto === true) payload.photo = '';
		handleUploadNewSong(payload, successCallback, errorCallback);
	};

	// Preview Sources for photo selection inputs. Pass useState setter as callback into 'setPhotoPreviewResult' and use useState var as src in preview elements.
	const errorCallback = (errors: any) => setErrors(errors.response.data.errors);

	const successCallback = () => {
		return notificationAPI.success({
			duration: 1,
			message: 'Success',
			description: 'Song successfully added to discography!',
			placement: 'top',
		});
	};

	React.useEffect(() => {
		if (errors) {
			Object.entries(errors).map((error) => {
				let message = error[0] as string;
				let description = error[1] as string;

				return notificationAPI.error({
					duration: 2,
					message,
					description,
					placement: 'top',
				});
			});

			setErrors(null);
		}
	}, [notificationAPI, errors]);

	return (
		<>
			{isLoading === true && (
				<div className={Style.LoadingOverlay}>
					<div className={Style.LoadingOverlayInner}>
						<Spin
							size='large'
							spinning={true}
							tip={'Adding Song... This may take a moment. Do not refresh or leave page.'}
						/>
					</div>
				</div>
			)}
			<div className={Style.FormContainer}>
				<div className={Style.CloseForm} onClick={() => toggleIsAddingSong(false)}>
					<IconifyIcon icon={ICON_CLOSE} />
				</div>

				<Form className={Style.FormOuter} name='add_song_form' initialValues={values} form={form}>
					<SelectAlbumSection
						onChange={onChange}
						values={values}
						setValue={setValue}
						albums={albums}
						form={form}
					/>
					<SongDetailsSection onChange={onChange} values={values} setValue={setValue} />
					<SelectCertificationSection onChange={onChange} values={values} />
					<SelectNominationSecion onChange={onChange} values={values} />
					<UploadAudioSection onChange={onChange} values={values} />

					<Button onClick={onSubmit}>Add To Discography</Button>
					<Button type='secondary' style={{ marginLeft: '10px' }} onClick={() => toggleIsAddingSong(false)}>
						Cancel
					</Button>
				</Form>
			</div>
		</>
	);
};

export default SongForm;
