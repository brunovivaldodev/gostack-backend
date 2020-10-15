import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUsersRepositories';

interface Request {
    user_id: string;
    avatarFileName: string;
}
@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,
    ) {}

    public async execute({ user_id, avatarFileName }: Request): Promise<User> {
        const user = await this.usersRepository.findByID(user_id);

        if (!user) {
            throw new AppError(
                'only authenticaded user can change avatar.',
                401,
            );
        }
        if (user.avatar) {
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );
            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath,
            );
            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }
        user.avatar = avatarFileName;

        await this.usersRepository.save(user);

        return user;
    }
}
export default UpdateUserAvatarService;
