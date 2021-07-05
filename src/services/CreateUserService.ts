import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepositories';
import { hash } from 'bcryptjs';

interface IUserRequest {
    name: string;
    email: string;
    password?: string;
    admin?: boolean;
}

class CreateUserService {
    async execute({ name, email, password, admin }: IUserRequest) {
        const usersRepositoy = getCustomRepository(UsersRepository);

        if (!email) {
            throw new Error('Email incorrect');
        }

        const userAlreadyExists = await usersRepositoy.findOne({
            email,
        });

        if (userAlreadyExists) {
            throw new Error('User already exists');
        }

        const passwordHash = await hash(password, 8);

        const user = usersRepositoy.create({
            name,
            email,
            password: passwordHash,
            admin,
        });

        await usersRepositoy.save(user);

        delete user.password;

        return user;
    }
}

export { CreateUserService };
