export const getAccessToken = () => {
	return localStorage.getItem('scenerygram-accessToken') ?? null;
};

export const handleLogout = () => {
	if (getAccessToken()) {
		localStorage.removeItem('scenerygram-accessToken');
	}
	window.location.href = '/login';
};
