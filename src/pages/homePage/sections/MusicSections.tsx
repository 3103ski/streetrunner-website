// React
import { useNavigate } from 'react-router-dom';

// Packages
import { Collapse } from 'antd';

// ==> Project Imports
import { Button, SongItem } from 'components';
import { ContentCol } from 'layout';
import routes from 'routes';

import { songs } from 'mockdata/mockSongs';

// Component
import HomeSectionCard from './HomeSectionCard';

const { Panel } = Collapse;

const MusicSections = () => {
	const navigate = useNavigate();

	return (
		<ContentCol>
			<HomeSectionCard title='AWARDS & NOMINATIONS'>
				<Collapse accordion>
					<Panel header='2018' key={122}>
						{songs.map((song) => {
							return (
								<SongItem
									title={`${song.nominationStatus} • ${song.nominatedFor}`}
									subtitle={`${song.artist} - "${song.title}"`}
								/>
							);
						})}
					</Panel>
					<Panel header='2018' key={133}>
						<SongItem title='Song' subtitle='some title' />
						<SongItem title='Song' subtitle='some title' />
						<SongItem title='Song' subtitle='some title' />
						<SongItem title='Song' subtitle='some title' />
					</Panel>
				</Collapse>
			</HomeSectionCard>
			<HomeSectionCard title='RIAA CERTIFICATIONS'>
				<Collapse accordion>
					<Panel header='2018' key={1}>
						<p>some content</p>
					</Panel>
					<Panel header='2020' key={'00'}>
						<p>some content</p>
					</Panel>
				</Collapse>
			</HomeSectionCard>
			<HomeSectionCard title='DISCOGRAPHY'>
				<Collapse accordion>
					<Panel header='2018' key={11}>
						<p>some content</p>
					</Panel>
					<Panel header='2019' key={2}>
						<p>some content</p>
					</Panel>
				</Collapse>
			</HomeSectionCard>
			<div style={{ width: '100%', display: 'flex' }}>
				<Button style={{ margin: '0 auto' }} onClick={() => navigate(routes.DISCOGRAPHY)}>
					See Full Discography
				</Button>
			</div>
		</ContentCol>
	);
};

export default MusicSections;
