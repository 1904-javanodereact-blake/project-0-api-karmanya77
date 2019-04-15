import { SqlReimbursement } from "../dto/reimbursement.dto";
import { Reimbursement } from "../model/reimbursement";

 export function convertSqlReimbursement(reimbursements : SqlReimbursement) {
    return new Reimbursement(
        reimbursements.reimbursement_id, reimbursements.author,reimbursements.amount, reimbursements.date_submitted,
        reimbursements.date_resolved,reimbursements.description,reimbursements.resolver,reimbursements.status,reimbursements.type
    );
 }