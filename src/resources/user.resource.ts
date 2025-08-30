import { User } from "../entities/user.entity";

export class UserResource {
  static toArray(users: User[]) {
    return users.map((u) => this.toObject(u));
  }

  static toObject(user: User) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
      roles: user.roles?.map((r) => r.name) || [],
      permissions: [
        ...new Set(
          user.roles?.flatMap((r) => r.permissions?.map((p) => p.name) || []) || []
        ),
      ],
    };
  }
}
