import express from 'express'
import { getMessages } from '../controllers/messages';

const router = express.Router()

router.get("/", getMessages)

export default router

