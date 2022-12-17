import { SERVER_URL } from './config';
let routes: any = {
	// Public Routes
	HOME: '/',
	ABOUT: '/about',
	DISCOGRAPHY: '/discography',
	VIDEOS: '/videos',

	// CMS ROutes
	CMS_ADMIN: '/sr-admin',
	CMS_ACCOUNT: '/account',
	CMS_MANAGE_MUSIC: '/music',
	CMS_MANAGE_VIDEOS: '/video',

	// •• Server Routes
	SERVER_URL,
	// Admin
	SERVER_AUTH: '/auth',
	SERVER_AUTH_LOGIN: '/login',
	SERVER_AUTH_REGISTER: '/register',
	SERVER_AUTH_VERIFY_TOKEN: '/verify-token',
	SERVER_AUTH_UPDATE_PW: '/change-password',
	// Content
	SERVER_CONTENT: '/content',
	SERVER_CONTENT_MUSIC: '/music',
	SERVER_CONTENT_VIDEO: '/video',
};

routes = {
	...routes,
	AUTH_SUCCESS_REDIRECT: routes.CMS_ADMIN + routes.CMS_ACCOUNT,
	CMS_NO_AUTH_FWD: routes.CMS_ADMIN,
};

export default routes;
