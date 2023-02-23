import { useRouteError } from 'react-router-dom';

const ErrorPage = (): React.ReactElement => {
	const error = useRouteError();
	console.error(error);

	const errorObj = error as { statusText: string; message: string };

	return (
		<div id="error-page">
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{errorObj.statusText || errorObj.message}</i>
			</p>
		</div>
	);
};

export default ErrorPage;
