import { describe, expect, it } from '@jest/globals'
import { InMemoryUserRepository } from '../repository/in-memory-repository/in-memory-user-repository'
import { CreateUserUseCase } from './create'

let userRepository: InMemoryUserRepository
let sut: CreateUserUseCase

describe('User tests', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new CreateUserUseCase(userRepository)

    userRepository.users = []
  })

  it('Should be able to create a user', async () => {
    const { user } = await sut.execute({
      job: 'FullStack Developer',
      name: 'Stevie Lima',
      email: 'stevielima@example.com',
      password: '123456',
      role: 'USER',
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('Stevie Lima')
  })
})
