import { Router } from "express"
import { getCustomRepository } from "typeorm";
import { parseISO } from "date-fns";

import CreateAppointmentService from '../services/CreateAppointmentService'
import AppointmentsRespository from "../repositories/AppointmentsRepository";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get('/', async (request, response) => {
  const appotmentsRepository = getCustomRepository(AppointmentsRespository)
  const appointments = await appotmentsRepository.find()

  return response.json(appointments)
})

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body

  const parsedDate = parseISO(date)

  const CreateAppointment = new CreateAppointmentService()

  const appointment = await CreateAppointment.execute({
    date: parsedDate,
    provider_id
  })

  return response.json(appointment)
})

export default appointmentsRouter
