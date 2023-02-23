import { gql } from '@apollo/client';

export const POSTS_QUERY = gql`
	query PostsQuery {
		posts {
			id
			imgUrl
			caption
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
			createdAt
			updatedAt
		}
	}
`;

export const POST_QUERY = gql`
	query PostQuery($postId: ID!) {
		post: post(postId: $postId) {
			id
			imgUrl
			caption
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
			createdAt
			updatedAt
		}
	}
`;
