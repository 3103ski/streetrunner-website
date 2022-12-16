import { Image } from 'antd';
import { songs } from 'mockdata/mockSongs';

import { IconifyIcon, ICON_PLAY_BUTTON } from 'components';
import Style from './songListItem.module.scss';

interface SongListItemProps {
	title: string;
	subtitle: string;
	photo: string;
	songUrl?: string;
	lastItem?: boolean | null;
}

const SongListItem = ({ title, subtitle, lastItem = null }: SongListItemProps) => {
	return (
		<div className={Style.Wrapper} data-is-last-item={lastItem ? 1 : 0}>
			<Image
				className={Style.Photo}
				src={songs[0].album ? songs[0].album.photo?.secure_url : ''}
				alt='album art'
			/>

			<div className={Style.InfoWrapper}>
				<p className={Style.Title}>{title}</p>
				<p className={Style.SubTitle}>{subtitle}</p>
			</div>

			<div className={Style.PlayWrapper}>
				<IconifyIcon icon={ICON_PLAY_BUTTON} />
			</div>
		</div>
	);
};

export default SongListItem;
