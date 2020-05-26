import { container } from 'tsyringe'

import IStorageProvider from '@shared/container/provider/StorageProvider/models/IStorageProvider'
import DiskStorageProvider from '@shared/container/provider/StorageProvider/implementations/DiskStorageProvider'

import IMailProvider from '@shared/container/provider/MailProvider/models/IMailProvider'
import EtherealMailProvider from '@shared/container/provider/MailProvider/implementations/EtherealMailProvider'

import IMailTempleteProvider from '@shared/container/provider/MailTempleteProvider/models/IMailTempleteProvider'
import HandlebarsMailTemplateProvider from '@shared/container/provider/MailTempleteProvider/implementations/HandlebarsMailTemplateProvider'

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
)

container.registerSingleton<IMailTempleteProvider>(
 'MailTemplateProvider',
 HandlebarsMailTemplateProvider
)

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider)
)
