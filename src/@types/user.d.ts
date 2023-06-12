import { StringLiteral } from 'typescript'

export type UserData = {
  name: string
  email: string
  password: string
  job: string
  role: 'ADMIN' | 'USER'
}

export interface User {
  id: string
  name: string
  email: string
  password: string | undefined
  job: string
  role: string
}
