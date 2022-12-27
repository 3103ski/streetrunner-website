import * as React from 'react';

import { Modal, Dropdown } from 'antd';
import type { MenuProps } from 'antd';

import { IconifyIcon, ICON_DOTS_MENU_DOTS, Button } from 'components';
import { ManageDiscographyContext } from 'contexts';
import { Song } from 'types';

import Style from './songListItem.module.scss';

const SongItemMenu = ({ song }: { song: Song }) => {
	const { handleDeleteSong, removeSong } = React.useContext(ManageDiscographyContext);
	const [deleteErrors, setDeleteErrors] = React.useState<any>(null);

	const menuItems: MenuProps['items'] = [
		{ key: `edit_${song && song._id}`, label: <p onClick={() => toggleIsUpdating(true)}>Edit Song Details</p> },
		{ key: `update_audio_${song && song._id}`, label: <p onClick={() => toggleIsUpdating(true)}>Repalce Audio</p> },
		{ key: `delete_${song && song._id}`, label: <p onClick={() => toggleIsDeleting(true)}>Delete Song</p> },
	];

	//---------------------
	// ==> Deleting a Song
	//---------------------
	const [isDeleting, toggleIsDeleting] = React.useState<boolean>(false);

	const handleCancelDelete = () => toggleIsDeleting(false);
	const handleConfirmDelete = async () => handleDeleteSong(song, handleDeleteSuccess, handleDeleteError);
	const handleDeleteError = (errors: any) => setDeleteErrors(errors.response.data.errors);
	const handleDeleteSuccess = (data: any) => {
		if (data.deletedSong) {
			removeSong(data.deletedSong);
			toggleIsDeleting(false);
		}
	};

	//----------------------
	// ==> Updating Song
	//----------------------
	const [isUpdating, toggleIsUpdating] = React.useState<boolean>(false);
	const handleConfirmUpdate = () => toggleIsUpdating(false);
	const handleCancelUpdate = () => toggleIsUpdating(false);

	return (
		<div className={Style.MenuWrapper}>
			<Dropdown menu={{ items: menuItems }} placement='bottomLeft'>
				<IconifyIcon size='sm' icon={ICON_DOTS_MENU_DOTS} />
			</Dropdown>

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

			<Modal
				open={isUpdating}
				title={`Update "${song.title}" Details`}
				footer={React.createElement(() => {
					return (
						<div>
							<Button onClick={handleCancelUpdate} type='secondary'>
								Cancel
							</Button>
							<Button onClick={handleConfirmUpdate} type='primary'>
								Update
							</Button>
						</div>
					);
				})}>
				<p>If you would like to change the audio file itself, you must delete and recreate the song.</p>
				{/* NEW UPDATE FORM GOES HERE */}
			</Modal>
		</div>
	);
};

export default SongItemMenu;
