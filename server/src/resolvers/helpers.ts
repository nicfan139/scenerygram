import { GraphQLError } from 'graphql';
import { PubSub } from 'graphql-subscriptions';
import { AppDataSource } from '../typeOrm';
import { Post } from '../entity/Post';
import { User } from '../entity/User';

export const PostRepository = AppDataSource.getRepository(Post);
export const UserRepository = AppDataSource.getRepository(User);

export const throwError = (error: string) => {
	throw new GraphQLError(error);
};

export const pubSub = new PubSub();
