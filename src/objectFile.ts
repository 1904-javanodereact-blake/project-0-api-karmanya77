import { User } from "./model/user";
import { Role } from "./model/role";

export let roles = [
    new Role(1,'admin'),
    new Role(2,'not admin')
];

export let users : User[] = [
    new User(1,'Prison Mike','aabbccdd','Michael', 'Scott','scott@gmail.com',roles[0]),
    new User(2,'Jim','bbccaadd','Jim', 'Halpert','halpert@gmail.com',roles[1]),
    new User(3,'Dwight','aabbddcc','Dwight', 'Schrute','schrute@gmail.com',roles[1]),
];

