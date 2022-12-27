// React
import * as React from 'react';

// Packages
import type { MenuProps } from 'antd';
import { Image, Typography, Dropdown, Modal } from 'antd';

// Project Imports
import { IconifyIcon, ICON_PLAY_BUTTON, ICON_DOTS_MENU_DOTS, Button } from 'components';
import { AudioPlayerContext, ManageDiscographyContext } from 'contexts';

import { formatSeconds, formatFileSize, selectSongPhoto } from 'util/index';
import { Song } from 'types';

// Component Imports
import Style from './songListItem.module.scss';

const { Paragraph } = Typography;

interface SongListItemProps {
	title: string;
	subtitle: string;
	photo: string;
	lastItem?: boolean | null;
	showFileInfo?: boolean;
	showMenu?: boolean;
	size?: 'default' | 'small';
	song?: Song;
	songUrl?: string;
}

const SongListItem = ({
	lastItem = null,
	showMenu = false,
	showFileInfo = false,
	size = 'default',
	song,
	subtitle,
	title,
}: SongListItemProps) => {
	const [length, setLength] = React.useState<string | null>(null);
	const [deleteErrors, setDeleteErrors] = React.useState<any>(null);
	const { handlePlaySong } = React.useContext(AudioPlayerContext);
	const { handleDeleteSong, removeSong } = React.useContext(ManageDiscographyContext);

	//---------------------
	// ==> Deleting Song
	//---------------------
	const [isDeleting, toggleIsDeleting] = React.useState<boolean>(false);

	async function handleConfirmDelete() {
		// call delete api here
		handleDeleteSong(song, handleDeleteSuccess, handleDeleteError);
	}

	function handleCancelDelete() {
		toggleIsDeleting(false);
	}

	function handleDeleteSuccess(data: any) {
		if (data.deletedSong) {
			removeSong(data.deletedSong);
			toggleIsDeleting(false);
		}
	}

	function handleDeleteError(errors: any) {
		setDeleteErrors(errors.response.data.errors);
	}

	//----------------------
	// ==> Updating Song
	//----------------------
	const [isUpdating, toggleIsUpdating] = React.useState<boolean>(false);

	function handleConfirmUpdate() {
		console.log('update confirmed!');
		toggleIsUpdating(false);
	}

	function handleCancelUpdate() {
		toggleIsUpdating(false);
	}

	// File menu options for admin views
	const menuItems: MenuProps['items'] = [
		{ key: `edit_${song && song._id}`, label: <p onClick={() => toggleIsUpdating(true)}>Edit Details</p> },
		{ key: `delete_${song && song._id}`, label: <p onClick={() => toggleIsDeleting(true)}>Delete Song</p> },
	];

	//==> Get Meta Data for files in admin views
	React.useEffect(() => {
		if (!length && song && showFileInfo) {
			let au = document.createElement('audio');

			au.src = song.audio.secure_url;
			au.addEventListener('loadedmetadata', function () {
				setLength(formatSeconds(au.duration));
			});
		}
	}, [length, song, showFileInfo]);

	/**
	 * TODO :: Need to show user that song is being deleted while waiting for server
	 * TODO :: Protect from user closing modal
	 */

	return (
		song && (
			<div className={Style.Wrapper} data-size={size} data-is-last-item={lastItem ? 1 : 0}>
				<>
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
				</>

				{showMenu && (
					<div className={Style.MenuWrapper}>
						<Dropdown menu={{ items: menuItems }} placement='bottomLeft'>
							<IconifyIcon size='sm' icon={ICON_DOTS_MENU_DOTS} />
						</Dropdown>
					</div>
				)}

				<Image className={Style.Photo} src={selectSongPhoto(song)} alt='album art' />

				<div className={Style.InfoWrapper} data-menu-showing={showMenu ? 1 : 0}>
					<div className={Style.TitleInfo}>
						<Paragraph ellipsis className={Style.Title}>
							{title}
						</Paragraph>
						<Paragraph ellipsis className={Style.SubTitle}>
							{subtitle}
						</Paragraph>
					</div>

					{song.audio.size && length && showFileInfo && (
						<div className={Style.FileInfo}>
							<p className={Style.Duration}>{length}</p>
							<p className={Style.Size}>{formatFileSize(song.audio.size)}</p>
						</div>
					)}
				</div>

				<div className={Style.PlayWrapper} onClick={() => handlePlaySong(song)}>
					<IconifyIcon icon={ICON_PLAY_BUTTON} size='sm' />
				</div>
			</div>
		)
	);
};

export default SongListItem;
