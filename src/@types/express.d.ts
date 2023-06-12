import jwt from 'jsonwebtoken'

export interface CustomJWT extends jwt.JwtPayload {
  role: string
}
