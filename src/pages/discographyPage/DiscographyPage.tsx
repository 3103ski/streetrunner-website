// ==> Project Imports
import { SongItem } from 'components';
import { ContentCol, Footer, Spacer, ScrollToTop } from 'layout';
import { DiscographyHeader } from 'assets';

import { songs } from 'mockdata/mockSongs';

// Component
import Style from './discographyPage.module.scss';

const DiscographyPage = () => {
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
		<div className={Style.Wrapper}>
			<div className={Style.Inner} style={{ position: 'relative' }}>
				<div className={Style.HeaderPic} style={{ backgroundImage: `url(${DiscographyHeader})` }}>
					<div className={Style.Filter}></div>
				</div>

				<Spacer height='50vh' maxHeight='450px' minHeight='300px' />
				<ContentCol padding=''>
					<h2>THREE-TIME GRAMMY AWARD WINNER</h2>
				</ContentCol>
				<div className={Style.StatBarOuter}>
					<ContentCol padding='30px 0 '>
						<div className={Style.StatBarInner}>
							<Stat count={137} label={'TRACKS'} />
							<Stat count={24} label={'RIAA CERTS'} />
						</div>
					</ContentCol>
				</div>

				<ContentCol>
					{songs.map((song, i) => (
						<SongItem
							title={`${song.nominationStatus ? `${song.nominationStatus} • ` : ''}${song.title}${
								song.year ? ` • ${song.year}` : ''
							}`}
							subtitle={`${song.artist}`}
							lastItem={i === songs.length - 1}
						/>
					))}
				</ContentCol>
				<Footer />
			</div>
			<ScrollToTop />
		</div>
	);
};

export default DiscographyPage;
