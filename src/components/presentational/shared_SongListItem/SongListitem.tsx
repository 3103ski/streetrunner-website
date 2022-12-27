// React
import * as React from 'react';

// Packages
import { Image, Typography } from 'antd';

// Project Imports
import { IconifyIcon, ICON_PLAY_BUTTON } from 'components';
import { AudioPlayerContext } from 'contexts';

import { formatSeconds, formatFileSize, selectSongPhoto } from 'util/index';
import { Song } from 'types';
import SongItemMenu from './SongItemMenu';

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
	const { handlePlaySong } = React.useContext(AudioPlayerContext);

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
				{showMenu && <SongItemMenu song={song} />}

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
