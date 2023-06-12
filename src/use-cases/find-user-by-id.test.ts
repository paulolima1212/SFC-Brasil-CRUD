import { describe, expect, it } from '@jest/globals'
import { InMemoryUserRepository } from '../repository/in-memory-repository/in-memory-user-repository'
import { CreateUserUseCase } from './create'
import { FindUserByIdUseCase } from './find-user-by-id'

let userRepository: InMemoryUserRepository
let create: CreateUserUseCase
let sut: FindUserByIdUseCase

describe('User tests', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    create = new CreateUserUseCase(userRepository)
    sut = new FindUserByIdUseCase(userRepository)
  })

  it('Should be able to get a user by id', async () => {
    const { user } = await create.execute({
      job: 'FullStack Developer',
      name: 'Stevie Lima',
      email: 'johnlima@example.com',
      password: '123456',
      role: 'ADMIN',
    })

    const id = user.id

    const response = await sut.execute({ id })

    expect(response.user?.id).toEqual(expect.any(String))
    expect(response.user?.name).toEqual('Stevie Lima')
  })
})
