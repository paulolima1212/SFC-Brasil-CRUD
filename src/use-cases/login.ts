import jwt from 'jsonwebtoken'
import { compare } from 'bcryptjs'
import { UserRepository } from '../repository/usersRepository'
import { env } from '../env'
import { UserNotFoundError } from './errors/user-not-found.error'

interface LoginUseCaseRequest {
  email: string
  password: string
}

interface LoginUseCaseResponse {
  token: string | null
}

export class LoginUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: LoginUseCaseRequest): Promise<LoginUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new UserNotFoundError()
    }

    const doesPasswordMatch = await compare(password, user.password!)

    let token = null

    if (doesPasswordMatch) {
      token = jwt.sign(
        {
          sub: user.id,
          role: user.role,
        },
        env.JWT_SECRET,
        { expiresIn: '1h' }
      )

      return { token }
    }

    return { token }
  }
}
