import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUsersRepositories';

interface Request {
    email: string;
    password: string;
}
interface Response {
    user: User;
    token: string;
}
@injectable()
class AuthenticateUSerService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,
        @inject('HashProvider')
        private hashprovider: IHashProvider,
    ) {}

    public async execute({ email, password }: Request): Promise<Response> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorret email/Password combination', 401);
        }
        const passwordMatched = await this.hashprovider.compareHash(
            password,
            user.password,
        );

        if (!passwordMatched) {
            throw new AppError('Incorret email/Password combination', 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });
        return {
            user,
            token,
        };
    }
}

export default AuthenticateUSerService;
