import { InMemoryUserRepository } from '../../repository/in-memory-repository/in-memory-user-repository'
import { FindUserByIdUseCase } from '../find-user-by-id'

export function makeFindUserByIdUseCase() {
  const userRepository = new InMemoryUserRepository()
  const getUserByIdUseCase = new FindUserByIdUseCase(userRepository)

  return getUserByIdUseCase
}
