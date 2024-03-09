import * as controllers from "../controllers/index.js";
import { Router } from "express";

const router = Router();

router.get("/users", controllers.users.getAllUsers);

export default router;
