import { describe, expect, it } from '@jest/globals'
import { InMemoryUserRepository } from '../repository/in-memory-repository/in-memory-user-repository'
import { CreateUserUseCase } from './create'
import { UpdateUserUseCase } from './update'

let userRepository: InMemoryUserRepository
let create: CreateUserUseCase
let sut: UpdateUserUseCase

describe('User tests', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    create = new CreateUserUseCase(userRepository)
    sut = new UpdateUserUseCase(userRepository)
  })

  it('Should be able to update a user by id', async () => {
    const { user } = await create.execute({
      job: 'Frontend Developer',
      name: 'Stevie Lima',
      email: 'stevielima@example.com',
      password: '123456',
      role: 'ADMIN',
    })

    const id = user.id
    const name = 'Paulo Lima'
    const job = 'FullStack Developer'

    const response = await sut.execute({ id, job, name })

    expect(response.user?.id).toEqual(expect.any(String))
    expect(response.user?.name).toEqual('Paulo Lima')
    expect(response.user?.job).toEqual('FullStack Developer')
  })
})
