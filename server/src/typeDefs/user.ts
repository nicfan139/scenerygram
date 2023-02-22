import { gql } from 'graphql-tag';

export const UserTypeDefs = gql`
	type Query {
		user(userId: ID!): User!
	}

	type Mutation {
		addUser(input: AddUserInput!): User!
		updateUser(userId: ID!, input: UpdateUserInput!): User!
		updateUserPassword(input: UpdatePasswordInput!): User!
		deleteUser(userId: ID!): String!
	}

	type User {
		id: ID!
		firstName: String!
		lastName: String!
		username: String!
		password: String!
		avatarUrl: String
		posts: [Post!]
		comments: [Comment!]
		likedPosts: [Post!]
		likedComments: [Comment!]
		createdAt: Float!
		updatedAt: Float!
	}

	input AddUserInput {
		firstName: String!
		lastName: String!
		username: String!
		password: String!
		avatarUrl: String
	}

	input UpdateUserInput {
		firstName: String!
		lastName: String!
		username: String!
		avatarUrl: String
	}

	input UpdatePasswordInput {
		currentPassword: String!
		newPassword: String!
	}
`;
