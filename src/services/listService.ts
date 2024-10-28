import { IList } from "../models/listModel";
import listModel from "../models/listModel";

class ListService {
  getAll = async (): Promise<IList[]> => {
    try {
      return await listModel.find();
    } catch (error) {
      throw new Error("Failed to get all lists");
    }
  };

  getById = async (listId: string): Promise<IList | null> => {
    try {
      const foundList: IList | null = await listModel.findById(listId).populate('items');
      return foundList;
    } catch (error) {
      throw new Error("Failed to get list by id");
    }
  };

  create = async (newList: IList) => {
    try {
      const createdList = await listModel.create(newList);
      return createdList;
    } catch (error) {
      throw new Error("Failed to create List");
    }
  };

  update = async (listId: string, list: IList): Promise<IList | null> => {
    try {
      const updatedList = await listModel.findByIdAndUpdate(listId, list, { new: true})
      return updatedList;
    }catch (error) {
      throw new Error("Failed to update List");
    }
  };

  delete = async (listId: string): Promise<IList | null> => {
    try {
      const deletedList = await listModel.findByIdAndDelete(listId);
      return deletedList;
    }catch(error){
      throw new Error('failed to delete list')
    }
  };
}

export default new ListService();
