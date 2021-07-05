import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepositories';

interface IAuthRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({ email, password }: IAuthRequest) {
        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findOne({ email });

        if (!user) {
            throw new Error('Email/Password incorrect');
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error('Email/Password incorrect');
        }

        const jwt = sign(
            {
                email: user.email,
                admin: user.admin,
            },
            'ead3ffd5c8e34197722a2db745b81b82',
            {
                subject: user.id,
                expiresIn: '1d',
            },
        );

        return jwt;
    }
}

export { AuthenticateUserService };
