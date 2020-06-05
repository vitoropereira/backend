import AppError from '@shared/errors/AppError'

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository'
import FakeCachProvider from '@shared/container/provider/CacheProvider/fakes/FakeCachProvider'

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let fakeCachProvider: FakeCachProvider

let listProviderAppointmentsService: ListProviderAppointmentsService

describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    fakeCachProvider = new FakeCachProvider()

    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCachProvider
    )
  })

  it('should be able to list the appointiments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider_id',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    })

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider_id',
      user_id: '12345678',
      date: new Date(2020, 4, 20, 15, 0, 0),
    })

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'provider_id',
      year: 2020,
      month: 5,
      day: 20,
    })

    expect(appointments).toEqual(expect.arrayContaining([
      appointment1,
      appointment2
    ]))
  })
})

