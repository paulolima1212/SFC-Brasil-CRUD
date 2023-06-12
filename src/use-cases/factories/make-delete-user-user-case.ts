import { InMemoryUserRepository } from '../../repository/in-memory-repository/in-memory-user-repository'
import { DeleteUserUseCase } from '../delete'

export function makeDeleteUserUseCase() {
  const userRepository = new InMemoryUserRepository()
  const deleteUserUseCase = new DeleteUserUseCase(userRepository)

  return deleteUserUseCase
}
