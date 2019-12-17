import { Model, Id, Int } from "../types";
import { Post } from "./Post";

@Model
export class Category {
  @Id id: Int;
  posts: Post[];
}