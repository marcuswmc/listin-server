import express, { Request, Response } from "express";
import UserList from "../models/UserList";
import ListItem from "../models/ListItem";

const router = express.Router();

// Adicionar item à lista específica
router.post("/lists/:listId/items", async (req: Request, res: Response): Promise<any> => {
  const { title, quantity } = req.body;
  const listId = req.params.listId;

  const newItem = new ListItem({ title, quantity, isChecked: false, listId });

  try {
    const savedItem = await newItem.save();
    await UserList.findByIdAndUpdate(listId, { $push: { items: savedItem._id } });
    return res.status(201).json(savedItem);
  } catch (err) {
    return res.status(400).json({ message: (err as Error).message });
  }
});

// Atualizar o campo isChecked de um item específico
router.put("/lists/:listId/items/:itemId", async (req: Request, res: Response): Promise<any> => {
  const { itemId } = req.params;
  const { isChecked } = req.body;

  try {
    const updatedItem = await ListItem.findByIdAndUpdate(
      itemId,
      { isChecked },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res.json(updatedItem);
  } catch (err) {
    return res.status(500).json({ message: (err as Error).message });
  }
});

// Listar todos os itens de uma lista específica com base no listId
router.get("/lists/:listId/items", async (req: Request, res: Response): Promise<any> => {
  const { listId } = req.params;

  try {
    const items = await ListItem.find({ listId });
    return res.json(items);
  } catch (err) {
    return res.status(500).json({ message: (err as Error).message });
  }
});

// Excluir item de uma lista
router.delete("/lists/:listId/items/:itemId", async (req: Request, res: Response): Promise<any> => {
  try {
    const { listId, itemId } = req.params;
    await ListItem.findByIdAndDelete(itemId);
    await UserList.findByIdAndUpdate(listId, { $pull: { items: itemId } });
    return res.json({ message: "Item deleted" });
  } catch (err) {
    return res.status(500).json({ message: (err as Error).message });
  }
});

export default router;
