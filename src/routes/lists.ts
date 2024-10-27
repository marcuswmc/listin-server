import express, { Request, Response } from "express";
import UserList from "../models/UserList";

const router = express.Router();

// Criar uma nova lista
router.post("/lists", async (req: Request, res: Response) => {
  const { name, creatorEmail } = req.body;
  const newList = new UserList({ name, creatorEmail, items: [] });

  try {
    const savedList = await newList.save();
    res.status(201).json(savedList);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
});

router.get(
  "/lists/:listId",
  async (req: Request, res: Response): Promise<any> => {
    const { listId } = req.params;
    try {
      const foundList = await UserList.findOne({
        listId
      }).populate("items");
      if (!foundList) return res.status(404).json({ message: "List not found" });
      res.json(foundList);
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  }
);

export default router;
