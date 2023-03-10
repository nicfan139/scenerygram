import { gql } from '@apollo/client';
import { COMMENT_LIKE_FRAGMENT, POST_DETAIL_FRAGMENT, POST_LIKE_FRAGMENT } from './fragments';

export const UPDATE_USER_MUTATION = gql`
	mutation UpdateUserMutation($userId: ID!, $input: UpdateUserInput!) {
		user: updateUser(userId: $userId, input: $input) {
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
			createdAt
			updatedAt
		}
	}
`;

export const UPDATE_USER_PASSWORD_MUTATION = gql`
	mutation UpdateUserPasswordMutation($input: UpdatePasswordInput!) {
		user: updateUserPassword(input: $input) {
			id
			firstName
			lastName
			username
			createdAt
			updatedAt
		}
	}
`;

export const ADD_POST_MUTATION = gql`
	mutation AddPostMutation($input: AddPostInput!) {
		post: addPost(input: $input) {
			...PostDetail
		}
	}
	${POST_DETAIL_FRAGMENT}
`;

export const UPDATE_POST_MUTATION = gql`
	mutation UpdatePostMutation($postId: ID!, $input: UpdatePostInput!) {
		post: updatePost(postId: $postId, input: $input) {
			...PostDetail
		}
	}
	${POST_DETAIL_FRAGMENT}
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
