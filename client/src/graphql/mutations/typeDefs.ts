import { gql } from '@apollo/client';
import { COMMENT_LIKE_FRAGMENT, POST_LIKE_FRAGMENT } from './fragments';

export const ADD_POST_MUTATION = gql`
	mutation AddPostMutation($input: AddPostInput!) {
		post: addPost(input: $input) {
			id
			imgUrl
			caption
			author {
				id
				username
			}
		}
	}
`;

export const LIKE_POST_MUTATION = gql`
	mutation LikePostMutation($postId: ID!) {
		post: likePost(postId: $postId) {
			...PostLikeDetail
		}
	}
	${POST_LIKE_FRAGMENT}
`;

export const UNLIKE_POST_MUTATION = gql`
	mutation UnlikePostMutation($postId: ID!) {
		post: unlikePost(postId: $postId) {
			...PostLikeDetail
		}
	}
	${POST_LIKE_FRAGMENT}
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

export const LIKE_COMMENT_MUTATION = gql`
	mutation LikeCommentMutation($commentId: ID!) {
		comment: likeComment(commentId: $commentId) {
			...CommentLikeDetail
		}
	}
	${COMMENT_LIKE_FRAGMENT}
`;

export const UNLIKE_COMMENT_MUTATION = gql`
	mutation UnikeCommentMutation($commentId: ID!) {
		comment: unlikeComment(commentId: $commentId) {
			...CommentLikeDetail
		}
	}
	${COMMENT_LIKE_FRAGMENT}
`;
