import { User, UserData } from '../@types/user'
import { UserRepository } from '../repository/usersRepository'

interface UpdateUserUseCaseRequest {
  id: string
  name: string
  job: string
}

interface UpdateUserUseCaseResponse {
  user: User | null
}

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    id,
    name,
    job,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const userToUpdate = await this.userRepository.findById(id)

    if (!userToUpdate) {
      return { user: userToUpdate }
    }

    const user = {
      ...userToUpdate,
      name,
      job,
    }

    return { user }
  }
}
