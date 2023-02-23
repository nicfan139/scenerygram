import { GraphQLError } from 'graphql';
import { AppDataSource } from '../typeOrm';
import { Comment } from '../entity/Comment';
import { Post } from '../entity/Post';
import { User } from '../entity/User';

export const CommentRepository = AppDataSource.getRepository(Comment);
export const PostRepository = AppDataSource.getRepository(Post);
export const UserRepository = AppDataSource.getRepository(User);

export const throwError = (error: string) => {
	throw new GraphQLError(error);
};
