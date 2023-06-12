import { User } from '../@types/user'
import { UserRepository } from '../repository/usersRepository'
import { UserNotFoundError } from './errors/user-not-found.error'

interface FindUserByIdUseCaseRequest {
  id: string
}

interface FindUserByIdUseCaseResponse {
  user: User | null
}

export class FindUserByIdUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    id,
  }: FindUserByIdUseCaseRequest): Promise<FindUserByIdUseCaseResponse> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new UserNotFoundError()
    }

    return { user }
  }
}
