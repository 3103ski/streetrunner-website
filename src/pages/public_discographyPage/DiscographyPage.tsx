// ==> React
import * as React from 'react';

// ==> Project Imports
import { SongListItem, Overlay } from 'components';
import { ContentCol, Footer, Spacer, ScrollToTop } from 'layout';
import { DiscographyHeader } from 'assets';
import { Song } from 'types';
import { audioAPI } from 'apis/audioAPI';

// Component
import Style from './discographyPage.module.scss';

const DiscographyPage = () => {
	const [songs, setSongs] = React.useState<null | Song[]>(null);

	async function fetchSongs() {
		let { songs } = await audioAPI.fetchSongs();
		if (songs) setSongs(songs);
	}

	React.useEffect(() => {
		if (!songs) fetchSongs();
	}, [songs]);

	const Stat = ({ count, label }: { count: number; label: string }) => {
		return (
			<div className={Style.Stat}>
				<p>
					{count}
					<span>{label}</span>
				</p>
			</div>
		);
	};

	return (
		<div className={Style.Wrapper} style={{ position: 'relative' }}>
			<div className={Style.HeaderPic} style={{ backgroundImage: `url(${DiscographyHeader})` }}>
				<Overlay type='from-bottom' />
			</div>

			<Spacer height='50vh' maxHeight='450px' minHeight='300px' />

			<ContentCol padding=''>
				<h2 className={Style.HeaderText}>THREE-TIME GRAMMY AWARD WINNER</h2>
			</ContentCol>

			<div className={Style.StatBarOuter}>
				<ContentCol padding='30px 0 '>
					<div className={Style.StatBarInner}>
						<Stat count={songs ? songs.length : 0} label={'TRACKS'} />
						<Stat count={songs ? songs.filter((s: Song) => s.certified).length : 0} label={'RIAA CERTS'} />
					</div>
				</ContentCol>
			</div>

			<ContentCol>
				{songs &&
					songs.map((song, i) => (
						<SongListItem
							key={song._id}
							song={song}
							size='small'
							title={`${song.title}`}
							subtitle={`By ${song.artist}`}
							lastItem={i === songs.length - 1}
						/>
					))}
			</ContentCol>

			<Footer />

			<ScrollToTop />
		</div>
	);
};

export default DiscographyPage;
