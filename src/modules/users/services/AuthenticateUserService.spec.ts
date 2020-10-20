import 'reflect-metadata';
// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import AuthenticateUserService from './AuthenticateUserService';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

describe('AuthenticanteUser', () => {
    it('should be able to authenticate', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createuser = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );
        const authenticateUser = new AuthenticateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );

        const user = await createuser.execute({
            name: 'Bruno Vivaldo',
            email: 'brunolumeca@live.com',
            password: 'sdsddsd',
        });

        const response = await authenticateUser.execute({
            email: 'brunolumeca@live.com',
            password: 'sdsddsd',
        });
        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });

    it('should be able to authenticate with non existing user', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();

        const authenticateUser = new AuthenticateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );

        expect(
            authenticateUser.execute({
                email: 'brunolumeca@live.com',
                password: 'sdsddsd',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate with wrong password ', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createuser = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );
        const authenticateUser = new AuthenticateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );

        await createuser.execute({
            name: 'Bruno Vivaldo',
            email: 'brunolumeca@live.com',
            password: 'sdsddsd',
        });

        expect(
            authenticateUser.execute({
                email: 'brunolumeca@live.com',
                password: 'wrong-password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
