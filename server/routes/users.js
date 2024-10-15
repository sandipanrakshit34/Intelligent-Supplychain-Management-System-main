import express from "express";

import { getUser, updateUserDetails } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/*READ*/
router.get("/:id", verifyToken, getUser);

/*UPDATE*/

router.patch("/:id", updateUserDetails);
export default router;
