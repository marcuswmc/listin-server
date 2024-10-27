import mongoose from "mongoose";

export interface IListItem extends mongoose.Document {
  title: string;
  quantity: number;
  isChecked: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  listId: mongoose.Schema.Types.ObjectId;
}

const ListItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    isChecked: {
      type: Boolean,
      default: false,
    },
    listId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserList",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IListItem>("ListItem", ListItemSchema);
