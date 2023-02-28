import { gql } from '@apollo/client';

export const POST_DETAIL_FRAGMENT = gql`
	fragment PostDetail on Post {
		id
		imgUrl
		caption
		location
		author {
			id
			username
		}
	}
`;

export const POST_LIKE_FRAGMENT = gql`
	fragment PostLikeDetail on Post {
		id
		imgUrl
		caption
		likes {
			id
			username
			avatarUrl
		}
	}
`;

export const COMMENT_LIKE_FRAGMENT = gql`
	fragment CommentLikeDetail on Comment {
		id
		text
		author {
			id
			username
			avatarUrl
		}
		createdAt
		updatedAt
	}
`;
