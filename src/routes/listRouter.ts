import { Router } from "express";
import ListController from "../controllers/listController";
import { check } from "express-validator";

const router: Router = Router();

router.post(
  "/create-list",
  [
    check("name").notEmpty().withMessage("List name is required"),
    check('creatorEmail').isEmail().withMessage('Invalid email format')
  ],
  ListController.create
);

router.get("/lists", ListController.getAll);

router.get("/lists/:id", ListController.getOne);

// router.put("lists/:id", ListController.update);

// router.delete("lists/:id", ListController.delete);

export default router;
