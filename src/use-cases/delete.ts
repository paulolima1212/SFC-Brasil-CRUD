import { UserRepository } from '../repository/usersRepository'

interface DeleteUserUseCaseRequest {
  id: string
}

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ id }: DeleteUserUseCaseRequest) {
    await this.userRepository.delete(id)
  }
}
