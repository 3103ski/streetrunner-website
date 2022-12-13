import { Icon } from '@iconify/react';

import Style from './iconifyIcon.module.scss';

const IconifyIcon = ({ icon, size = 'md' }: { icon: string; size: 'sm' | 'md' | 'lg' }) => {
	return (
		<div className={Style.Wrapper} data-size={size}>
			<Icon icon={icon} />
		</div>
	);
};

export default IconifyIcon;
