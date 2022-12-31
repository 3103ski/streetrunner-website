import * as React from 'react';
import YouTube from 'react-youtube';
import { Col, Modal, Spin, Typography } from 'antd';
import Style from './youTubeEmbed.module.scss';

const { Text } = Typography;

export const YouTubeVideoColumn = ({ video }: { video: any }) => {
	// Video Data
	const [videoId, setVideoId] = React.useState<null | string>(null);
	const [thumbnail, setThumbnail] = React.useState<string>('');
	const [title, setVideoTitle] = React.useState<string>('');

	// Component State
	const [open, toggleOpen] = React.useState<boolean>(false);
	const [hide, setHide] = React.useState<boolean>(false);

	// Helpers
	const close = () => toggleOpen(false);

	// Set video data on mount
	React.useEffect(() => {
		if (video) {
			let data = video.snippet;

			if (data.title === 'Private Video') {
				// We had permission to see the video on the list but not the video itself
				setHide(true);
			} else {
				setThumbnail(data.thumbnails.high.url);
				setVideoId(data.resourceId.videoId);
				setVideoTitle(data.title);
			}
		}
	}, [video]);

	return (
		(!hide || !videoId) && (
			<>
				<Col
					xs={24}
					sm={22}
					md={12}
					lg={8}
					xl={6}
					xxl={6}
					key={Math.random()}
					className={Style.ColWrapper}
					onClick={() => toggleOpen(true)}>
					{!videoId ? (
						<Spin />
					) : (
						<div className={Style.VideoCardWrapper}>
							<div className={Style.ThumbWrapper}>
								<img src={thumbnail} alt='' />
							</div>
							<div className={Style.VideoDetails}>
								<Text ellipsis>{title}</Text>
							</div>
						</div>
					)}
				</Col>
				<Modal
					width={'100vw'}
					style={{ maxWidth: '900px' }}
					open={open}
					destroyOnClose={true}
					onCancel={close}
					footer={React.createElement(() => null)}>
					{videoId && <YouTubeEmbed videoID={videoId} closeCallback={close} />}
				</Modal>
			</>
		)
	);
};

const YouTubeEmbed = ({ videoID, closeCallback }: { videoID: string; closeCallback: Function }) => {
	// Store width/height in React State
	const [width, setWidth] = React.useState<any>(null);
	const [height, setHeight] = React.useState<any>(null);

	// Wrapper ID for DOM Manipulation
	const wrapperID = `video_wrapper_${videoID}`;

	// A function that can calculate the video size based on container width
	const calcVideoWidth = React.useCallback(() => {
		// Get wrapper from DOM
		let wrapper = document.getElementById(wrapperID);

		if (wrapper) {
			// If we found the wrapper, set the width and calculate/set height
			setWidth(`${wrapper.getBoundingClientRect().width}`);
			setHeight(`${wrapper.getBoundingClientRect().width / 1.778}`);
		}
	}, [wrapperID]);

	// Calculate video size when the screen is resized
	window.onresize = () => {
		calcVideoWidth();
	};

	// Size video on mount
	React.useEffect(() => {
		calcVideoWidth();
	}, [calcVideoWidth]);

	return (
		<div id={wrapperID} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
			<YouTube
				videoId={videoID}
				onEnd={() => closeCallback()}
				opts={{
					height,
					width,
					playerVars: {
						autoplay: 1,
						modestbranding: 1,
					},
				}}
			/>
		</div>
	);
};

export default YouTubeEmbed;
