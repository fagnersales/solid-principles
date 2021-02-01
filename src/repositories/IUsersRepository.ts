import { User } from "../entities/User";

export interface IusersRepository {
  findByEmail(email: string): Promise<User>;
  save(user: User): Promise<void>;
}