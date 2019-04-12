import { connectionPool } from './connection';
import { PoolClient } from 'pg';
import { convertUserSql } from '../util/sql-users-converter';
import { convertRoleSql } from '../util/sql-role-coverter';

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
      const sqlQuery = 'select * from the_office.users where user_id = $1';
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

  export async function findByUsernameAndPassword(username : string, password : string){
    let client = PoolClient;
    try {
      client = await connectionPool.connect();
      const sqlQuery = `select * from the_office.users as users
        inner join the_office.role as role on (users.role = role.role_id)
        where username = $1 and password = $2`;
      const result = await client.query(sqlQuery,[username,password]);
      const user = result.rows[0];
      
      if(user){
        const convertedUser = convertUserSql(user);
        convertedUser.role = convertRoleSql(user);
        return convertedUser;
      }
      else{
        return undefined;
      }
    }
    catch(err) {
      return undefined;
    }
    finally{
      client && client.release();
    }
  }