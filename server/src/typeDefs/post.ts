import { gql } from 'graphql-tag';

export const PostTypeDefs = gql`
	type Query {
		posts: [Post!]
		post(postId: ID!): Post!
	}

	type Mutation {
		addPost(input: AddPostInput!): Post!
		updatePost(postId: ID!, input: UpdatePostInput!): Post!
		likePost(postId: ID!): Post!
		unlikePost(postId: ID!): Post!
		deletePost(postId: ID!): String!
	}

	type Post {
		id: ID!
		imgUrl: String!
		caption: String!
		location: String
		author: User!
		likes: [User!]
		comments: [Comment!]
		createdAt: Float!
		updatedAt: Float!
	}

	input AddPostInput {
		imgUrl: String!
		caption: String!
		location: String
	}

	input UpdatePostInput {
		imgUrl: String!
		caption: String!
		location: String
	}
`;
