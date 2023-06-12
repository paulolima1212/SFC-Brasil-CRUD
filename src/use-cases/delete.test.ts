import { describe, expect, it } from '@jest/globals'
import { InMemoryUserRepository } from '../repository/in-memory-repository/in-memory-user-repository'
import { CreateUserUseCase } from './create'
import { DeleteUserUseCase } from './delete'

let userRepository: InMemoryUserRepository
let create: CreateUserUseCase
let sut: DeleteUserUseCase

describe('User tests', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    create = new CreateUserUseCase(userRepository)
    sut = new DeleteUserUseCase(userRepository)

    userRepository.users = []
  })

  it('Should be able to delete a user', async () => {
    const { user } = await create.execute({
      job: 'FullStack Developer',
      name: 'Paulo Lima',
      email: 'plima@example.com',
      password: '123456',
      role: 'ADMIN',
    })

    const id = user.id

    expect(async () => {
      await sut.execute({ id })
    }).resolves
  })

  it('Should not be able to delete an inexistent user', async () => {
    await create.execute({
      job: 'FullStack Developer',
      name: 'John Lima',
      email: 'johnlima@example.com',
      password: '123456',
      role: 'ADMIN',
    })

    const id = '45678965465465'

    expect(async () => {
      await sut.execute({ id })
    }).resolves
  })
})
