import { User } from "./model/user";
import { Role } from "./model/role";
import { ReimbursementType } from "./model/reimbursementType";
//import { Reimbursement } from "./model/reimbursement";

export let roles : Role[] = [
    new Role(1,'finance manager'),
    new Role(2,'employee'),
    new Role(3,'admin')
];

export let users : User[] = [
    new User(1,'Prison Mike','aabbccdd','Michael', 'Scott','scott@gmail.com',roles[0]),
    new User(2,'Jim','aabbccdd','Jim', 'Halpert','halpert@gmail.com',roles[1]),
    new User(3,'Dwight','aabbccdd','Dwight', 'Schrute','schrute@gmail.com',roles[1]),
    new User(4,'Andy','aabbccdd','Andrew', 'Bernard','nard@gmail.com',roles[1]),
    new User(5,'Pam','aabbccdd','Pam', 'Anderson','pam@gmail.com',roles[2]),
];

export let reimbursementTypeObj : ReimbursementType[] = [
    new ReimbursementType(1,'Travel'),
    new ReimbursementType(2,'Certification'),
    new ReimbursementType(3,'Living Accomodation')
];

