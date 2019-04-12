import { SqlUser } from "../dto/user.dto";
import { User } from "../model/user";

export function convertUserSql (user : SqlUser) {
    return new User(user.user_id,user.username,undefined,user.firstname,user.lastname,user.email);
}