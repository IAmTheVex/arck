import { Model, Id, Int } from "../types";
import { User } from "./User";

@Model
export class Profile {
  @Id id: Int;
  user: User;
}