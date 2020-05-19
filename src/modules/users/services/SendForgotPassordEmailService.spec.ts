// import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeMailProvider from '@shared/container/provider/MailProvider/fakes/fakeMailProvider'
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository'
import SendForgotPassordEmailService from '@modules/users/services/SendForgotPassordEmailService'
import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeUserTokensRepository: FakeUserTokensRepository
let fakeMailProvider: FakeMailProvider
let sendForgotPassordEmail: SendForgotPassordEmailService

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeUserTokensRepository = new FakeUserTokensRepository()
    fakeMailProvider = new FakeMailProvider()
    sendForgotPassordEmail = new SendForgotPassordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    )
  })

  it('should be able to recover the password using the e-mail', async () => {

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456'
    })

    await sendForgotPassordEmail.execute({
      email: 'johndoe@exemple.com',
    })

    expect(sendMail).toHaveBeenCalled()
  })

  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPassordEmail.execute({
        email: 'johndoe@exemple.com',
      })).rejects.toBeInstanceOf(AppError)
  })

  it('should generate a forgot password token', async () => {
    const genrateToken = jest.spyOn(fakeUserTokensRepository, 'generate')

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456'
    })

    await sendForgotPassordEmail.execute({
      email: 'johndoe@exemple.com',
    })

    expect(genrateToken).toHaveBeenCalledWith(user.id)
  })
})
