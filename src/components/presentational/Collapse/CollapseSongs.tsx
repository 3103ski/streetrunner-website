import { Collapse } from 'antd';

import Style from './collapseSongs.module.scss';
import './overrides.scss';

const { Panel } = Collapse;

const CollapseSongs = () => {
	return (
		<div>
			<Collapse className={Style.CollapseOuter}>
				<Panel header='2018' key='1' className={Style.Panel}>
					<p>some song</p>
					<p>some song</p>
					<p>some song</p>
				</Panel>
				<Panel header='2019' key='2' className={Style.Panel}>
					<p>some song</p>
					<p>some song</p>
					<p>some song</p>
				</Panel>
				<Panel header='2021' key='3' className={Style.Panel}>
					<p>some song</p>
					<p>some song</p>
					<p>some song</p>
				</Panel>
			</Collapse>
		</div>
	);
};

export default CollapseSongs;
