import { Collapse } from 'antd';
import { songs } from 'mockdata/mockSongs';
import { Card, SongListItem } from 'components';

const { Panel } = Collapse;

const AwardsAndNominationsSection = () => {
	/**
	 * Component will hit the server for songs that have been nominated.
	 * Then must parse and organize by year, one panel per year, proper
	 * SongListItem txt formatting
	 */
	return (
		<Card title='AWARDS & NOMINATIONS'>
			<Collapse accordion>
				<Panel header='2018' key={122}>
					{songs.map((song) => {
						return (
							<SongListItem
								title={`${song.nominationStatus} • ${song.nominatedFor}`}
								subtitle={`${song.artist} - "${song.title}"`}
							/>
						);
					})}
				</Panel>
				<Panel header='2018' key={133}>
					<SongListItem title='Song' subtitle='some title' />
					<SongListItem title='Song' subtitle='some title' />
					<SongListItem title='Song' subtitle='some title' />
					<SongListItem title='Song' subtitle='some title' />
				</Panel>
			</Collapse>
		</Card>
	);
};

export default AwardsAndNominationsSection;
