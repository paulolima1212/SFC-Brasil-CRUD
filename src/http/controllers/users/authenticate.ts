import { Request, Response } from 'express'
import { z } from 'zod'
import { makeLoginUseCase } from '../../../use-cases/factories/make-login-use-case'

export async function authenticate(req: Request, res: Response) {
  const authBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authBodySchema.parse(req.body)

  const loginUseCase = makeLoginUseCase()

  const { token } = await loginUseCase.execute({ email, password })

  return res.status(200).send({ token })
}
