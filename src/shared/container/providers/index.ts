import { container } from 'tsyringe';
import mailConfig from '@config/mail';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStoragePrivider from './StorageProvider/implementations/DiskStoragePrivider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import SESMailProvider from './MailProvider/implementations/SESMailProvider';

import IMailTemplateProvider from './MailTemplateProvider/Models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/Implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IStorageProvider>(
  'StoragePrivider',
  DiskStoragePrivider,
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailConfig.driver === 'ethereal'
    ? container.resolve(EtherealMailProvider)
    : container.resolve(SESMailProvider),
);
