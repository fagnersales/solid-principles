import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IusersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
  constructor(
    private usersRepository: IusersRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error("User already exists.");
    } else {
      const user = new User(data);

      await this.usersRepository.save(user);

      console.log(data);

      await this.mailProvider.sendMail({
        to: {
          name: data.name,
          email: data.email
        },
        from: {
          name: 'Neabots',
          email: 'no-reply@neabots.com'
        },
        subject: 'Seja bem-vindo á plataforma!',
        body: `<h1>Olá ${data.name}!</h1><p>Seja bem-vindo!</p>`
      });
    }
  }
}