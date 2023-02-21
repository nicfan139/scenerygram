import { GraphQLError } from 'graphql';
import { AppDataSource } from '../typeOrm';
import { User } from '../entity/User';

export const UserRepository = AppDataSource.getRepository(User);

export const throwError = (error: string) => {
	throw new GraphQLError(error);
};
