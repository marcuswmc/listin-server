import { Request, Response } from "express";
import { IList } from "../models/listModel";
import listService from "../services/listService";
import { validationResult } from "express-validator";

class ListController {
  getAll = async (req: Request, res: Response) => {
    try {
      const list: IList[] | undefined = await listService.getAll();
      res.json(list);
    } catch (error) {
      res.status(500).json({ message: "Error to get lists" });
    }
  };

  getOne = async (req: Request, res: Response) => {
    try {
      const listId: string = req.params.id;
      const list: IList | null = await listService.getById(listId);

      if (!list) {
        res.status(404).json({ message: "List not found" });
      }

      res.json(list);
    } catch (error) {
      res.status(500).json({ message: "Error to get list" });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return 
      }

      const listToCreate: IList = req.body;
      const newList = await listService.create(listToCreate);
      res.status(201).json(newList);
    } catch (error) {
      res.status(500).json({ message: "Error to create list" });
    }
  };

  // update = async () => {
  //   // TODO: implement update method
  // };
  // delete = {};

 
}

export default new ListController();
