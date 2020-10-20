import { container } from 'tsyringe';

import DiskStorageProvider from './StorageProviders/implementations/DiskStorageProvider';
import IStoregeProvider from './StorageProviders/models/IStorageProvider';

container.registerSingleton<IStoregeProvider>(
    'StorageProvider',
    DiskStorageProvider,
);
