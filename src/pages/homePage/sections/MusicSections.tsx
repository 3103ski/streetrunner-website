import { Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CollapseSongs, Button } from 'components';
import routes from 'routes';
import HomeSectionCard from './HomeSectionCard';

const MusicSections = () => {
	const navigate = useNavigate();

	return (
		<Row justify={'center'} align='middle' style={{ padding: '45px 0 ' }}>
			<Col span={18}>
				<HomeSectionCard title='AWARDS & NOMINATIONS'>
					<CollapseSongs />
				</HomeSectionCard>
				<HomeSectionCard title='RIAA CERTIFICATIONS'>
					<CollapseSongs />
				</HomeSectionCard>
				<HomeSectionCard title='DISCOGRAPHY'>
					<CollapseSongs />
				</HomeSectionCard>
				<Button onClick={() => navigate(routes.DISCOGRAPHY)}>See Full Discography</Button>
			</Col>
		</Row>
	);
};

export default MusicSections;
