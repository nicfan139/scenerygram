import { Request, Response } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import speakeasy from 'speakeasy';
import nodemailer from 'nodemailer';
import { User } from '../entity/User';
import { UserRepository } from '../resolvers/helpers';
import { omit, getEmailHtml } from '../utils';

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

const AuthController = {
	login: async (req: Request, res: Response) => {
		const user = await UserRepository.findOneBy({ username: req.body.username });

		if (user) {
			const passwordMatch = await bcrypt.compare(req.body.password, user.password);

			if (passwordMatch) {
				const token = jwt.sign(
					{
						id: user.id
					},
					JWT_SECRET_KEY,
					{
						expiresIn: '24h'
					}
				);

				if (user.otpEnabled) {
					const secret = speakeasy.generateSecret().base32;
					const otp = speakeasy.totp({
						secret,
						encoding: 'base32',
						step: 300
					});

					UserRepository.merge(user, { otpSecret: secret });
					await UserRepository.save(user);

					const transport = nodemailer.createTransport({
						host: process.env.SMTP_HOST,
						port: process.env.SMTP_PORT,
						auth: {
							user: process.env.SMTP_USERNAME,
							pass: process.env.SMTP_PASSWORD
						}
					} as nodemailer.TransportOptions);

					await transport.sendMail({
						from: 'admin@scenerygram.com',
						to: user.email,
						subject: 'Your one-time password for Scenerygram',
						html: getEmailHtml(user.username, otp)
					});
				}

				res.status(200).json({
					accessToken: token,
					otpEnabled: user.otpEnabled
				});
			} else {
				res.status(400).json({
					errorMessage: 'Invalid email/password combination'
				});
			}
		} else {
			res.status(400).json({
				errorMessage: 'Invalid email/password combination'
			});
		}
	},

	validateOtp: async (req: Request, res: Response) => {
		const { accessToken, otp } = req.body;
		let jwtPayload;
		try {
			jwtPayload = jwt.verify(accessToken, JWT_SECRET_KEY) as JwtPayload;
		} catch (error) {
			console.log(error);
			res.status(500).json({
				errorMessage: 'Unable to verify access token'
			});
		}

		if (jwtPayload) {
			const user = await UserRepository.findOneBy({
				id: jwtPayload.id
			});

			if (user) {
				const tokenIsValid = speakeasy.totp.verify({
					secret: user.otpSecret as string,
					encoding: 'base32',
					token: otp,
					step: 300
				});

				if (tokenIsValid) {
					UserRepository.merge(user, { otpSecret: null });
					await UserRepository.save(user);

					res.status(201).json({
						otpValid: true
					});
				} else {
					res.status(500).json({
						otpValid: false,
						errorMessage: 'Unable to validate one-time password'
					});
				}
			} else {
				res.status(500).json({
					otpValid: false,
					errorMessage: 'Unable to validate one-time password'
				});
			}
		} else {
			res.status(500).json({
				errorMessage: 'Unable to validate one-time password'
			});
		}
	},

	validateToken: async (req: Request, res: Response) => {
		const accessToken = req.body.accessToken;
		let jwtPayload;
		try {
			jwtPayload = jwt.verify(accessToken, JWT_SECRET_KEY) as JwtPayload;
		} catch (error) {
			console.log(error);
			res.status(500).json({
				isTokenValid: false,
				errorMessage: 'Unable to verify access token'
			});
		}

		if (jwtPayload) {
			const user = await UserRepository.findOneBy({
				id: jwtPayload.id
			});

			if (user) {
				res.status(200).json({
					isTokenValid: true,
					user: omit<User>(user, ['password', 'otpSecret'])
				});
			} else {
				res.status(500).json({
					isTokenValid: false,
					errorMessage: 'Unable to extract user details with the provided access token'
				});
			}
		} else {
			res.status(400).json({
				isTokenValid: false,
				errorMessage: 'Invalid or expired access token'
			});
		}
	}
};

export default AuthController;
