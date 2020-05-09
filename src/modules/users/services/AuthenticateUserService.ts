import { compare } from 'bcryptjs'
import { sign } from "jsonwebtoken";
import authCongig from "@config/auth";

import AppError from '@shared/errors/AppError'
import IUsersRepository from '@modules/users/repositories/IUserRepository'

import User from '@modules/users/infra/typeorm/entities/User'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

class AuthenticateUserService {
  constructor(private usersRepository: IUsersRepository) { }

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Incorrect e-mail/password combination.', 401)
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError('Incorrect e-mail/password combination.', 401)
    }

    const { secret, expiresIn } = authCongig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    })

    return { user, token }
  }
}

export default AuthenticateUserService
