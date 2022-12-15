import { Row, Col, Image } from 'antd';
import { songs } from 'mockdata/mockSongs';

import { IconifyIcon, ICON_PLAY_BUTTON } from 'components';
import Style from './songItem.module.scss';

interface SongItemProps {
	title: string;
	subtitle: string;
	photo: string;
	songUrl?: string;
	lastItem?: boolean | null;
}

const SongItem = ({ title, subtitle, lastItem = null }: SongItemProps) => {
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

export default SongItem;
