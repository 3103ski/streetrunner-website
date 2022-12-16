import { Collapse } from 'antd';

import { Card } from 'components';

const { Panel } = Collapse;

const RIAACertification = () => {
	return (
		<Card title='DISCOGRAPHY'>
			<Collapse accordion>
				<Panel header='2018' key={11}>
					<p>some content</p>
				</Panel>
				<Panel header='2019' key={2}>
					<p>some content</p>
				</Panel>
			</Collapse>
		</Card>
	);
};

export default RIAACertification;
