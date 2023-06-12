import { Request, Response } from 'express'
import { z } from 'zod'
import { makeUpdateUserUseCase } from '../../../use-cases/factories/make-update-user-use-case'
import { makeFindUserByIdUseCase } from '../../../use-cases/factories/make-find-user-by-id-use-case'

export async function update(req: Request, res: Response) {
  const userDataBodySchema = z.object({
    name: z.string(),
    job: z.string(),
  })

  const userParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = userParamsSchema.parse(req.params)

  const { job, name } = userDataBodySchema.parse(req.body)

  const findUserById = makeFindUserByIdUseCase()
  const updateUser = makeUpdateUserUseCase()

  const data = await findUserById.execute({ id })

  const user = await updateUser.execute({ id, name, job })

  return res.status(200).send(user)
}
