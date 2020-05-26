import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/fakeHashProvider'

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'
import CreateUserService from '@modules/users/services/CreateUserService'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let createUser: CreateUserService
let authenticateUserService: AuthenticateUserService

describe('AuthenticateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )

    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )
  })

  it('should be able to create authenticate', async () => {
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
    await expect(
      authenticateUserService.execute({
        email: 'johndoe@exemple.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)

  })

  it('should not be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456'
    })

    await expect(
      authenticateUserService.execute({
        email: 'johndoe@exemple.com',
        password: '1234'
      })
    ).rejects.toBeInstanceOf(AppError)

  })

})
