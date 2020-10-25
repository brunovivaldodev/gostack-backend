import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
    let fakeUserRepository: FakeUserRepository;
    let fakeHashProvider: FakeHashProvider;
    let createUser: CreateUserService;

    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeHashProvider = new FakeHashProvider();
        createUser = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );
    });
    it('should be able to create a new user', async () => {
        const user = await createUser.execute({
            name: 'Bruno Tela',
            email: 'brunolumeca@live.com',
            password: 'sdsddsd',
        });
        expect(user).toHaveProperty('id');
    });

    it('should not be able to create a new user whith a email alredy registed', async () => {
        await createUser.execute({
            name: 'Bruno Tela',
            email: 'brunolumeca@live.com',
            password: 'sdsddsd',
        });
        await expect(
            createUser.execute({
                name: 'Bruno Tela',
                email: 'brunolumeca@live.com',
                password: 'sdsddsd',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
