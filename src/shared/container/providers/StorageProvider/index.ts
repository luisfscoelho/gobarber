import { container } from 'tsyringe';

import IStorageProvider from './models/IStorageProvider';
import DiskStoragePrivider from './implementations/DiskStoragePrivider';

const providers = {
  disk: DiskStoragePrivider,
};

container.registerSingleton<IStorageProvider>(
  'StoragePrivider',
  providers.disk,
);
