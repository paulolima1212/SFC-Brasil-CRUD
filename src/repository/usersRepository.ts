import { User, UserData } from '../@types/user'

export interface UserRepository {
  create(data: UserData): Promise<User>
  find(): Promise<User[]>
  findByName(name: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  delete(id: string): Promise<void>
  update(id: string, data: UserData): Promise<User | null>
  searchManyTimes(id: string): Promise<number | null>
}
