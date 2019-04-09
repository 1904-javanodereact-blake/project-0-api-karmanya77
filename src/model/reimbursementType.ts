export class ReimbursementType{
    typeId: number; // primary key
    type: string; // not null, unique

    constructor(typeId = 0, type = ''){
        this.typeId = typeId;
        this.type = type;  
    }
}