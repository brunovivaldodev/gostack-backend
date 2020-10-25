import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUsersRepositories';
import IUserTokenRepository from '../repositories/IUserTokenRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
    password: string;
    token: string;
}
@injectable()
class ResetPasswordService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,

        @inject('UserTokenRepository')
        private userTokenRepository: IUserTokenRepository,
        @inject('HashProvider')
        private hashprovider: IHashProvider,
    ) {}

    public async execute({ password, token }: IRequest): Promise<void> {
        const userToken = await this.userTokenRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('User token does not exists');
        }
        const user = await this.usersRepository.findByID(userToken.user_id);

        if (!user) {
            throw new AppError('User does not exists');
        }

        const tokenCreatedAt = userToken.created_at;

        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expired');
        }
        user.password = await this.hashprovider.generateHash(password);

        await this.usersRepository.save(user);
    }
}

export default ResetPasswordService;
