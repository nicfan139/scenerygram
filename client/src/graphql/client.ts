import { ApolloClient, InMemoryCache } from '@apollo/client';

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export const client = new ApolloClient({
	uri: `${BACKEND_API_URL}/api/graphql`,
	cache: new InMemoryCache(),
	defaultOptions: {
		query: {
			fetchPolicy: 'network-only'
		}
	}
});
