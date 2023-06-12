import { InMemoryUserRepository } from '../../repository/in-memory-repository/in-memory-user-repository'
import { CreateUserUseCase } from '../create'

export function makeCreateUserUseCase() {
  const userRepository = new InMemoryUserRepository()
  const createUserUseCase = new CreateUserUseCase(userRepository)

  return createUserUseCase
}
