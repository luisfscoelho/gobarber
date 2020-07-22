import { container } from 'tsyringe';
import uploadConfig from '@config/upload';

import IStorageProvider from './models/IStorageProvider';
import DiskStoragePrivider from './implementations/DiskStoragePrivider';
import S3StorageProvider from './implementations/S3StorageProvider';

const providers = {
  disk: DiskStoragePrivider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StoragePrivider',
  providers[uploadConfig.driver],
);
