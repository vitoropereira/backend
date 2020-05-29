import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import ListProviderService from '@modules/appointments/services/ListProviderService'

let fakeUsersRepository: FakeUsersRepository
let listProviderService: ListProviderService

describe('ListProviderService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()

    listProviderService = new ListProviderService(
      fakeUsersRepository,
    )
  })

  it('should be able to list the profile', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: '123456'
    })

    const user2 = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johnTre@exemple.com',
      password: '123456'
    })

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'johnqua@exemple.com',
      password: '123456'
    })

    const providers = await listProviderService.execute({
      user_id: loggedUser.id,
    })

    expect(providers).toEqual([
      user1,
      user2
    ])
  })

})
