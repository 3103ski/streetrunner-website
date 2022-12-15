import * as React from 'react';
import photos from 'mockdata/mockPhotos';
import Style from './songReel.module.scss';

const SongReel = () => {
	let [photoSize, photoXMargin] = [100, 5];

	return (
		<div
			className={Style.SongReelOuter}
			style={{
				'--total-photo-width': `-${photos.length * (photoSize + photoXMargin)}px`,
				'--double-photo-width': `${photos.length * (photoSize + photoXMargin) * 2}px`,
				'--animation-duration': `${photos.length * 1.5}s`,
				'--photo-size': `${photoSize}px`,
				'--photo-x-margin': `${photoXMargin}px`,
			}}>
			<div className={Style.SongReelInner}>
				{[...photos, ...photos].map((photo) => (
					<img src={photo.secure_url} alt={`${photo._id}_song-cover`} />
				))}
			</div>
		</div>
	);
};

export default SongReel;
