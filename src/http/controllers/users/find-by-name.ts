import { Request, Response } from 'express'
import { z } from 'zod'
import { UserNotFoundError } from '../../../use-cases/errors/user-not-found.error'
import { makeFindUserByNameUseCase } from '../../../use-cases/factories/make-find-user-by-name-use-case'

export async function findUserByName(req: Request, res: Response) {
  const paramsSchema = z.object({
    name: z.string().uuid(),
  })

  const { name } = paramsSchema.parse(req.params)

  const findUserByName = makeFindUserByNameUseCase()

  try {
    const user = await findUserByName.execute({ name })

    return res.status(200).send(user)
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      return res.status(404).send({ message: err.message })
    }
  }
}
