import UserToken from '../infra/typeorm/entities/UserToken';

export default interface IUserTokensInterface {
  generate(user_id: string): Promise<UserToken>;
}
