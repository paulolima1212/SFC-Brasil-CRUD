import { User } from '../@types/user'
import { UserRepository } from '../repository/usersRepository'
import { UserNotFoundError } from './errors/user-not-found.error'

interface FindUserByEmailUseCaseRequest {
  email: string
}

interface FindUserByEmailUseCaseResponse {
  user: User | null
}

export class FindUserByEmailUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
  }: FindUserByEmailUseCaseRequest): Promise<FindUserByEmailUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new UserNotFoundError()
    }

    return { user }
  }
}
