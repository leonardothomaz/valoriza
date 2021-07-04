import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepositories';

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
}

class CreateUserService {
    async execute({ name, email, admin }: IUserRequest) {
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

        const user = usersRepositoy.create({
            name,
            email,
            admin,
        });

        await usersRepositoy.save(user);

        return user;
    }
}

export { CreateUserService };
