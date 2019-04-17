import { connectionPool } from "./connection";
import { PoolClient } from 'pg';
import { convertSqlReimbursement } from "../util/sql-reimbursement-converter";
import { Reimbursement } from "../model/reimbursement";

export async function findReimbursementStatusById(statusId: number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const sqlQuery = `select re.reimbursement_id, us.username as author,re.amount,re.date_submitted,re.date_resolved,re.description,res.username as resolver,stat.status, t.type 
        from the_office.reimbursement as re
        inner join the_office.users as us on (re.author = us.user_id)
        inner join the_office.users as res on (re.resolver = res.user_id)
        inner join the_office.reimbursement_status as stat on (re.status = stat.status_id)
        inner join the_office.reimbursement_type as t on (re.type = t.type_id)
        where re.status = $1 order by re.date_submitted`;
        const result = await client.query(sqlQuery, [statusId]);
        const statusData = result.rows[0];
        if (statusData) {

            const convertedStatusData = convertSqlReimbursement(statusData);
            return convertedStatusData;
        }
        else {
            return undefined;
        }
    }
    catch (err) {
        return undefined;
    }
    finally {
        client && client.release();
    }
}

export async function findReimbursementUserById(userId: number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const sqlQuery = `select re.reimbursement_id, us.username as author,re.amount,re.date_submitted,re.date_resolved,re.description,res.username as resolver,stat.status, t.type 
        from the_office.reimbursement as re
        inner join the_office.users as us on (re.author = us.user_id)
        inner join the_office.users as res on (re.resolver = res.user_id)
        inner join the_office.reimbursement_status as stat on (re.status = stat.status_id)
        inner join the_office.reimbursement_type as t on (re.type = t.type_id)
        where re.author = $1 order by re.date_submitted`;
        const result = await client.query(sqlQuery, [userId]);
        const statusData = result.rows[0];

        if (statusData) {
            const convertedReimbursementData = convertSqlReimbursement(statusData);
            return convertedReimbursementData;
        }
        else {
            return undefined;
        }
    }
    catch (err) {
        return undefined;
    }
    finally {
        client && client.release();
    }
}

export async function submitReimbursement(data: Reimbursement) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        console.log(typeof (data.dateSubmitted));
        const insertQuery = `insert into the_office.reimbursement (author,amount,date_submitted,description,status,type) 
                            values ($1, $2, $3, $4, $5, $6) returning *`;
        const resultSet = await client.query(insertQuery, [data.author, data.amount, data.dateSubmitted, data.description, data.status, data.type]);
        const result = resultSet.rows[0];
        return result;
    }
    catch (err) {
        console.log(err);
        return undefined;
    }
    finally {
        client && client.release();
    }
}

export async function updateReimbursement(newReimb: Reimbursement) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const current = await client.query(`Select * from the_office.reimbursement where reimbursement_id = $1`, [newReimb.reimbursementId]);

        const cry = current.rows[0];

        const convertedCr = convertSqlReimbursement(cry);
        
        for (let field in convertedCr) {
            if (convertedCr[field] !== newReimb[field] && newReimb[field] !== undefined) {
                convertedCr[field] = newReimb[field];
            }
        }
        /* console.log(typeof(updateData.dateSubmitted)); */

        /*  console.log(typeof(finalData.dateSubmitted));
         console.log(finalData.dateResolved);
         console.log(finalData.description);
         console.log(finalData.amount); */
        const updateQuery = `update the_office.reimbursement set
                                author = $1, amount = $2, date_submitted = $3, date_resolved = $4, 
                                description = $5, resolver = $6, status = $7, type = $8
                                where reimbursement_id = $9`;
        const result = await client.query(updateQuery, [
            convertedCr.author, convertedCr.amount, convertedCr.dateSubmitted, convertedCr.dateResolved, convertedCr.description,
            convertedCr.resolver, convertedCr.status, convertedCr.type, convertedCr.reimbursementId]);
        const abc = result.rows[0];
        if(abc) {
            return abc
        }
        else {
            return undefined;
        }
    }
    catch (err) {
        console.log(err);
        return undefined;
    }
    finally {
        client && client.release();
    }
}