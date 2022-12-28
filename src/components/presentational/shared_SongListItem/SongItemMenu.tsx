// React
import * as React from 'react';

// Packages
import { Modal, Dropdown } from 'antd';
import type { MenuProps } from 'antd';

// Projects
import { IconifyIcon, ICON_DOTS_MENU_DOTS, Button } from 'components';
import { ManageDiscographyContext } from 'contexts';
import { Song } from 'types';

// Update Forms
import UpdateDetails from 'components/cms/manageMusic/songForm/UpdateDetailsForm';

import Style from './songListItem.module.scss';

const SongItemMenu = ({ song }: { song: Song }) => {
	const { handleDeleteSong, removeSong, setUpdatingSong, updatingSong } = React.useContext(ManageDiscographyContext);
	const [deleteErrors, setDeleteErrors] = React.useState<any>(null);

	const menuItems: MenuProps['items'] = [
		{
			key: `edit_${song && song._id}`,
			label: <p onClick={() => setUpdatingSong(song)}>Edit Song Details</p>,
		},
		{
			key: `edit_album_${song && `${song._id}_${song.album._id}`}`,
			label: <p onClick={() => setUpdatingSong(song)}>Edit Album '{song.album.title}'</p>,
		},
		{
			key: `replace_audio_${song && song._id}`,
			label: <p onClick={() => toggleIsReplacingAudio(true)}>Repalce Audio</p>,
		},
		{
			key: `song_photo_${song && song._id}`,
			label: (
				<p onClick={() => toggleIsUpdatingSongPhoto(true)}>
					{!song.photo ? 'Add Song Photo' : 'Remove/Replace Song Photo'}
				</p>
			),
		},
		{ key: `delete_${song && song._id}`, label: <p onClick={() => toggleIsDeleting(true)}>Delete Song</p> },
	];

	//---------------------
	// ==> Deleting Modal
	//---------------------
	const [isDeleting, toggleIsDeleting] = React.useState<boolean>(false);

	const handleCancelDelete = () => toggleIsDeleting(false);
	const handleConfirmDelete = () => handleDeleteSong(song, handleDeleteSuccess, handleDeleteError);
	const handleDeleteError = (errors: any) => setDeleteErrors(errors.response.data.errors);
	const handleDeleteSuccess = (data: any) => {
		if (data.deletedSong) {
			removeSong(data.deletedSong);
			toggleIsDeleting(false);
		}
	};

	const deleteModal = (
		<Modal
			open={isDeleting}
			onCancel={handleCancelDelete}
			title={`Delete "${song.title}"`}
			footer={React.createElement(() => {
				return (
					<div>
						<Button onClick={handleCancelDelete} type='secondary'>
							Cancel
						</Button>
						<Button onClick={handleConfirmDelete} type='primary'>
							Yes, Delete
						</Button>
					</div>
				);
			})}>
			{deleteErrors &&
				Object.entries(deleteErrors).map((error: any) => (
					<p key={`${Math.random()}`} style={{ fontSize: '9px' }}>
						SERVER_ERROR :: {error[0]} : {error[1]}
					</p>
				))}
			<p>Are you sure you want to delete "{song.title}"? This action can NOT be undone</p>
		</Modal>
	);

	//----------------------
	// ==> Update Modal
	//----------------------
	const updateModal = (
		<Modal
			open={updatingSong && updatingSong._id === song._id ? true : false}
			onCancel={() => setUpdatingSong(null)}
			title={`Update "${song.title}" Details`}
			footer={React.createElement(() => {
				return null;
			})}>
			<p>If you would like to change the audio file itself, you must delete and recreate the song.</p>
			<UpdateDetails song={song} />
		</Modal>
	);

	//----------------------
	// ==> Song Photo
	//----------------------
	const [isUpdatingSongPhoto, toggleIsUpdatingSongPhoto] = React.useState<boolean>(false);
	const songPhotoModal = (
		<Modal
			open={isUpdatingSongPhoto}
			onCancel={() => toggleIsUpdatingSongPhoto(false)}
			title={`Update "${song.title}" Details`}
			footer={React.createElement(() => {
				return (
					<div>
						<Button onClick={() => toggleIsUpdatingSongPhoto(false)} type='secondary'>
							Cancel
						</Button>
						<Button onClick={() => toggleIsUpdatingSongPhoto(false)} type='primary'>
							Update
						</Button>
					</div>
				);
			})}>
			{song.photo && <p>SONG LISTS will default to Album Photo if photo is removed.</p>}
			{!song.photo && (
				<p>
					SONG LISTS will use <strong>song photo over album photo if present.</strong> If you wish to go back
					to album photo in the future, remove the photo added to the song.
				</p>
			)}
		</Modal>
	);

	//----------------------
	// ==> Replace Audio
	//----------------------
	const [isReplacingAudio, toggleIsReplacingAudio] = React.useState<boolean>(false);
	const handleConfirmReplaceAudio = () => toggleIsReplacingAudio(false);
	const handleCancelReplaceAudio = () => toggleIsReplacingAudio(false);

	const replaceAudioModal = (
		<Modal
			open={isReplacingAudio}
			onCancel={handleCancelReplaceAudio}
			title={`Update "${song.title}" Details`}
			footer={React.createElement(() => {
				return (
					<div>
						<Button onClick={handleCancelReplaceAudio} type='secondary'>
							Cancel
						</Button>
						<Button onClick={handleConfirmReplaceAudio} type='primary'>
							Update
						</Button>
					</div>
				);
			})}>
			<p>Replace Audio File for song here</p>
		</Modal>
	);

	//-----------------------------
	//----- RENDER MENU
	//-----------------------------
	return (
		<div className={Style.MenuWrapper}>
			<Dropdown menu={{ items: menuItems }} placement='bottomLeft'>
				<IconifyIcon size='sm' icon={ICON_DOTS_MENU_DOTS} />
			</Dropdown>
			{deleteModal}
			{songPhotoModal}
			{replaceAudioModal}
			{updateModal}
		</div>
	);
};

export default SongItemMenu;
