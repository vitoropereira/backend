import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/fakeHashProvider'

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'
import CreateUserService from '@modules/users/services/CreateUserService'

describe('AuthenticateUserService', () => {
  it('should be able to create authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )

    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456'
    })

    const response = await authenticateUserService.execute({
      email: 'johndoe@exemple.com',
      password: '123456'
    })

    expect(response).toHaveProperty('token')
    expect(response.user.name).toEqual('John Doe')
  })

  it('should not be able to authenticate with non existeng user', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )

    expect(
      authenticateUserService.execute({
        email: 'johndoe@exemple.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)

  })

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )

    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456'
    })

    expect(
      authenticateUserService.execute({
        email: 'johndoe@exemple.com',
        password: '1234'
      })
    ).rejects.toBeInstanceOf(AppError)

  })

})
