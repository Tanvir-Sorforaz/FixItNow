import { Router } from "express";
import adminController from "./admin.controller.js";

const router = Router();

router.get("/users", adminController.getUsers);
router.patch("/users/:id", adminController.updateUserStatus);
router.get("/bookings", adminController.getBookings);
router.get("/categories", adminController.getCategories);
router.post("/categories", adminController.createCategory);

export default router;
