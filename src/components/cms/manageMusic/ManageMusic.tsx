// React
import * as React from 'react';

import { notification, Modal } from 'antd';

// Project Imports
import { Button, SongListItem } from 'components';
import UpdateAlbumForm from './songForm/UpdateAlbumForm';
import { ManageDiscographyContext } from 'contexts';

// Component Imports
import AddSongForm from './songForm/SongForm';

const ManageMusic = () => {
	const { toggleIsAddingSong, isAddingSong, songs, updatingAlbum, setUpdatingAlbum } =
		React.useContext(ManageDiscographyContext);
	const [api, contextHolder] = notification.useNotification();

	//-------------------------
	// ==> Update Album Modal
	//-------------------------
	const updateAlbumModal = (
		<Modal
			destroyOnClose={true}
			open={updatingAlbum ? true : false}
			onCancel={() => setUpdatingAlbum(null)}
			title={`Update "${updatingAlbum ? updatingAlbum.title : ''}" Details`}
			footer={React.createElement(() => null)}>
			<p>Updating Album will update for all songs attached to it</p>
			<UpdateAlbumForm />
		</Modal>
	);

	return (
		<>
			{contextHolder}
			{isAddingSong ? (
				<AddSongForm notificationAPI={api} />
			) : (
				<>
					{updateAlbumModal}
					<div style={{ display: 'flex', marginBottom: '10px' }}>
						<Button style={{ marginLeft: 'auto' }} onClick={() => toggleIsAddingSong(true)}>
							Add Song
						</Button>
					</div>
					{songs &&
						songs
							.sort((a, b) => (a.album.title < b.album.title ? -1 : 1))
							.map((song, i) => (
								<SongListItem
									size='small'
									key={song._id}
									showFileInfo
									showMenu
									song={song}
									lastItem={i === songs.length - 1}
									title={song.title}
									subtitle={song.album && `"${song.album.title}" by ${song.album.artist}`}
								/>
							))}
				</>
			)}
		</>
	);
};

export default ManageMusic;
