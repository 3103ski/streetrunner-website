import photos from 'mockdata/mockPhotos';
import Style from './infiniteReel.module.scss';

const InfiniteReel = () => {
	let [photoSize, photoXMargin] = [100, 6];

	return (
		<div
			className={Style.InfiniteReelOuter}
			style={{
				'--total-photo-width': `-${photos.length * (photoSize + photoXMargin * 2)}px`,
				'--double-photo-width': `${photos.length * (photoSize + photoXMargin * 2) * 2}px`,
				'--animation-duration': `${photos.length * 1.2}s`,
				'--photo-size': `${photoSize}px`,
				'--photo-x-margin': `${photoXMargin}px`,
			}}>
			<div className={Style.InfiniteReelInner}>
				{[...photos, ...photos].map((photo) => (
					<img src={photo.secure_url} alt={`${photo._id}_song-cover`} />
				))}
			</div>
		</div>
	);
};

export default InfiniteReel;
