import { InMemoryUserRepository } from '../../repository/in-memory-repository/in-memory-user-repository'
import { LoginUseCase } from '../login'

export function makeLoginUseCase() {
  const userRepository = new InMemoryUserRepository()
  const loginUseCase = new LoginUseCase(userRepository)

  return loginUseCase
}
