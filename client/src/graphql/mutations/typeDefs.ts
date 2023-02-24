import { gql } from '@apollo/client';

export const LIKE_POST_MUTATION = gql`
	mutation LikePostMutation($postId: ID!) {
		post: likePost(postId: $postId) {
			id
			imgUrl
			caption
			likes {
				id
				username
				avatarUrl
			}
		}
	}
`;

export const UNLIKE_POST_MUTATION = gql`
	mutation UnlikePostMutation($postId: ID!) {
		post: unlikePost(postId: $postId) {
			id
			imgUrl
			caption
			likes {
				id
				username
				avatarUrl
			}
		}
	}
`;

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
