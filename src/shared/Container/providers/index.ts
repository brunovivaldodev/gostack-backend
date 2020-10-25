import { container } from 'tsyringe';

import DiskStorageProvider from './StorageProviders/implementations/DiskStorageProvider';
import IStoregeProvider from './StorageProviders/models/IStorageProvider';

import IMailProvider from './MailProviders/models/IMailProvider';
import EthrealMailProvider from './MailProviders/implementations/EthrealMailProvider';

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IStoregeProvider>(
    'StorageProvider',
    DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
    'MailTemplateProvider',
    HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
    'MailProvider',
    container.resolve(EthrealMailProvider),
);
