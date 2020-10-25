import 'reflect-metadata';
// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import AuthenticateUserService from './AuthenticateUserService';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createuser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticanteUser', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeHashProvider = new FakeHashProvider();
        createuser = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );
        authenticateUser = new AuthenticateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );
    });
    it('should be able to authenticate', async () => {
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
        await expect(
            authenticateUser.execute({
                email: 'brunolumeca@live.com',
                password: 'sdsddsd',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate with wrong password ', async () => {
        await createuser.execute({
            name: 'Bruno Vivaldo',
            email: 'brunolumeca@live.com',
            password: 'sdsddsd',
        });

        await expect(
            authenticateUser.execute({
                email: 'brunolumeca@live.com',
                password: 'wrong-password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
