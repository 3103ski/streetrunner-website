// ==> React / Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ==> Package Imports
import { ConfigProvider } from 'antd';

// ==> Project Imports
import { HomePage, AboutPage, DiscographyPage } from 'pages';
import routes from 'routes';
import { MainNavbar } from 'layout';

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
				<div className='App'>
					<MainNavbar />
					<Routes>
						<Route path={routes.HOME} element={<HomePage />} />
						<Route path={routes.ABOUT} element={<AboutPage />} />
						<Route path={routes.DISCOGRAPHY} element={<DiscographyPage />} />
					</Routes>
				</div>
			</Router>
		</ConfigProvider>
	);
}

export default App;
