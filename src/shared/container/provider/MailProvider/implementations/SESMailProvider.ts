import nodemailer, { Transporter } from 'nodemailer'
import aws from 'aws-sdk'
import mailConfig from '@config/mail'
import { injectable, inject } from "tsyringe";

import IMailTempleteProvider from "@shared/container/provider/MailTempleteProvider/models/IMailTempleteProvider";
import IMailProvider from '@shared/container/provider/MailProvider/models/IMailProvider'
import ISendMailDTO from "@shared/container/provider/MailProvider/dtos/ISendMailDTO";

@injectable()
export default class SESMailProvider implements IMailProvider {
  private client: Transporter

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTempleteProvider
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: 'us-east-1',
      })
    })
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData
  }: ISendMailDTO): Promise<void> {
    const { name, emailFrom } = mailConfig.defaults.from

    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || emailFrom,
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    })

  }
}

