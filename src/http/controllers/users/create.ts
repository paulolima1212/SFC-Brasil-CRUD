import { z } from 'zod'
import { Request, Response } from 'express'
import { makeCreateUserUseCase } from '../../../use-cases/factories/make-create-user-use-case'
import { UserAlreadyExistsError } from '../../../use-cases/errors/user-already-exists.error'

export async function create(req: Request, res: Response) {
  const userDataBodySchema = z.object({
    name: z.string(),
    job: z.string(),
    email: z.string().email(),
    password: z.string(),
    role: z.enum(['ADMIN', 'USER']).default('USER'),
  })

  const { job, name, role, email, password } = userDataBodySchema.parse(
    req.body
  )

  const createUser = makeCreateUserUseCase()

  try {
    const user = await createUser.execute({ job, name, role, email, password })

    return res.status(201).send(user)
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return res.status(409).send({ message: err.message })
    }
  }

  return res.status(500).send()
}
