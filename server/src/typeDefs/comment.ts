import gql from 'graphql-tag';

export const CommentTypeDefs = gql`
	type Mutation {
		addComment(postId: ID!, text: String!): Comment!
		likeComment(commentId: ID!): Comment!
		unlikeComment(commentId: ID!): Comment!
	}

	type Comment {
		id: ID!
		text: String!
		author: User!
		post: Post!
		likes: [User!]
		createdAt: Float!
		updatedAt: Float!
	}
`;
