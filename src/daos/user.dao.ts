import { connectionPool } from './connection';
import { PoolClient } from 'pg';

export async function findAllUsers() {
    let client : PoolClient;
    try{
      client = await connectionPool.connect();
      const sqlQuery = 'select * from the_office.users';
      const result = await client.query(sqlQuery);
      return result.rows;
    }
    catch (err){
      return undefined;
    }
    finally{
      client && client.release();
    }
  }

  export async function findUserById(id : number){
    let client = PoolClient;
    try{
      client = await connectionPool.connect();
      const sqlQuery = 'select * from the_office.users where userid = $1';
      const result = await client.query(sqlQuery,[id]);
      return result.rows[0];
    }
    catch(err) {
      return undefined;
    }
    finally {
      client && client.release();
    }
  }