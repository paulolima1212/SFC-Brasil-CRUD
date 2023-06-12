import { Request, Response } from 'express'
import { makeFetchUsersUseCase } from '../../../use-cases/factories/make-fetch-users-use-case'

export async function fetch(req: Request, res: Response) {
  const fetchUsers = makeFetchUsersUseCase()

  const users = await fetchUsers.execute()

  return res.status(200).send(users)
}
