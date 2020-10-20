import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
    it('should be able to create a new user', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );
        const user = await createUser.execute({
            name: 'Bruno Tela',
            email: 'brunolumeca@live.com',
            password: 'sdsddsd',
        });
        expect(user).toHaveProperty('id');
    });

    it('should not be able to create a new user whith a email alredy registed', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );

        await createUser.execute({
            name: 'Bruno Tela',
            email: 'brunolumeca@live.com',
            password: 'sdsddsd',
        });
        expect(
            createUser.execute({
                name: 'Bruno Tela',
                email: 'brunolumeca@live.com',
                password: 'sdsddsd',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
