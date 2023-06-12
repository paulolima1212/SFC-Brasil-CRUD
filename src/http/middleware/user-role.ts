import jwt from 'jsonwebtoken'

import { NextFunction, Request, Response } from 'express'
import { env } from '../../env'
import { CustomJWT } from '../../@types/express'

export function userRole(req: Request, res: Response, next: NextFunction) {
  const _token = req.headers.authorization

  const token = _token?.split(' ')[1]

  if (!token) {
    return res.status(400).send({ message: 'Unauthorized' })
  }

  try {
    const { role } = jwt.verify(token, env.JWT_SECRET) as CustomJWT

    if (role !== 'ADMIN') {
      res.status(401).send({ message: 'Unauthorized.' })
    }
  } catch (error) {
    res.status(401).send({ message: 'Unauthorized' })
  }

  next()
}
