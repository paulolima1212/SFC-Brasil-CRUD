import { User } from '../@types/user'
import { UserRepository } from '../repository/usersRepository'
import { UserAlreadyExistsError } from './errors/user-already-exists.error'

interface CreateUserUseCaseRequest {
  name: string
  email: string
  password: string
  job: string
  role: 'ADMIN' | 'USER'
}

interface CreateUserUseCaseResponse {
  user: User
}
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    job,
    name,
    role,
    email,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userAlreadyExist = await this.userRepository.findByName(name)

    if (userAlreadyExist) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.userRepository.create({
      job,
      name,
      role,
      email,
      password,
    })

    return {
      user: {
        ...user,
        password: undefined,
      },
    }
  }
}
