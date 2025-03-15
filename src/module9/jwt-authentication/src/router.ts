import express from 'express'
import { loginHandler } from './handlers/auth/login/handler'
import { logoutHandler } from './handlers/auth/logout/handler'

const router = express.Router()

router.post('/auth/login', loginHandler)
router.post('/auth/logout', logoutHandler)

export default router