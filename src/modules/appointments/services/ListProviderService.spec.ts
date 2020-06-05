// import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import ListProviderService from '@modules/appointments/services/ListProviderService'
import FakeCachProvider from '@shared/container/provider/CacheProvider/fakes/FakeCachProvider'

let fakeUsersRepository: FakeUsersRepository
let listProviderService: ListProviderService
let fakeCachProvider: FakeCachProvider

describe('ListProviderService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeCachProvider = new FakeCachProvider()

    listProviderService = new ListProviderService(
      fakeUsersRepository,
      fakeCachProvider
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
