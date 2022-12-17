import { SERVER_URL } from './config';
const routes = {
	// Public Routes
	HOME: '/',
	ABOUT: '/about',
	DISCOGRAPHY: '/discography',
	VIDEOS: '/videos',

	// CMS ROutes
	CMS_LOGIN: '/sr-admin',
	CMS_DASH: '/dashboard',
	CMS_MANAGE_MUSIC: '/music',

	// •• Server Routes
	SERVER_URL,
	// Admin
	SERVER_AUTH: '/auth',
	SERVER_AUTH_LOGIN: '/login',
	SERVER_AUTH_REGISTER: '/register',
	SERVER_AUTH_UPDATE_PW: '/change-password',
	// Content
	SERVER_CONTENT: '/content',
	SERVER_CONTENT_MUSIC: '/music',
	SERVER_CONTENT_VIDEO: '/video',
};

export default routes;
