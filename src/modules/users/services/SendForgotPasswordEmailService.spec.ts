import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/Container/providers/MailProviders/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokenRepository = new FakeUserTokenRepository();
        sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUserRepository,
            fakeMailProvider,
            fakeUserTokenRepository,
        );
    });
    it('should be able to recovery the password using the email', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        await fakeUserRepository.create({
            name: 'Bruno Pedro',
            email: 'brunopedro@gmail.com',
            password: 'sdsd',
        });
        await sendForgotPasswordEmail.execute({
            email: 'brunopedro@gmail.com',
        });
        expect(sendMail).toHaveBeenCalled();
    });

    it('should be able to recover a non-existing user password', async () => {
        await expect(
            sendForgotPasswordEmail.execute({
                email: 'brunopedrossa@gmail.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should generate a forgot password token', async () => {
        const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');

        const user = await fakeUserRepository.create({
            name: 'Bruno Pedro',
            email: 'brunopedro@gmail.com',
            password: 'sdsd',
        });
        await sendForgotPasswordEmail.execute({
            email: 'brunopedro@gmail.com',
        });
        expect(generateToken).toHaveBeenCalledWith(user.id);
    });
});
