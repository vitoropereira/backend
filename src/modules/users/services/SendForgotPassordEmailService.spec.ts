// import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeMailProvider from '@shared/container/provider/MailProvider/fakes/fakeMailProvider'
import SendForgotPassordEmailService from '@modules/users/services/SendForgotPassordEmailService'

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover the password using the e-mail', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeMailProvider = new FakeMailProvider()

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')

    const sendForgotPassordEmail = new SendForgotPassordEmailService(
      fakeUsersRepository,
      fakeMailProvider
    )

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


})
