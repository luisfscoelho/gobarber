import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStoragePrivider from './StorageProvider/implementations/DiskStoragePrivider';

container.registerSingleton<IStorageProvider>(
  'StoragePrivider',
  DiskStoragePrivider,
);
