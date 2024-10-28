import { Router } from "express";
import ItemController from "../controllers/itemController";
import { check } from "express-validator";


const router = Router();

router.post("/lists/:listId/items", [
  check("title").notEmpty().withMessage("Item title is required"),
  check("quantity").isInt({ min: 1 }).withMessage("Quantity must be a positive integer"),
], ItemController.create);

router.put("/lists/:listId/items/:itemId", ItemController.update);

router.get("/lists/:listId/items", ItemController.getAll)

router.delete("/lists/:listId/items/:itemId", ItemController.delete)

export default router;
