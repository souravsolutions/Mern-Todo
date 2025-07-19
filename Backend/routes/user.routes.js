import { Router } from "express"
import { loginUser, registerUser } from "../controllers/user.controller.js";
import { registerUserSchema ,loginUserSchema} from "../validators/auth-validators.js";
import validate from "../middleware/validate-middleware.js";

const router = Router();

router.route("/register").post(validate(registerUserSchema), registerUser)
router.route("/login").post(validate(loginUserSchema), loginUser)

export default router