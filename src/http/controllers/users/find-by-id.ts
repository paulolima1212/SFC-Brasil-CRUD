import { Request, Response } from 'express'
import { z } from 'zod'
import { UserNotFoundError } from '../../../use-cases/errors/user-not-found.error'
import { makeFindUserByIdUseCase } from '../../../use-cases/factories/make-find-user-by-id-use-case'

export async function findUserById(req: Request, res: Response) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(req.params)

  const findUserById = makeFindUserByIdUseCase()

  try {
    const user = await findUserById.execute({ id })

    return res.status(200).send(user)
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      return res.status(404).send({ message: err.message })
    }
  }
}
