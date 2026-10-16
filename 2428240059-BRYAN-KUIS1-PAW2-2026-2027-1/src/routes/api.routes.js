import express from 'express'
import PaketController from '../controllers/paket.controller.js'
import PenerimaController from '../controllers/penerima.controller.js'
import { logMiddleware } from '../middlewares/log.middleware.js'

import upload from '../config/upload.js'
import UploadController from '../controllers/upload.controller.js'
import UserController from '../controllers/user.controller.js'
import WelcomeController from '../controllers/welcome.controller.js'

const router = express.Router()

router.use(logMiddleware)

router.get('/welcome', WelcomeController.welcome)
router.post('/users', UserController.store)
router.post('/upload', upload.single('file'), UploadController.store)

//router paket
router.get('/paket', PaketController.index)
router.get('/paket/:id', PaketController.show)
router.post('/paket', PaketController.store)
router.put('/paket/:id', PaketController.update)
router.patch('/paket/:id', PaketController.update)
router.delete('/paket/:id', PaketController.delete)

//router penerima
router.get('/penerima', PenerimaController.index)
router.get('/penerima/:id', PenerimaController.show)
router.post('/penerima', PenerimaController.store)
router.put('/penerima/:id', PenerimaController.update)
router.patch('/penerima/:id', PenerimaController.update)
router.delete('/penerima/:id', PenerimaController.delete)

export default router
