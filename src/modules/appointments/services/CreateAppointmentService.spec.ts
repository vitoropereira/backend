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


    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123456'
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('123456')

  })

  it('should not be able to create two appointment on the same time', async () => {

    const appointmentDate = new Date(2020, 4, 10, 11)

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123456'
    })

    await expect(createAppointment.execute({
      date: appointmentDate,
      provider_id: '123456'
    })).rejects.toBeInstanceOf(AppError)
  })
})