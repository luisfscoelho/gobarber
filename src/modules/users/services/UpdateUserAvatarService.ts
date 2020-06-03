import path from 'path';
import fs from 'fs';
import { getRepository } from 'typeorm';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

interface Request {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      const userAvatarPath = path.resolve(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarPath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarPath);
      }
    }

    user.avatar = avatarFileName;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
