import { Router } from "express"
import { getMe, loginUser, registerUser } from "../controllers/user.controller.js";
import { registerUserSchema ,loginUserSchema} from "../validators/auth-validators.js";
import validate from "../middleware/validate-middleware.js";
import { authMiddleware } from "../middleware/auth-middleware.js"

const router = Router();

router.route("/register").post(validate(registerUserSchema), registerUser)
router.route("/login").post(validate(loginUserSchema), loginUser)

router.route("/me").get(authMiddleware,getMe)

export default router