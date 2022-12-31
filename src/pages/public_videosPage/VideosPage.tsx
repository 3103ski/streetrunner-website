import * as React from 'react';
import axios from 'axios';
import { Row, Col } from 'antd';

import { YouTubeVideoColumn, Button, Loader } from 'components';
import { Spacer } from 'layout';
import { ContentCol } from 'layout';

import * as config from 'config';

import Style from './videosPage.module.scss';

const VideosPage = () => {
	const [videos, setVideos] = React.useState<any[]>([]);

	const [loadMoreToken, setLoadMoreToken] = React.useState<string>('');
	const [totalVideoCount, setTotalVideoCount] = React.useState<number>(0);

	const [initalLoaded, setInitialLoaded] = React.useState<boolean>(false);
	const [isLoadingMore, setIsLoadingMore] = React.useState<boolean>(false);

	// --> Long playlist example
	const playlistID = `PLKF4NwO9Nob_xN-ddHnL7MgTLrHgOZQL8`;
	const youTubeURL = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=12&playlistId=${playlistID}&key=${config.YOUTUBE_API}`;

	async function loadMore() {
		setIsLoadingMore(true);

		let { data } = await axios.get(`${youTubeURL}&pageToken=${loadMoreToken}`);

		setLoadMoreToken(data.nextPageToken);
		setVideos([...videos, ...data.items]);
		setIsLoadingMore(false);
	}

	React.useEffect(() => {
		if (!initalLoaded) {
			axios
				.get(youTubeURL)
				.then((res) => {
					setVideos(res.data.items);
					setLoadMoreToken(res.data.nextPageToken);
					setTotalVideoCount(res.data.pageInfo.totalResults);
					setInitialLoaded(true);
				})
				.catch((errors) => console.log({ errors }));
		}
	}, [initalLoaded, youTubeURL, videos]);

	return (
		<ContentCol>
			<Spacer height='45px' />
			<h1>VIDEOGRAPHY</h1>
			<Row>
				{!initalLoaded && <Loader />}
				{videos &&
					videos.map((video: any) => {
						return <YouTubeVideoColumn video={video} />;
					})}
				<Col span={24} className={Style.LoadWrapper}>
					<Spacer height='45px' />
					{isLoadingMore && initalLoaded ? (
						<Loader />
					) : videos.length < totalVideoCount ? (
						<Button onClick={loadMore}>Load More</Button>
					) : null}
				</Col>
			</Row>
		</ContentCol>
	);
};

export default VideosPage;
