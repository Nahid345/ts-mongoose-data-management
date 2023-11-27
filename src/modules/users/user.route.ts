import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.post("/", userController.createUser); // create user
router.get("/", userController.getAllusers); // getalluser
router.get("/:userId", userController.getSingUser); // getsingle user

router.delete("/:userId", userController.deleteUser); // deleteuser
router.put("/:userId", userController.updateUser); // update user
router.get("/userId/total-price", userController.calculateOrders);

router.put("/:userId/orders", userController.updateOrders); // update order
router.get("/:userId/orders", userController.getUserOrders); // find order

export const userRoutes = router;
