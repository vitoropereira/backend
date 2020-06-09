import { injectable, inject } from 'tsyringe'
import path from 'path'

import AppError from '@shared/errors/AppError'
import IUsersRepository from "@modules/users/repositories/IUsersRepository"
import IMailProvider from "@shared/container/provider/MailProvider/models/IMailProvider"
import IUserTokensRepository from "@modules/users/repositories/IUserTokensRepository"

interface IRequest {
  email: string,
}

@injectable()
class SendForgotPassordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) { }

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError("User does not Exists.")
    }

    const { token } = await this.userTokensRepository.generate(user.id)

    const forgatPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgote_password.hbs'
    )

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: '[GoBarber] Recuperação de Senha',
      templateData: {
        file: forgatPasswordTemplate,
        variable: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
        }
      }
    })

  }
}

export default SendForgotPassordEmailService
