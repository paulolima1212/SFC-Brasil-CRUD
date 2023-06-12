import { InMemoryUserRepository } from '../../repository/in-memory-repository/in-memory-user-repository'
import { FetchUsersUseCase } from '../fetch-users'

export function makeFetchUsersUseCase() {
  const userRepository = new InMemoryUserRepository()
  const fetchUsersUseCase = new FetchUsersUseCase(userRepository)

  return fetchUsersUseCase
}
