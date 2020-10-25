import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeStoreProvider from '@shared/Container/providers/StorageProviders/fakes/FakeStorageProvider';
import UpdateUserAvatar from './UpdateUserAvatarService';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUserRepository: FakeUserRepository;
let fakeStorageProvider: FakeStoreProvider;
let updateUserAvatar: UpdateUserAvatar;

describe('Update User Service', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeStorageProvider = new FakeStoreProvider();
        updateUserAvatar = new UpdateUserAvatar(
            fakeUserRepository,
            fakeStorageProvider,
        );
    });
    it('should be able to create a new user', async () => {
        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '1234',
        });
        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar.jpg',
        });
        expect(user.avatar).toBe('avatar.jpg');
    });

    it('should not be able to update avatar from non existing user', async () => {
        await expect(
            updateUserAvatar.execute({
                user_id: 'non-existing user',
                avatarFileName: 'avatar.jpg',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should delete old avatar when updating new one', async () => {
        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '1234',
        });
        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar.jpg',
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar2.jpg',
        });

        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
        expect(user.avatar).toBe('avatar2.jpg');
    });
});
