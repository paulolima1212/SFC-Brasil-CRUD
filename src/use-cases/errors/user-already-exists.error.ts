export class UserAlreadyExistsError extends Error {
  constructor() {
    super('User whit email already exists.')
  }
}
