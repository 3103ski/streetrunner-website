import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import layoutOptions from '../layoutConfig';

export default function ScrollTop() {
	const routePath = useLocation();

	const toTop = () => {
		let view = document.getElementById(layoutOptions.VIEW_OUTER_ID);

		if (view) {
			view.scrollTo(0, 0);
		}
	};

	useEffect(() => {
		toTop();
	}, [routePath]);

	return null;
}
