import express, { Request, Response } from "express";
import ListItem, { IListItem } from "../models/ListItem";

const router = express.Router();

// Obter todos os itens
router.get("/items", async (req: Request, res: Response) => {
  try {
    const items: IListItem[] = await ListItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: error.message });
  }
});

// Criar novo item
router.post("/items", async (req: Request, res: Response) => {
  const { title, quantity } = req.body;

  const newItem = new ListItem({
    title,
    quantity,
  });

  try {
    const savedItem = await newItem.save();
    console.log("Item salvo no banco:", savedItem);
    res.status(201).json(savedItem);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
});

// Atualizar um item
router.put("/items/:id", async (req: Request, res: Response) => {
  try {
    const updatedItem = await ListItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedItem);
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ message: error.message });
  }
});

// Deletar um item
router.delete("/items/:id", async (req: Request, res: Response) => {
  try {
    await ListItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    const error = err as Error;
    res.status(500).json({ message: error.message });
  }
});

export default router;
