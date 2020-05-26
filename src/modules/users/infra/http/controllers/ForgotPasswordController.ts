import { Request, Response } from 'express'
import { container } from 'tsyringe'

import SendForgotPassordEmailService from "@modules/users/services/SendForgotPassordEmailService";

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const sendForgotPassordEmailService = container.resolve(SendForgotPassordEmailService)

    await sendForgotPassordEmailService.execute({
      email,
    })

    return response.status(204).json()
  }
}
