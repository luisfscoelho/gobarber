import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmil', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokenRepository = new FakeUserTokenRepository();

    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
      fakeUserTokenRepository,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUserRepository.create({
      email: 'jhondoe@example.com',
      name: 'Jhon Doe',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'jhondoe@example.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should be not able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmailService.execute({
        email: 'jhondoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');

    const user = await fakeUserRepository.create({
      email: 'jhondoe@example.com',
      name: 'Jhon Doe',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'jhondoe@example.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
