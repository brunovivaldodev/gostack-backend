import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUsersRepositories';

interface Request {
    name: string;
    email: string;
    password: string;
}
@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,
    ) {}

    public async execute({
        name,
        email,
        password,
    }: Request): Promise<User | undefined> {
        const checkUserExists = await this.usersRepository.findByEmail(email);
        if (checkUserExists) {
            throw new AppError('Email alredy used');
        }

        const hashedPassword = await hash(password, 8);
        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });
        return user;
    }
}

export default CreateUserService;
