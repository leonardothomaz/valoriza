import { Request, Response } from 'express';
import { AuthenticateUserService } from '../services/AuthenticateUserService';

class AuthenticateUserController {
    async handle(request: Request, response: Response) {
        const { email, password } = request.body;

        const authUserService = new AuthenticateUserService();

        const jwt = await authUserService.execute({ email, password });

        return response.json(jwt);
    }
}

export { AuthenticateUserController };
