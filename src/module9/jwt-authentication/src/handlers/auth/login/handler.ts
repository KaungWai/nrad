import { Request, Response } from 'express'
import status from 'http-status'
import { loginBodySchema } from './body'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as Yup from 'yup'

export const loginHandler = async (request: Request, response: Response) => {
  try {
    console.log(request.body)
    loginBodySchema.validateSync(request.body, {
      abortEarly: false,
    })

    const body = loginBodySchema.cast(request.body)

    const user = userTable.find((x) => x.username == body.username)
    if (!user) {
      response.status(status.UNAUTHORIZED).send({
        error: ['Username or password is invalid'],
      })
      return
    }

    const isHashMatch = bcrypt.compareSync(body.password, user.hash)

    if (!isHashMatch) {
      response.status(status.UNAUTHORIZED).send({
        error: ['Username or password is invalid'],
      })
      return
    }

    const secret = process.env.JWT_SECRET
    if (!secret) {
      throw new Error('secret not found')
    }

    const payload = {
      username: user.username,
      role: user.role,
    }

    const oneDay = 60 * 60 * 24

    const token = jwt.sign(payload, secret, {
      expiresIn: oneDay,
    })

    response.cookie('access_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: true,
    })

    response.status(status.OK).end()
  } catch (e) {
    if (e instanceof Yup.ValidationError) {
      response.status(status.BAD_REQUEST).send({
        error: e.errors,
      })
      return
    }

    request.log.error(e)
    response.status(status.INTERNAL_SERVER_ERROR).send({
        error: [status['500_NAME']]
    })
  }
}

const userTable = [
  { username: 'mgmg', role: 'admin', salt: '$2b$10$lCz//WyBmM8H5ZimM.vFWu', hash: '$2b$10$lCz//WyBmM8H5ZimM.vFWuTf2DKHxFYinyiCZcg0Uzw1tVEpOVo.W' },
  { username: 'aungaung', role: 'user', salt: '$2b$10$lnVh92BHhk1wJiZ.LT.Y6O', hash: '$2b$10$lnVh92BHhk1wJiZ.LT.Y6OfJ1ktsgJmapI1CpAhH9IUYkGHEQ/w16' },
  { username: 'kyaw', role: 'user', salt: '$2b$10$9IDfbgT7Qrm4yq5yB6QX1e', hash: '$2b$10$9IDfbgT7Qrm4yq5yB6QX1eE.Ph2Azz8L6LR7wb3ZoVVV6Oa8p5tta' },
  { username: 'sansan', role: 'user', salt: '$2b$10$4IIe8ISkmfHvRUVKeZKhGe', hash: '$2b$10$4IIe8ISkmfHvRUVKeZKhGe5TYD2hVouVpwiPswm1j12psXtwStaRm' },
  { username: 'winwin', role: 'user', salt: '$2b$10$pBg7ojE1XxVN0H/3m5Tge.', hash: '$2b$10$pBg7ojE1XxVN0H/3m5Tge.G7F7zf66BDc0ZcTPGiz/EGCyLQQ6.yG' },
]
