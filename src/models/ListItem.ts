import mongoose from "mongoose";

export interface IListItem extends mongoose.Document {
  title: string;
  quantity: number;
  isChecked: boolean;
  createdAt?: Date;
  updatedAt?: Date;
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IListItem>("ListItem", ListItemSchema);
