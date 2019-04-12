import { SqlRole } from "../dto/role.dto";
import { Role } from "../model/role";

export function convertRoleSql(role : SqlRole){
    return new Role(role.role_id, role.role);
}