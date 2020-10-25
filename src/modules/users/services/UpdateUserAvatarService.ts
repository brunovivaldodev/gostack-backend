import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import IStoregeProvider from '@shared/Container/providers/StorageProviders/models/IStorageProvider';
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
        @inject('StorageProvider')
        private storageProvider: IStoregeProvider,
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
            await this.storageProvider.deleteFile(user.avatar);
        }
        const filename = await this.storageProvider.saveFile(avatarFileName);

        user.avatar = filename;

        await this.usersRepository.save(user);

        return user;
    }
}
export default UpdateUserAvatarService;
