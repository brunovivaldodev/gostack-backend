import User from '../infra/typeorm/entities/User';
import ICreateUsersDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
    findByID(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    create(data: ICreateUsersDTO): Promise<User | undefined>;
    save(data: User): Promise<User>;
}
