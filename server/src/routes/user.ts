import { Router, Request, Response } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { UserRepository } from '../resolvers/helpers';

dotenv.config();

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
	const existingUser = await UserRepository.findOneBy({ username: req.body.username });

	if (!existingUser) {
		const BCRYPT_SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS;
		const hashedPassword = await bcrypt.hash(req.body.password, Number(BCRYPT_SALT_ROUNDS));
		if (hashedPassword) {
			const payload = {
				...req.body,
				password: hashedPassword
			};
			const user = await UserRepository.create(payload);
			const savedUser = await UserRepository.save(user);

			return res.status(201).json({
				user: savedUser
			});
		} else {
			res.status(500).json({
				errorMessage: 'Unable to encrypt password'
			});
		}
	} else {
		res.status(400).json({
			errorMessage: `Username '${req.body.username}' already exists`
		});
	}
});

export default router;
