import { Request, Response } from 'express'
import { z } from 'zod'
import { makeDeleteUserUseCase } from '../../../use-cases/factories/make-delete-user-user-case'
import { makeFindUserByIdUseCase } from '../../../use-cases/factories/make-find-user-by-id-use-case'

export async function deleteUser(req: Request, res: Response) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(req.params)

  const getUserById = makeFindUserByIdUseCase()

  const user = await getUserById.execute({ id })

  if (!user) {
    return res.status(404).send({ message: 'User not found.' })
  }

  const deleteUserById = makeDeleteUserUseCase()

  await deleteUserById.execute({ id })

  return res.status(200).send({ message: 'user deleted' })
}
