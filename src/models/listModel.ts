import mongoose, { Document, Schema } from "mongoose";

export interface IList extends Document {
  name: string;
  creatorEmail: string;
  items: mongoose.Schema.Types.ObjectId[];
}

const ListSchema = new Schema({
  name: { type: String, required: true },
  creatorEmail: { type: String, required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "ListItem" }],
});

export default mongoose.model<IList>("List", ListSchema);
