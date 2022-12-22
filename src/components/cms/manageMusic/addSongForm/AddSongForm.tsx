// ==> React
import * as React from 'react';

// ==> Packages
import { Form, Radio, Checkbox, Tabs, Select, Empty, Row, Col, Spin } from 'antd';

// ==> Project
import { NewSongInputInterface, GeneralInputInterface } from 'components/cms/cms-types';
import { Input, Button, PhotoInput, IconifyIcon, ICON_CLOSE } from 'components';
import { ManageDiscographyContext } from 'contexts';
import { useForm } from 'hooks';
import { formatFileSize } from 'util/index';

// ==> Component
import Style from './addSongForm.module.scss';

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
	useAlbumPhoto: false,
	useAlbumArtist: true,
	useAlbumYear: true,
	year: null,
};
interface AddSongInterface {
	notificationAPI: any;
}
const AddSongForm = ({ notificationAPI }: AddSongInterface) => {
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
	const [albumPhotoPreview, setAlbumPhotoPreview] = React.useState<any>('');
	const [songPhotoPreview, setSongPhotoPreview] = React.useState<any>('');

	function errorCallback(errors: any) {
		setErrors(errors.response.data.errors);
	}

	function successCallback() {
		return notificationAPI.success({
			duration: 1,
			message: 'Success',
			description: 'Song successfully added to discography!',
			placement: 'top',
		});
	}

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

	/**
	 * A function that will clean out new album data if the user switches over to use an existing album.
	 * Do not want to send unecessary data.
	 */
	const handleAlbumTabClick = () => {
		let albumResetInfo = { newAlbumTitle: '', newAlbumPhoto: '', newAlbumYear: null, existingAlbum: null };
		form.setFieldsValue(albumResetInfo);
		setAlbumPhotoPreview('');
		setValue(albumResetInfo);
	};

	/**
	 * ----------------------------------------------------------------------------------------------------------
	 * ----------------------------------------------------------------------------------------------------------
	 * ----------------------------------------->> FORM SECTIONS <<----------------------------------------------
	 * ----------------------------------------------------------------------------------------------------------
	 * ----------------------------------------------------------------------------------------------------------
	 */

	/**
	 * --------
	 * ADDING/SELECTING ALBUM(or EP)
	 * --------
	 * - User should be able to add a new album along with a song, or add their sone to an existing
	 *   album previously added with a song
	 */

	const albumDetailsSection = (
		<div className={Style.FormSection}>
			<h1>Release/Album Details</h1>
			<Tabs
				defaultActiveKey='tab__new_album'
				className={Style.CardTabs}
				type='card'
				tabPosition='left'
				size={'small'}
				onTabClick={handleAlbumTabClick}
				items={[
					{
						label: `New Album`,
						key: `tab__new_album`,
						children: (
							<Row>
								<Col span={8}>
									<PhotoInput.PhotoPreview
										preview={albumPhotoPreview}
										name='newAlbumPhoto'
										onClick={() => PhotoInput.clickPhotoInput('newAlbumPhoto')}
									/>
									<PhotoInput.ResetWrapper name='newAlbumPhoto'>
										<PhotoInput
											name='newAlbumPhoto'
											setterCallback={setAlbumPhotoPreview}
											onChange={onChange}
										/>
									</PhotoInput.ResetWrapper>
								</Col>
								<Col span={16}>
									<Form.Item name={'newAlbumTitle'}>
										<Input
											onChange={onChange}
											value={values['newAlbumTitle']}
											placeholder={'Album Title'}
											name={'newAlbumTitle'}
										/>
									</Form.Item>
									<Form.Item name={'newAlbumArtist'}>
										<Input
											onChange={onChange}
											value={values['newAlbumArtist']}
											placeholder={'Album Artist'}
											name={'newAlbumArtist'}
										/>
									</Form.Item>
									<Form.Item name={'newAlbumYear'}>
										<Input
											type='number'
											onChange={onChange}
											value={values['newAlbumYear']}
											placeholder={'Album Year'}
											name={'newAlbumYear'}
										/>
									</Form.Item>
								</Col>
							</Row>
						),
					},
					{
						label: `Exisisting Albums`,
						key: `tab__existing_album`,
						children: (
							<Select
								style={{ width: '100%' }}
								placeholder={'Select Album'}
								optionFilterProp='children'
								dropdownStyle={{ backgroundColor: Style.color_themePrimary }}
								value={values.existingAlbum}
								onChange={(value) =>
									onChange({ target: { type: 'select', name: 'existingAlbum', value } })
								}
								filterOption={(input, option) =>
									(option?.key.toLocaleLowerCase() ?? '').includes(input)
								}
								filterSort={(optionA, optionB) =>
									(optionA?.key ?? '').toLowerCase().localeCompare((optionB?.key ?? '').toLowerCase())
								}
								options={albums.map((album) => ({
									key: album.title + album._id,
									value: album._id,
									label: (
										<div className={Style.AlbumSelectOption}>
											<img src={album.photo?.secure_url} alt='album art' />
											<p style={{ color: 'black !important' }}>{album.title}</p>
										</div>
									),
								}))}
							/>
						),
					},
				]}
			/>
		</div>
	);

	/**
	 * --------
	 * => INPUT SONG DETAILS
	 * --------
	 * -
	 */

	const songDetailsCheckBoxed: GeneralInputInterface[] = [
		{
			name: 'useAlbumYear',
			label: 'Use Album Year',
		},
		{
			name: 'useAlbumArtist',
			label: 'Use Album Artist',
		},
		{
			name: 'useAlbumPhoto',
			label: 'Use Album Photo',
			onChange: (e: any) => {
				if (e.target && e.target.checked === true)
					PhotoInput.handleResetPhotoInput('photo', setSongPhotoPreview, setValue);
				onChange(e);
			},
		},
	];

	const songDetailsSection = (
		<div className={Style.FormSection}>
			<h1>Song Details</h1>
			<Row style={{ width: '100%' }}>
				<Col span={values.useAlbumPhoto ? 0 : 6}>
					{/* Adding photo for the new song AS SONG PHOTO - not album photo - user can leave this blank and use the photo from album */}
					<PhotoInput.PhotoPreview preview={songPhotoPreview} name='photo' />
					<PhotoInput.ResetWrapper name='photo'>
						<PhotoInput name='photo' setterCallback={setSongPhotoPreview} onChange={onChange} />
					</PhotoInput.ResetWrapper>
				</Col>

				<Col span={values.useAlbumPhoto ? 24 : 18}>
					<p>Shared Details</p>
					{songDetailsCheckBoxed.map((checkbox) => (
						<Checkbox
							key={`${Math.random()}`}
							name={checkbox.name}
							checked={values[checkbox.name]}
							onChange={checkbox.onChange ? checkbox.onChange : onChange}>
							{checkbox.label}
						</Checkbox>
					))}

					<Form.Item name='title' rules={[{ required: true, message: 'Song Title is required' }]}>
						<Input onChange={onChange} value={values.title} placeholder='Song Title' name='title' />
					</Form.Item>

					<Form.Item name='artist' style={{ display: values.useAlbumArtist ? 'none' : '' }}>
						<Input onChange={onChange} value={values.artist} placeholder='Artist' name='artist' />
					</Form.Item>

					<Form.Item name='year' style={{ display: values.useAlbumYear ? 'none' : '' }}>
						<Input onChange={onChange} value={values.year} placeholder='Year' name='year' type='number' />
					</Form.Item>
				</Col>
			</Row>
		</div>
	);

	/**
	 * --------
	 * => AUDIO UPLOAD SECTION
	 * --------
	 * -
	 */
	const audioUploadSection = (
		<div className={Style.FormSection}>
			<Form.Item name='audio' style={{ display: 'none' }}>
				<Input
					type='file'
					onChange={onChange}
					placeholder='Audio'
					name='audio'
					accept='.mp3, .wav'
					value={values.audio}
					id={'fileInput_audio'}
				/>
			</Form.Item>
			<Empty
				image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
				imageStyle={{
					height: 60,
				}}
				description={
					!values.audio ? (
						<p>No Audio Selected</p>
					) : (
						<p>
							{values.audio.name} • {formatFileSize(values.audio.size)}
						</p>
					)
				}>
				<Button
					onClick={() => {
						document.getElementById('fileInput_audio')?.click();
					}}>
					{!values.audio ? 'Add Audio' : 'Change Audio'}
				</Button>
			</Empty>
		</div>
	);

	/**
	 * --------
	 * => RIAA CERTIFICATIONS
	 * --------
	 * -
	 */
	const certificationsSection = (
		<div className={Style.FormSection}>
			<h1>RIAA</h1>
			<Form.Item name='certified'>
				<Checkbox name='certified' checked={values.certified} onChange={onChange}>
					Certified
				</Checkbox>
			</Form.Item>

			<Form.Item name='certifiedFor' style={{ display: !values.certified ? 'none' : '' }}>
				<Radio.Group onChange={onChange} value={values.nominatedFor} name='certifiedFor'>
					<Radio value={'song'}>Song</Radio>
					<Radio value={'album'}>Album</Radio>
				</Radio.Group>
			</Form.Item>
		</div>
	);

	/**
	 * --------
	 * => AWARD NOMINATIONS
	 * --------
	 *
	 * -If the song was nominated for an award, we need to collect that information.
	 * We are asking if the nomination was for song or album, this is used for labeling in UI,
	 * there is no album nomination attached to the album document if that nomination is for album.
	 *
	 */

	const nominationsSection = (
		<div className={Style.FormSection}>
			<h1>Nominations</h1>
			<Form.Item name='nominated'>
				<Checkbox name='nominated' checked={values.nominated} onChange={onChange}>
					Nominated
				</Checkbox>
			</Form.Item>

			<div style={{ display: !values.nominated ? 'none' : '' }}>
				<p>Nominated For:</p>
				<Form.Item name='nominatedFor'>
					<Radio.Group name='nominatedFor' onChange={onChange} value={values.nominatedFor}>
						<Radio value={'album'}>Album</Radio>
						<Radio value={'song'}>Song</Radio>
					</Radio.Group>
				</Form.Item>

				<p>Status:</p>
				<Form.Item name='nominatedStatus'>
					<Radio.Group name='nominatedStatus' onChange={onChange} value={values.nominatedStatus}>
						<Radio value={'nominated'}>Nominated</Radio>
						<Radio value={'winner'}>Won</Radio>
					</Radio.Group>
				</Form.Item>
				<Form.Item
					name='nominatedAward'
					rules={[{ required: values.nominated, message: 'Please include what the nomination was for' }]}>
					<Input
						onChange={onChange}
						value={values.nominatedAward}
						placeholder='What is the award?'
						name='nominatedAward'
					/>
				</Form.Item>
			</div>
		</div>
	);

	/**
	 * -----------------
	 * >> RENDER FORM <<
	 * -----------------
	 */
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
					{albumDetailsSection}
					{songDetailsSection}
					{audioUploadSection}
					{certificationsSection}
					{nominationsSection}
					<Button onClick={onSubmit}>Add To Discography</Button>
					<Button type='secondary' style={{ marginLeft: '10px' }} onClick={() => toggleIsAddingSong(false)}>
						Cancel
					</Button>
				</Form>
			</div>
		</>
	);
};

export default AddSongForm;
