import { describe, expect, it } from '@jest/globals'
import { InMemoryUserRepository } from '../repository/in-memory-repository/in-memory-user-repository'
import { CreateUserUseCase } from './create'

let userRepository: InMemoryUserRepository
let sut: CreateUserUseCase

describe('User tests', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new CreateUserUseCase(userRepository)
  })

  it('Should be able to fetch users on list', async () => {
    await sut.execute({
      job: 'FullStack Developer',
      name: 'John Lima',
      email: 'johnlima@example.com',
      password: '123456',
      role: 'ADMIN',
    })
    await sut.execute({
      job: 'FullStack Developer',
      name: 'Stevie Lima',
      email: 'stevielima@example.com',
      password: '123456',
      role: 'USER',
    })
    await sut.execute({
      job: 'FullStack Developer',
      name: 'Paulo Lima',
      email: 'plima@example.com',
      password: '123456',
      role: 'USER',
    })

    expect(userRepository.users.length).toEqual(3)
    expect(userRepository.users[0]).toEqual(
      expect.objectContaining({
        name: 'John Lima',
      })
    )
  })
})
