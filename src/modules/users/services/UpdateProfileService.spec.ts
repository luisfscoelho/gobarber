import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

describe('UpdateProfile', () => {
  let fakeHashProvider: FakeHashProvider;
  let fakeUsersRepository: FakeUsersRepository;
  let UpdateProfile: UpdateProfileService;
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    UpdateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    const updatedUser = await UpdateProfile.execute({
      user_id: user.id,
      name: 'Jhon Te',
      email: 'jhonte@example.com',
    });

    expect(updatedUser.name).toBe('Jhon Te');
    expect(updatedUser.email).toBe('jhonte@example.com');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@example.com',
      password: '123456',
    });

    await expect(
      UpdateProfile.execute({
        user_id: user.id,
        name: 'Jhon Doe',
        email: 'jhondoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    const updatedUser = await UpdateProfile.execute({
      user_id: user.id,
      name: 'Jhon Te',
      email: 'jhonte@example.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    expect(
      UpdateProfile.execute({
        user_id: user.id,
        name: 'Jhon Te',
        email: 'jhonte@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    expect(
      UpdateProfile.execute({
        user_id: user.id,
        name: 'Jhon Te',
        email: 'jhonte@example.com',
        old_password: 'wrong old password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
