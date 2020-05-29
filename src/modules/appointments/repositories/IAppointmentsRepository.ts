import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import IFindAllInMonthFromProvider from '@modules/appointments/dtos/IFindAllInMonthFromProvider'


export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>
  findByDate(date: Date): Promise<Appointment | undefined>
  findAllInMonthFromProvider(
    data: IFindAllInMonthFromProvider
  ): Promise<Appointment[]>
}
