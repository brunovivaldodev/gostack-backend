import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import ResetPasswordService from './ResetPasswordService';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let resetPassword: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;
describe('ResetPasswordService', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeUserTokenRepository = new FakeUserTokenRepository();
        fakeHashProvider = new FakeHashProvider();
        resetPassword = new ResetPasswordService(
            fakeUserRepository,
            fakeUserTokenRepository,
            fakeHashProvider,
        );
    });
    it('should be able to reset the password', async () => {
        const user = await fakeUserRepository.create({
            name: 'Bruno Pedro',
            email: 'brunopedro@gmail.com',
            password: 'sdsd',
        });
        const { token } = await fakeUserTokenRepository.generate(user.id);

        const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

        await resetPassword.execute({
            password: 'wewewe',
            token,
        });

        const updatedUser = await fakeUserRepository.findByID(user.id);

        expect(generateHash).toHaveBeenCalledWith('wewewe');
        expect(updatedUser?.password).toBe('wewewe');
    });

    it('should not be able to reset the password with non-existing token', async () => {
        await expect(
            resetPassword.execute({
                token: 'non-existing-token',
                password: '2332223',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset the password with non-existing user', async () => {
        const { token } = await fakeUserTokenRepository.generate(
            'non-existing-user',
        );
        await expect(
            resetPassword.execute({
                token,
                password: '2332223',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset password if passed more than 2 hours', async () => {
        const user = await fakeUserRepository.create({
            name: 'Bruno Pedro',
            email: 'brunopedro@gmail.com',
            password: 'sdsd',
        });
        const { token } = await fakeUserTokenRepository.generate(user.id);

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date();
            return customDate.setHours(customDate.getHours() + 3);
        });
        await expect(
            resetPassword.execute({
                password: 'wewewe',
                token,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
