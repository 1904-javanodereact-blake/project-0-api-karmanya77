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
        const id: number = +data.reimbursementId;
        console.log(id, typeof (id));
        if (id === 0) {
            client = await connectionPool.connect();
            console.log(typeof (data.dateSubmitted));
            const insertQuery = `insert into the_office.reimbursement (reimbursement_id,author,amount,date_submitted,description,status,type) 
                            values ($1, $2, $3, $4, $5, $6, $7) returning *`;
            const resultSet = await client.query(insertQuery, [data.reimbursementId, data.author, data.amount, data.dateSubmitted, data.description, data.status, data.type]);
            const result = resultSet.rows[0];
            return result;
        }
        else {
            console.log('Reimbursement Id should be 0 !!!');
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

export async function updateReimbursement(updateData : Reimbursement) {
    let client: PoolClient;
    try {
        client = connectionPool.connect();
        const updateQuery = `update the_office.reimbursement set reimbursement_id = $1,
                                author = $2, amount = $3, date_submitted = $4, date_resolved = $5, 
                                description = $6, resolver = $7, status = $8, type = $9
                                where reimbursement_id = $10`;
        const result = await client.query(updateQuery,[]);
    }
    catch (err) {

    }
}