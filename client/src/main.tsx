import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ScreenContextProvider, UserContextProvider } from '@/contexts';
import { Root, ErrorPage, Posts, Post, MyProfile, UserProfile, Login, Register } from '@/pages';
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
			},
			{
				path: '/profile',
				element: <MyProfile />
			},
			{
				path: '/users/:userId',
				element: <UserProfile />
			}
		],
		errorElement: <ErrorPage />
	},
	{
		path: '/login',
		element: <Login />
	},
	{
		path: '/register',
		element: <Register />
	}
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ScreenContextProvider>
				<UserContextProvider>
					<ToastContainer
						position="bottom-right"
						hideProgressBar={true}
						autoClose={4000}
						draggable
						theme="dark"
					/>
					<RouterProvider router={router} />
				</UserContextProvider>
			</ScreenContextProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
