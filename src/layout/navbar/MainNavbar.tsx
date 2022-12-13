// --> React
import { useNavigate } from 'react-router-dom';

// --> Project Imports
import { IconifyIcon, ICON_MENU, ICON_MUSIC_NOTES, ICON_VIDEO, ICON_INFO } from 'components';
import { Logo192 } from 'assets';
import routes from 'routes';

// --> Style
import Style from './mainNavbar.module.scss';

export default function MainNavbar() {
	const navigate = useNavigate();

	const MenuButton = ({ icon, path }: { icon: string; path?: string }) => {
		return (
			<div className={Style.LinkWrapper} onClick={() => (path ? navigate(path) : null)}>
				<IconifyIcon icon={icon} size='sm' />
			</div>
		);
	};

	return (
		<div className={Style.NavOuter}>
			<div className={Style.NavLeft}>
				<img
					src={Logo192}
					alt='street-runner-logo'
					className={Style.Logo}
					onClick={() => navigate(routes.HOME)}
				/>
			</div>
			<div className={Style.NavRight}>
				<div className={Style.TriggerWrapper}>
					<MenuButton icon={ICON_MENU} />
				</div>
				<div className={Style.Links}>
					<MenuButton icon={ICON_MUSIC_NOTES} path={routes.DISCOGRAPHY} />
					<MenuButton icon={ICON_VIDEO} />
					<MenuButton icon={ICON_INFO} path={routes.ABOUT} />
				</div>
			</div>
		</div>
	);
}
