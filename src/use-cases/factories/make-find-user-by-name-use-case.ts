import { InMemoryUserRepository } from '../../repository/in-memory-repository/in-memory-user-repository'
import { FindUserByNameUseCase } from '../find-user-by-name'

export function makeFindUserByNameUseCase() {
  const userRepository = new InMemoryUserRepository()
  const getUserByNameUseCase = new FindUserByNameUseCase(userRepository)

  return getUserByNameUseCase
}
