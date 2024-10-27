import mongoose, { Document, Schema } from "mongoose";

export interface IUserList extends Document {
  name: string;
  creatorEmail: string;
  items: mongoose.Schema.Types.ObjectId[];
}

const UserListSchema = new Schema({
  name: { type: String, required: true },
  creatorEmail: { type: String, required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "ListItem" }],
});

export default mongoose.model<IUserList>("UserList", UserListSchema);
