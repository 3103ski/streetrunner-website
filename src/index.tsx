// React
import React from 'react';
import ReactDOM from 'react-dom/client';

// App Imports
import App from './app/App';
import reportWebVitals from './reportWebVitals';

// Styling
import 'antd/dist/reset.css';
import './sass/antd-overrides.scss';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

reportWebVitals();
