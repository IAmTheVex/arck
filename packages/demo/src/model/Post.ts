import { Model, Id, Int, DateTime, Default, UpdatedAt } from "../types";
import { User } from "./User";
import { Category } from "./Category";

@Model
export class Post {
  @Id
  id: Int;

  @Default('now()')
  createdAt: DateTime;

  @UpdatedAt
  updatedAt: DateTime;

  author: User;

  title: String;

  @Default('false')
  published: Boolean;

  category: Category;
}