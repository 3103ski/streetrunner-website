// ==> React
import * as React from 'react';
import ReactDOM from 'react-dom/client';

// ==> Packages
import { Form, Radio, Checkbox, Tabs, Select, Empty, Row, Col } from 'antd';

// ==> Project
import { NewSongInputInterface } from 'components/cms/cms-types';
import { Input, Button } from 'components';
import { ManageDiscographyContext } from 'contexts';
import { useForm } from 'hooks';
import { formatFileSize } from 'util/index';

// ==> Component
import Style from './addSongForm.module.scss';

import { MockAlbums } from 'mockdata';

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

const AddSongForm = () => {
	const { values, onChange, setValue } = useForm({ initialState });
	const { handleUploadNewSong } = React.useContext(ManageDiscographyContext);

	const [form] = Form.useForm();

	const [newAlbumPhotoPreview, setNewAlbumPhotoSource] = React.useState<any>('');
	const [newSongPhotoPreview, setSongPhotoSource] = React.useState<any>('');

	const onSubmit = () => {
		/**
		 * Will check to see if song photo should be sent vie 'useAlbumPhoto' flag.
		 * It is easier to dump it here than programatically clear or replace the input field.
		 */
		let payload = values;
		if (payload.useAlbumPhoto === true) payload.photo = '';
		handleUploadNewSong(payload);
	};

	const photoUploadSelection = (e: any, key: string) => {
		onChange(e);

		const file = e.target.files[0];
		const reader = new FileReader();

		reader.readAsDataURL(file);
		reader.onloadend = () => {
			switch (key) {
				case 'album':
					setNewAlbumPhotoSource(reader.result);
					break;
				case 'song':
				default:
					setSongPhotoSource(reader.result);
					break;
			}
		};
	};

	const handleAlbumTabClick = () => {
		let albumResetInfo = { newAlbumTitle: '', newAlbumPhoto: '', newAlbumYear: null, existingAlbum: null };
		form.setFieldsValue(albumResetInfo);
		setNewAlbumPhotoSource('');
		setValue(albumResetInfo);
	};

	const handleResetFileInput = (fileKey: string, resetCallback?: null | Function) => {
		// Before 'onChange'; must reset file input to not break on changing value in form state.
		// To reset file input, will replace with new empy file input
		let inputWrapperParent = document.getElementById(`fileInputOuter_${fileKey}`); // Ref parent element
		let existingInputEl = document.getElementById(`fileInputWrapper_${fileKey}`); // Ref existing photo by custom ID

		if (inputWrapperParent && existingInputEl) {
			// if checked, photo input should be reset with new empty input
			if (existingInputEl) existingInputEl.remove(); // Remove potentially populated file input

			let newInputEl = document.createElement('div') as HTMLElement; // create new inputWrapper
			newInputEl.id = `fileInputWrapper_${fileKey}`; // assign ID used by this function to later remove again if necessary
			newInputEl.style.display = 'none';
			inputWrapperParent.insertAdjacentElement('beforeend', newInputEl); // Add new inputWrapper to inputParent

			let newInputRoot = ReactDOM.createRoot(newInputEl); // create react Root ref to input wrapper

			// Rest form values
			setValue({ [fileKey]: '' });
			if (resetCallback) resetCallback();

			// Create new react element to replace what we removed
			let newJSXElement = React.createElement(() => (
				<Form>
					<Form.Item name={fileKey}>
						<Input
							id={'fileSelect_photo'}
							type='file'
							onChange={(e: React.SyntheticEvent) => photoUploadSelection(e, 'song')}
							name={fileKey}
							value={values.photo}
						/>
					</Form.Item>
				</Form>
			));

			// render empty file input into new removable wrapper
			newInputRoot.render(newJSXElement);
		}
	};

	//------------------------
	// ==> FORM SECTIONS
	//------------------------
	const albumDetailsSection = (
		<>
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
							<>
								<Row>
									<Col span={8}>
										<PhotoPreview
											preview={newAlbumPhotoPreview}
											onClick={() => document.getElementById('fileSelect_newAlbumPhoto')?.click()}
										/>
									</Col>
									<Col span={16}>
										<Form.Item name='newAlbumTitle'>
											<Input
												onChange={onChange}
												value={values.newAlbumTitle}
												placeholder='Album Title'
												name='newAlbumTitle'
											/>
										</Form.Item>
										<Form.Item name='newAlbumArtist'>
											<Input
												onChange={onChange}
												value={values.newAlbumArtist}
												placeholder='Album Artist'
												name='newAlbumArtist'
											/>
										</Form.Item>
										<Form.Item name='newAlbumYear'>
											<Input
												onChange={onChange}
												type='number'
												value={values.newAlbumYear}
												placeholder='Album Year'
												name='newAlbumYear'
											/>
										</Form.Item>
									</Col>
								</Row>
								<div className={Style.NewPhotoInputWrapper}>
									<Form.Item name='newAlbumPhoto' style={{ display: 'none' }}>
										<Input
											type='file'
											id={'fileSelect_newAlbumPhoto'}
											onChange={(e: React.SyntheticEvent) => photoUploadSelection(e, 'album')}
											placeholder='Album Photo'
											name='newAlbumPhoto'
											value={values.newAlbumPhoto}
										/>
									</Form.Item>
								</div>
							</>
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
								options={MockAlbums.map((album) => ({
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
		</>
	);

	const songDetailsSection = (
		<>
			<h1>Song Details</h1>
			<div className={Style.NewPhotoInputWrapper} id='fileInputOuter_photo'>
				<Row style={{ width: '100%' }}>
					<Col span={values.useAlbumPhoto ? 0 : 6}>
						<PhotoPreview
							preview={newSongPhotoPreview}
							onClick={() => document.getElementById('fileSelect_photo')?.click()}
						/>
					</Col>
					<Col span={values.useAlbumPhoto ? 24 : 18}>
						<p>Shared Details</p>
						<Checkbox name='useAlbumYear' checked={values.useAlbumYear} onChange={onChange}>
							Use album year
						</Checkbox>
						<Checkbox name='useAlbumArtist' checked={values.useAlbumArtist} onChange={onChange}>
							Use album Artist
						</Checkbox>

						<Checkbox
							name='useAlbumPhoto'
							checked={values.useAlbumPhoto}
							onChange={(e) => {
								if (e.target.checked === true)
									handleResetFileInput('photo', () => setSongPhotoSource(''));
								onChange(e);
							}}>
							Use album Photo
						</Checkbox>

						<Form.Item name='title' rules={[{ required: true, message: 'Song Title is required' }]}>
							<Input onChange={onChange} value={values.title} placeholder='Song Title' name='title' />
						</Form.Item>

						{!values.useAlbumArtist && (
							<Form.Item name='artist' rules={[{ required: true, message: 'Artist is required' }]}>
								<Input onChange={onChange} value={values.artist} placeholder='Artist' name='artist' />
							</Form.Item>
						)}

						{!values.useAlbumYear && (
							<Form.Item name='year' rules={[{ required: true, message: 'Year is required' }]}>
								<Input
									onChange={onChange}
									value={values.year}
									placeholder='Year'
									name='year'
									type='number'
								/>
							</Form.Item>
						)}
					</Col>
				</Row>
				<div id='fileInputWrapper_photo' style={{ display: 'none' }}>
					<Form.Item name='photo'>
						<Input
							id={'fileSelect_photo'}
							type='file'
							onChange={(e: React.SyntheticEvent) => photoUploadSelection(e, 'song')}
							placeholder='Song Photo'
							name='photo'
							value={values.photo}
						/>
					</Form.Item>
				</div>
			</div>
		</>
	);

	const audioUploadSection = (
		<div className={Style.AudioSelectWrapper}>
			<Form.Item name='audio' style={{ display: 'none' }}>
				<Input
					type='file'
					onChange={onChange}
					placeholder='Audio'
					name='audio'
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

	const certificationsSection = (
		<>
			<h1>RIAA</h1>
			<Form.Item name='certified'>
				<Checkbox name='certified' checked={values.certified} onChange={onChange}>
					Certified
				</Checkbox>
			</Form.Item>
			{values.certified && (
				<Form.Item name='certifiedFor'>
					<Radio.Group onChange={onChange} value={values.nominatedFor} name='certifiedFor'>
						<Radio value={'song'}>Song</Radio>
						<Radio value={'album'}>Album</Radio>
					</Radio.Group>
				</Form.Item>
			)}
		</>
	);

	const nominationsSection = (
		<>
			<h1>Nominations</h1>
			<Form.Item name='nominated'>
				<Checkbox name='nominated' checked={values.nominated} onChange={onChange}>
					Nominated
				</Checkbox>
			</Form.Item>

			{values.nominated && (
				<>
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
				</>
			)}
		</>
	);

	React.useEffect(() => {
		document.addEventListener('resize', () => console.log('heard the thing'));
	}, []);

	return (
		<Form className={Style.FormOuter} name='add_song_form' initialValues={values} form={form}>
			{albumDetailsSection}
			{songDetailsSection}
			{audioUploadSection}
			{certificationsSection}
			{nominationsSection}
			<Button onClick={onSubmit}>Add To Discography</Button>
		</Form>
	);
};

const PhotoPreview = ({ preview, onClick }: { preview: any; onClick?: any; id?: string }) => {
	const setPreviewHeights = React.useCallback(() => {
		// const wrapper = document.getElementById(id);
		const previews = Array.from(document.querySelectorAll('.photo-file-input-preview')) as HTMLElement[];
		console.log({ previews });

		previews.map((wrapper) => {
			if (wrapper) {
				let width = wrapper.getBoundingClientRect().width;
				let pad: string | number = document.defaultView
					?.getComputedStyle(wrapper)
					.paddingRight.split('px')[0] as string;

				if (pad) {
					pad = parseInt(pad) as number;
					wrapper.style.height = `${width - pad * 2}px`;
				}
			}
			return null;
		});
	}, []);

	window.onresize = setPreviewHeights;

	React.useEffect(() => {
		setPreviewHeights();
	}, []);

	return (
		<div className={`${Style.NewPhotoPreview} photo-file-input-preview`} onClick={onClick}>
			{preview === '' ? (
				<div className={Style.NoPreview}>
					<p>Add</p>
					<p>Photo</p>
				</div>
			) : (
				<img src={preview ? preview : ''} alt='album_photo_upload_preview' />
			)}
		</div>
	);
};

export default AddSongForm;
