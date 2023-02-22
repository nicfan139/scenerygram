import gql from 'graphql-tag';

export const CommentTypeDefs = gql`
	type Mutation {
		addComment(postId: ID!, text: String!): Comment!
	}

	type Subscription {
		commentAdded: Comment!
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
