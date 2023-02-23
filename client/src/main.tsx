import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserContextProvider } from '@/contexts';
import { Root, ErrorPage, Posts, Post, Login } from '@/pages';
import './index.css';

const queryClient = new QueryClient();

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		children: [
			{
				path: '/posts',
				element: <Posts />
			},
			{
				path: '/posts/:postId',
				element: <Post />
			}
		],
		errorElement: <ErrorPage />
	},
	{
		path: '/login',
		element: <Login />
	}
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<UserContextProvider>
				<RouterProvider router={router} />
			</UserContextProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
