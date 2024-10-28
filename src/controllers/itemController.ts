import { Request, Response } from "express";
import { IItem } from "./../models/itemModel";
import itemService from "../services/itemService";

class ItemController {

  getAll = async (req: Request, res: Response) => {
    try {
      const listId = req.params.listId

      const listItems = await itemService.getAll(listId)
      res.json(listItems)
    }catch(error){
      res.status(400).json({message: (error as Error).message})
    }
  }

  create = async (req: Request, res: Response) => {
    try {
      const itemData: IItem = req.body;
      const listId = req.params.listId;

      const createdItem = await itemService.create(itemData, listId);
      res.status(201).json(createdItem);
    } catch (err) {
      res.status(400).json({ message: (err as Error).message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { itemId } = req.params;
      const { isChecked } = req.body;

      if (!itemId) {
        res.status(400).json({ message: "Item ID is required" });
      }

      const updatedItem = await itemService.update(itemId, isChecked);

      if (!updatedItem) {
        res.status(404).json({ message: "Item not found" });
      }

      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  };

  delete = async (req: Request, res: Response) => {
    try{
      const { itemId } = req.params;
      if (!itemId) {
        res.status(400).json({ message: "Item ID is required" });
      };
      const deletedItem = await itemService.delete(itemId);
      res.status(200).json(deletedItem);
    }catch(error){
      res.status(400).json({ message: (error as Error).message });
    }
  }

}

export default new ItemController();


// // Excluir item de uma lista
// router.delete("/lists/:listId/items/:itemId", async (req: Request, res: Response): Promise<any> => {
//   try {
//     const { listId, itemId } = req.params;
//     await ListItem.findByIdAndDelete(itemId);
//     await UserList.findByIdAndUpdate(listId, { $pull: { items: itemId } });
//     return res.json({ message: "Item deleted" });
//   } catch (err) {
//     return res.status(500).json({ message: (err as Error).message });
//   }
// });

// export default router;
