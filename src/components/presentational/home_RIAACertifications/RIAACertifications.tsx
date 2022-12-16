import { Collapse } from 'antd';

import { Card } from 'components';

const { Panel } = Collapse;

const RIAACertification = () => {
	return (
		<Card title='RIAA CERTIFICATIONS'>
			<Collapse accordion>
				<Panel header='2018' key={1}>
					<p>some content</p>
				</Panel>
				<Panel header='2020' key={'00'}>
					<p>some content</p>
				</Panel>
			</Collapse>
		</Card>
	);
};

export default RIAACertification;
