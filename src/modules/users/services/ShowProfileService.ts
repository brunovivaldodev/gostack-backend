import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUsersRepositories';

interface Request {
    user_id: string;
}

@injectable()
class ShowProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,
    ) {}

    public async execute({ user_id }: Request): Promise<User> {
        const user = await this.usersRepository.findByID(user_id);
        if (!user) {
            throw new AppError('User not found');
        }

        return user;
    }
}
export default ShowProfileService;
