import { InMemoryUserRepository } from '../../repository/in-memory-repository/in-memory-user-repository'
import { UpdateUserUseCase } from '../update'

export function makeUpdateUserUseCase() {
  const userRepository = new InMemoryUserRepository()
  const updateUserUseCase = new UpdateUserUseCase(userRepository)

  return updateUserUseCase
}
