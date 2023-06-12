import { describe, expect, it } from '@jest/globals'
import { InMemoryUserRepository } from '../repository/in-memory-repository/in-memory-user-repository'
import { CreateUserUseCase } from './create'
import { FindUserByNameUseCase } from './find-user-by-name'
import { UserNotFoundError } from './errors/user-not-found.error'

let userRepository: InMemoryUserRepository
let create: CreateUserUseCase
let sut: FindUserByNameUseCase

describe('User tests', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    create = new CreateUserUseCase(userRepository)
    sut = new FindUserByNameUseCase(userRepository)
  })

  it('Should be able to get a user by name', async () => {
    const { user } = await create.execute({
      job: 'FullStack Developer',
      name: 'Stevie Lima',
      email: 'stevielima@example.com',
      password: '123456',
      role: 'ADMIN',
    })

    const name = user.name

    const response = await sut.execute({ name })

    expect(response.user?.id).toEqual(expect.any(String))
    expect(response.user?.name).toEqual('Stevie Lima')
  })
})
