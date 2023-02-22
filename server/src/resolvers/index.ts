import { CommentResolvers } from './comment';
import { PostResolvers } from './post';
import { UserResolvers } from './user';

export const resolvers = [CommentResolvers, PostResolvers, UserResolvers];
