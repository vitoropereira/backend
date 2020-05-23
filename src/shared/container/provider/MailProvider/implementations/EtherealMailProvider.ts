import nodemailer, { Transporter } from 'nodemailer'
import { injectable, inject } from "tsyringe";

import IMailProvider from '@shared/container/provider/MailProvider/models/IMailProvider'
import ISendMailDTO from "@shared/container/provider/MailProvider/dtos/ISendMailDTO";

import IMailTempleteProvider from "@shared/container/provider/MailTempleteProvider/models/IMailTempleteProvider";

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTempleteProvider
  ) {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      })
      this.client = transporter
    })
  }

  public async sendMail({ to, from, subject, templateData }: ISendMailDTO): Promise<void> {

    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe VOP Web',
        address: from?.email || 'vopweb@vopweb.com.br'
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    })

    console.log('Message sent: %s', message.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));

  }
}

