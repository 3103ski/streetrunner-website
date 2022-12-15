import { Row, Col, Collapse } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Button, SongItem } from 'components';
import routes from 'routes';
import HomeSectionCard from './HomeSectionCard';
import { songs } from 'mockdata/mockSongs';

const { Panel } = Collapse;

const MusicSections = () => {
	const navigate = useNavigate();

	return (
		<Row justify={'center'} align='middle' style={{ padding: '45px 0 ' }}>
			<Col span={18}>
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
				<Button onClick={() => navigate(routes.DISCOGRAPHY)}>See Full Discography</Button>
			</Col>
		</Row>
	);
};

export default MusicSections;
