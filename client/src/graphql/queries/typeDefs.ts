import { gql } from '@apollo/client';
import { POST_FRAGMENT } from './fragments';

export const POSTS_QUERY = gql`
	query PostsQuery {
		posts {
			...PostDetail
			author {
				id
				username
				avatarUrl
			}
			likes {
				id
				username
				avatarUrl
			}
			comments {
				id
			}
		}
	}
	${POST_FRAGMENT}
`;

export const POST_QUERY = gql`
	query PostQuery($postId: ID!) {
		post: post(postId: $postId) {
			...PostDetail
			author {
				id
				username
				avatarUrl
			}
			likes {
				id
				username
				avatarUrl
			}
			comments {
				id
				text
				author {
					id
					username
					avatarUrl
				}
				likes {
					id
					username
					avatarUrl
				}
				createdAt
				updatedAt
			}
		}
	}
	${POST_FRAGMENT}
`;

export const USER_QUERY = gql`
	query UserQuery($userId: ID!) {
		user: user(userId: $userId) {
			id
			firstName
			lastName
			username
			avatarUrl
			posts {
				id
				imgUrl
				caption
				createdAt
			}
			comments {
				id
				text
				post {
					id
					imgUrl
					caption
				}
				likes {
					id
				}
				createdAt
			}
			createdAt
		}
	}
`;
