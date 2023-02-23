import express, { Express } from 'express';
import dotenv from 'dotenv';
import { ApolloServer, ContextFunction } from '@apollo/server';
import { expressMiddleware as apolloExpressMiddleware } from '@apollo/server/express4';
import { makeExecutableSchema } from '@graphql-tools/schema';
import morgan from 'morgan';
import cors from 'cors';
import { expressjwt, Request } from 'express-jwt';
import { createServer as createHttpServer } from 'http';
import { AppDataSource } from './typeOrm';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import authRoutes from './routes/auth';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

const server = async () => {
	await AppDataSource.initialize()
		.then(() => {
			console.log('Data Source (postgres) has been initialized!');
		})
		.catch((err) => {
			console.error('Error during Data Source (postgres) initialization', err);
		});

	app.use(
		morgan('dev'),
		cors(),
		express.json(),
		expressjwt({
			algorithms: ['HS256'],
			credentialsRequired: false,
			secret: JWT_SECRET_KEY
		})
	);

	app.use('/api/auth', authRoutes);

	const getHttpContext = ({ req }: { req: Request }) => {
		if (req.auth) {
			const { id } = req.auth;
			return { id };
		}
		return {};
	};

	const httpServer = createHttpServer(app);

	const schema = makeExecutableSchema({ typeDefs, resolvers });

	const apolloServer = new ApolloServer({ schema });
	await apolloServer.start();
	app.use(
		'/api/graphql',
		apolloExpressMiddleware(apolloServer, { context: getHttpContext as ContextFunction<[]> })
	);

	httpServer.listen({ port: PORT }, () => {
		console.log(`Server running on port ${PORT}`);
		if (process.env.PG_HOST === 'localhost') {
			console.log(`GraphQL endpoint: http://localhost:${PORT}/api/graphql`);
		}
	});
};

server();
