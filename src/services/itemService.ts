import listModel from '../models/listModel';
import itemModel, { IItem } from './../models/itemModel';
import ItemModel from './../models/itemModel';


class ItemService {

  getAll = async (listId: string) => {
    try {
      const foundItems = await itemModel.find({ listId });
      return foundItems;
    }catch(error){
      throw new Error("Failed to get items")
    }
  }

  create = async (newItem: IItem, listId: string) => {
    try {
      const createdItem = await ItemModel.create({...newItem, listId})
      await  listModel.findByIdAndUpdate(listId, { $push: { items: createdItem._id } });
      return createdItem;
    } catch (error) {
      throw new Error("Failed to create item and update list");
    }
  };

  update = async (itemId: string, isChecked: boolean) => {
    try {
      const updatedItem = await ItemModel.findByIdAndUpdate(
              itemId,
              { isChecked },
              { new: true }
            );

            if (!updatedItem) {
              throw new Error("Item not found");
            }
          return updatedItem;

    }catch(error){
      throw new Error('Failed to update item')
    }
  }

  delete = async (itemId: string) => {
    try{
      const deletedItem = await itemModel.findByIdAndDelete(itemId);
      if(!deletedItem){
        throw new Error('Item not found')
      }
      return deletedItem;
    }catch(error){
      throw new Error('Failed to delete item')
    }
  }
}

export default new ItemService();