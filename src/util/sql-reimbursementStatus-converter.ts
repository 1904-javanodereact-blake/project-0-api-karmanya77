import { SqlreimbursementStatus } from "../dto/reimbursementStatus.dto";
import { ReimbursementStatus } from "../model/reimbursementStatus";

export function convertStatusSql (reimbursementstatus : SqlreimbursementStatus) {
    return new ReimbursementStatus(reimbursementstatus.status_id, reimbursementstatus.status);
}