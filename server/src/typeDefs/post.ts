import { gql } from 'graphql-tag';

export const PostTypeDefs = gql`
	type Query {
		posts: [Post!]
	}

	type Mutation {
		addPost(input: AddPostInput!): Post!
		updatePost(postId: ID!, input: UpdatePostInput!): Post!
		deletePost(postId: ID!): String!
	}

	type Subscription {
		postAdded: Post!
	}

	type Post {
		id: ID!
		imgUrl: String!
		caption: String!
		author: User!
		likes: [User!]
		createdAt: Float!
		updatedAt: Float!
	}

	input AddPostInput {
		imgUrl: String!
		caption: String!
	}

	input UpdatePostInput {
		imgUrl: String!
		caption: String!
	}
`;
