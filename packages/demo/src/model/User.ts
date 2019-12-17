import { Model, Int, Id, DateTime, Default, Unique, Enum, Map } from "../types";
import { Profile } from "./Profile";
import { Post } from "./Post";
import { Role } from "./Role";

@Model @Map('my_user')
export class User {
  @Id id: Int;
  @Default('now()') createdAt: DateTime;
  @Unique email: String;
  name?: String;
  @Default('USER') role: Enum<Role>;
  posts: Post[];
  profile?: Profile;
}