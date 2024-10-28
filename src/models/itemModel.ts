import mongoose from "mongoose";

export interface IItem extends mongoose.Document {
  title: string;
  quantity: number;
  isChecked: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  listId: mongoose.Schema.Types.ObjectId;
}

const ItemSchema = new mongoose.Schema(
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
      ref: "List",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IItem>("ListItem", ItemSchema);
