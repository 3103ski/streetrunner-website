import { Route, Routes, Link, useLocation } from 'react-router-dom';
import { Tabs } from 'antd';

import { ManageMusic, ManageAccount, ManageVideos } from 'components';
import { ManageDiscographyProvider } from 'contexts';
import { SecurityWrapper, ContentCol } from 'layout';

import Style from './adminPages.module.scss';
import routes from 'routes';

const AdminPages = () => {
	const location = useLocation().pathname;
	const isActive = (path: string) => (location.includes(path) ? 1 : 0);

	return (
		<SecurityWrapper>
			<ManageDiscographyProvider>
				<ContentCol>
					<Tabs
						defaultActiveKey={routes.CMS_ACCOUNT}
						items={[
							{
								label: (
									<Link
										className={Style.Link}
										to={routes.CMS_ADMIN + routes.CMS_ACCOUNT}
										data-is-active={isActive(routes.CMS_ACCOUNT)}>
										General
									</Link>
								),
								key: routes.CMS_ACCOUNT,
							},
							{
								label: (
									<Link
										className={Style.Link}
										to={routes.CMS_ADMIN + routes.CMS_MANAGE_MUSIC}
										data-is-active={isActive(routes.CMS_MANAGE_MUSIC)}>
										Music
									</Link>
								),
								key: routes.CMS_MANAGE_MUSIC,
							},
							{
								label: (
									<Link
										className={Style.Link}
										to={routes.CMS_ADMIN + routes.CMS_MANAGE_VIDEOS}
										data-is-active={isActive(routes.CMS_MANAGE_VIDEOS)}>
										Videos
									</Link>
								),
								key: routes.CMS_MANAGE_VIDEOS,
							},
						]}
					/>
					<Routes>
						<Route path={routes.CMS_ACCOUNT} element={<ManageAccount />} />
						<Route path={routes.CMS_MANAGE_MUSIC} element={<ManageMusic />} />
						<Route path={routes.CMS_MANAGE_VIDEOS} element={<ManageVideos />} />
					</Routes>
				</ContentCol>
			</ManageDiscographyProvider>
		</SecurityWrapper>
	);
};

export default AdminPages;
