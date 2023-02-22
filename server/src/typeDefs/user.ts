import { gql } from 'graphql-tag';

export const UserTypeDefs = gql`
	type Query {
		user(userId: ID!): User!
	}

	type Mutation {
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
		likedPosts: [Post!]
		createdAt: Float!
		updatedAt: Float!
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
