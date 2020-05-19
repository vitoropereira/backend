import { container } from 'tsyringe'

import IStorageProvider from '@shared/container/provider/StorageProvider/models/IStorageProvider'
import DiskStorageProvider from '@shared/container/provider/StorageProvider/implementations/DiskStorageProvider'

// import IMailProvider from '@shared/container/provider/MailProvider/models/IMailProvider'



container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
)
