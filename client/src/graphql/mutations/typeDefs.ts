import { gql } from '@apollo/client';

export const ADD_COMMENT_MUTATION = gql`
	mutation AddCommentMutation($postId: ID!, $text: String!) {
		comment: addComment(postId: $postId, text: $text) {
			id
			text
			author {
				id
				username
				avatarUrl
			}
			post {
				id
			}
			createdAt
			updatedAt
		}
	}
`;
