// ==> React
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

// ==> Project Imports
// import { useAppSelector, useAppDispatch } from 'app/hooks';
// import { authAPI } from 'apis/authAPI';
// import { NO_AUTH_REDIRECT } from 'routes';
// import { TOKEN_LABEL } from 'config';

// ==> Features
// import { setNetworkBanners } from 'features/networkBanner/network-banner-slice';
// import { logout } from 'features/accounts/accounts-slice';

/**
 *--------------------------------
 * => ProtectedPageWrapper
 *--------------------------------
 *
 * @param {JSX.Element | JSX.Element[]} children - A page component that required authentication for the user to remain on
 *
 * @returns a wrapper that will protect pages that require authentication
 */

interface ProtectedPageWrapperProps {
	children?: JSX.Element | JSX.Element[];
}

export default function ProtectedPageWrapper({ children }: ProtectedPageWrapperProps) {
	// // ==> Redux Hooks
	// const { token } = useAppSelector((state) => state.account);
	// const dispatch = useAppDispatch();
	// const navigate = useNavigate();

	// const handleNoAuthRedirect = React.useCallback(() => {
	// 	localStorage.removeItem(TOKEN_LABEL);
	// 	dispatch(logout());
	// 	dispatch(
	// 		setNetworkBanners({
	// 			networkBanner: { type: 'error', message: 'Invalid/Expired token. Please login again.' },
	// 		})
	// 	);
	// 	navigate(NO_AUTH_REDIRECT);
	// }, [dispatch, navigate]);

	// /** A callback for verifying the current token is valid */
	// const verifyTokenCallback = React.useCallback(
	// 	(responseToken: null | string) => {
	// 		if (!responseToken || !token) {
	// 			/** If we recieved null, the token is invalid and any account info should be cleared */
	// 			handleNoAuthRedirect();
	// 		}
	// 	},
	// 	[handleNoAuthRedirect, token]
	// );

	// React.useEffect(() => {
	// 	/** Use api to verify token on component mount */
	// 	authAPI.verifyToken(verifyTokenCallback);
	// }, [verifyTokenCallback]);

	return <>{children}</>;
}
