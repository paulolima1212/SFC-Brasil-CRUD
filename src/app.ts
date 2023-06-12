import express from 'express'

import { user } from './http/controllers/users/routes'

export const app = express()

app.use(express.json())

app.use('/users', user)

app.listen(3333, () => {
  console.log('server is running')
})
