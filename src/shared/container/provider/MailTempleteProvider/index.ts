import { container } from 'tsyringe'

import IMailTempleteProvider from '@shared/container/provider/MailTempleteProvider/models/IMailTempleteProvider'
import HandlebarsMailTemplateProvider from '@shared/container/provider/MailTempleteProvider/implementations/HandlebarsMailTemplateProvider'

const providers = {
  handlebars: HandlebarsMailTemplateProvider
}

container.registerSingleton<IMailTempleteProvider>(
  'MailTemplateProvider',
  providers.handlebars
)
