import AppError from '@shared/errors/AppError'

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let createAppointment: CreateAppointmentService

describe('CreateAppointmentService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    createAppointment = new CreateAppointmentService(fakeAppointmentsRepository)
  })

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '123456789',
      provider_id: '123456'
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('123456')

  })

  it('should not be able to create two appointment on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    const appointmentDate = new Date(2020, 4, 10, 15)

    await createAppointment.execute({
      date: appointmentDate,
      user_id: '123456789',
      provider_id: '123456'
    })

    await expect(createAppointment.execute({
      date: appointmentDate,
      user_id: '123456789',
      provider_id: '123456'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    await expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 11),
      user_id: '123456789',
      provider_id: '123456'
    })).rejects.toBeInstanceOf(AppError)

  })

  it('should not be able to create an appointment with the same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    await expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '123456',
      provider_id: '123456'
    })).rejects.toBeInstanceOf(AppError)

  })

  it('should not be able to create an appointment before 8h and after 17h', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    await expect(createAppointment.execute({
      date: new Date(2020, 4, 11, 7),
      user_id: '123456',
      provider_id: 'provider_id'
    })).rejects.toBeInstanceOf(AppError)

    await expect(createAppointment.execute({
      date: new Date(2020, 4, 11, 18),
      user_id: '123456',
      provider_id: 'provider_id'
    })).rejects.toBeInstanceOf(AppError)

  })
})
