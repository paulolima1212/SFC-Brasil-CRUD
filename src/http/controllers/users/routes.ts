import { fetch } from './fetch-users'
import express from 'express'
import { create } from './create'
import { update } from './update'
import { deleteUser } from './delete'
import { findUserById } from './find-by-id'
import { findUserByName } from './find-by-name'
import { userRole } from '../../middleware/user-role'
import { authenticate } from './authenticate'

export const user = express.Router()

user.get('/', userRole, fetch)
user.get('/:id', findUserById)
user.get('/:name', findUserByName)

user.post('/', create)
user.post('/auth', authenticate)

user.put('/', userRole, update)

user.delete('/:id', userRole, deleteUser)
