import { randomUUID } from 'node:crypto'
import { UserData, User } from '../../@types/user'
import { UserRepository } from '../usersRepository'
import { fakeDataBase } from './fake-database'
import { hash } from 'bcryptjs'

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = fakeDataBase

  async create(data: UserData) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: await hash(data.password, 6),
      job: data.job,
      role: data.role ? data.role : 'USER',
    }

    this.users.push(user)

    return user
  }

  async find() {
    const users = this.users

    return users
  }

  async findByName(name: string) {
    const user = this.users.find((user) => user.name === name)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string) {
    const user = this.users.find((user) => user.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async delete(id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id)

    this.users.splice(userIndex)
  }

  async update(id: string, data: UserData) {
    const user = this.users.find((user) => user.id === id)

    if (!user) {
      return null
    }

    const updatedUser = {
      ...user,
      name: data.name,
      job: data.job,
      role: data.role,
    }

    return updatedUser
  }

  async searchManyTimes(id: string) {
    return 0
  }
}
