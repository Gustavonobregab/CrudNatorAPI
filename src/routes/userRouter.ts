import { Router } from 'express'
import { signUp, getAllUsers, getUserById, loginUser} from '../controllers/user/userController'

const router = Router()

router.post('/signup', signUp)
router.post('/login',loginUser)
router.get('/getusers', getAllUsers)
router.get('/getuserbyid/:id',getUserById)

export default router
