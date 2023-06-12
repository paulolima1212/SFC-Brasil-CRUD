import { User } from '../@types/user'
import { UserRepository } from '../repository/usersRepository'

interface FetchUsersUseCaseResponse {
  users: User[]
}

export class FetchUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<FetchUsersUseCaseResponse> {
    const users = await this.userRepository.find()

    return { users }
  }
}
