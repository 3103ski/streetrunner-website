import * as React from 'react';

import { Image } from 'antd';

import { IconifyIcon, ICON_PLAY_BUTTON } from 'components';
import { Song } from 'types';
import { formatSeconds, formatFileSize } from 'util/index';
import Style from './songListItem.module.scss';

interface SongListItemProps {
	title: string;
	subtitle: string;
	photo: string;
	size?: 'default' | 'small';
	song?: Song;
	songUrl?: string;
	lastItem?: boolean | null;
}

const SongListItem = ({ title, subtitle, lastItem = null, song, size = 'default' }: SongListItemProps) => {
	const [length, setLength] = React.useState<string | null>(null);

	React.useEffect(() => {
		if (!length && song) {
			let au = document.createElement('audio');
			au.src = song.audio.secure_url;
			au.addEventListener('loadedmetadata', function () {
				setLength(formatSeconds(au.duration));
			});
		}
	}, [length, song]);
	return (
		song && (
			<div className={Style.Wrapper} data-size={size} data-is-last-item={lastItem ? 1 : 0}>
				<Image
					className={Style.Photo}
					src={
						song.useAlbumPhoto && song.album.photo
							? song.album.photo.secure_url
							: song.photo
							? song.photo.secure_url
							: ''
					}
					alt='album art'
				/>

				<div className={Style.InfoWrapper}>
					<p className={Style.Title}>{title}</p>
					<p className={Style.SubTitle}>{subtitle}</p>
				</div>

				<div className={Style.PlayWrapper}>
					{song.audio.size && length && (
						<p style={{ margin: '0' }}>
							{formatFileSize(song.audio.size)} • {length}
						</p>
					)}
					<div className={Style.PlayIcon}>
						<IconifyIcon icon={ICON_PLAY_BUTTON} />
					</div>
				</div>
			</div>
		)
	);
};

export default SongListItem;
