import { describe, expect, it } from '@jest/globals'
import { InMemoryUserRepository } from '../repository/in-memory-repository/in-memory-user-repository'
import { CreateUserUseCase } from './create'
import { LoginUseCase } from './login'

let userRepository: InMemoryUserRepository
let create: CreateUserUseCase
let sut: LoginUseCase

describe('User tests', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    create = new CreateUserUseCase(userRepository)
    sut = new LoginUseCase(userRepository)

    userRepository.users = []
  })

  it('Should be able to login in application', async () => {
    const { user } = await create.execute({
      job: 'FullStack Developer',
      name: 'Stevie Lima',
      email: 'stevielima@example.com',
      password: '123456',
      role: 'USER',
    })

    const { email } = user
    const password = '123456'

    const { token } = await sut.execute({ email, password })

    expect(token).toEqual(expect.any(String))
  })
})
