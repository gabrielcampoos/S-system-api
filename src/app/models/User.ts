import { Base } from "./Base";

export interface UserJson {
  id: string;
  username: string;
}

interface EditUserDto {
  name?: string;
}

export class User extends Base {
  constructor(_id: string, private _username: string) {
    super(_id);
  }

  public toJson(): UserJson {
    return {
      id: this._id,
      username: this._username,
    };
  }

  editUser(data: EditUserDto): boolean {
    if (data.name) {
      if (data.name?.length < 0) {
        return false;
      }

      this._username = data.name;
    }

    return true;
  }
}
