// ==> React / Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ==> Package Imports
import { ConfigProvider } from 'antd';

// ==> Project Imports
import { AuthPage, AboutPage, DiscographyPage, HomePage, VideosPage } from 'pages';
import { MainNavbar } from 'layout';
import routes from 'routes';
import layoutConfig from 'layout/layoutConfig';

// Styling
import Style from './app.module.scss';

function App() {
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: Style.color_themePrimary,
				},
			}}>
			<Router>
				<div className={Style.App} id={layoutConfig.APP_CONTAINER_ID}>
					<MainNavbar />
					<Routes>
						{/* PUBLIC PAGES */}
						<Route path={routes.ABOUT} element={<AboutPage />} />
						<Route path={routes.DISCOGRAPHY} element={<DiscographyPage />} />
						<Route path={routes.HOME} element={<HomePage />} />
						<Route path={routes.VIDEOS} element={<VideosPage />} />
						{/* CMS PAGES */}
						<Route path={routes.CMS_LOGIN} element={<AuthPage />} />
					</Routes>
				</div>
			</Router>
		</ConfigProvider>
	);
}

export default App;
