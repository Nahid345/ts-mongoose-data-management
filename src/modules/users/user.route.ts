import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.delete("/:userId", userController.deleteUser);
router.put("/:userId", userController.updateUser);
router.post("/", userController.createUser);
router.get("/", userController.getAllusers);
router.get("/:userId", userController.getSingUser);

export const userRoutes = router;
