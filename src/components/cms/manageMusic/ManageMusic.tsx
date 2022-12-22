// React
import * as React from 'react';

import { notification } from 'antd';

// Project Imports
import { Button, SongListItem } from 'components';
import { ManageDiscographyContext } from 'contexts';

// Component Imports
import AddSongForm from './addSongForm/AddSongForm';

const ManageMusic = () => {
	const { toggleIsAddingSong, isAddingSong, songs } = React.useContext(ManageDiscographyContext);
	const [api, contextHolder] = notification.useNotification();

	React.useEffect(() => {
		console.log({ songs });
		console.log({ isAddingSong });
	}, [songs, isAddingSong]);

	return (
		<>
			{contextHolder}

			<div>
				{isAddingSong ? (
					<AddSongForm notificationAPI={api} />
				) : (
					<>
						<div style={{ display: 'flex', marginBottom: '10px' }}>
							<Button style={{ marginLeft: 'auto' }} onClick={() => toggleIsAddingSong(true)}>
								Add Song
							</Button>
						</div>
						{songs &&
							songs.map((song, i) => (
								<SongListItem
									size='small'
									key={song._id}
									song={song}
									lastItem={i === songs.length - 1}
									title={song.title}
									subtitle={song.album && `"${song.album.title}" by ${song.album.artist}`}
								/>
							))}
					</>
				)}
			</div>
		</>
	);
};

export default ManageMusic;
