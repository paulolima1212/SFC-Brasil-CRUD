import { User } from '../@types/user'
import { UserRepository } from '../repository/usersRepository'
import { UserNotFoundError } from './errors/user-not-found.error'

interface FindUserByNameUseCaseRequest {
  name: string
}

interface FindUserByNameUseCaseResponse {
  user: User | null
}

export class FindUserByNameUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
  }: FindUserByNameUseCaseRequest): Promise<FindUserByNameUseCaseResponse> {
    const user = await this.userRepository.findByName(name)

    if (!user) {
      throw new UserNotFoundError()
    }

    return { user }
  }
}
