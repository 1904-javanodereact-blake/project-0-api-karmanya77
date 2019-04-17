import { connectionPool } from './connection';
import { PoolClient } from 'pg';
import { convertUserSql } from '../util/sql-users-converter';
import { convertRoleSql } from '../util/sql-role-coverter';
import { User } from '../model/user';

export async function findAllUsers() {
  let client: PoolClient;
  try {
    client = await connectionPool.connect();
    const sqlQuery = 'select * from the_office.users order by user_id';
    const result = await client.query(sqlQuery);
    return result.rows;
  }
  catch (err) {
    return undefined;
  }
  finally {
    client && client.release();
  }
}

export async function findUserById(id: number) {
  let client = PoolClient;
  try {
    client = await connectionPool.connect();
    const sqlQuery = 'select * from the_office.users where user_id = $1';
    const result = await client.query(sqlQuery, [id]);
    return result.rows[0];
  }
  catch (err) {
    return undefined;
  }
  finally {
    client && client.release();
  }
}

export async function findByUsernameAndPassword(username: string, password: string) {
  let client = PoolClient;
  try {
    client = await connectionPool.connect();
    const sqlQuery = `select * from the_office.users as users
        inner join the_office.role as role on (users.role = role.role_id)
        where username = $1 and password = $2`;
    const result = await client.query(sqlQuery, [username, password]);
    const user = result.rows[0];

    if (user) {
      const convertedUser = convertUserSql(user);
      convertedUser.role = convertRoleSql(user);
      return convertedUser;
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

export async function updateUserData(user: User) {
  let client = PoolClient;
  try {
    client = await connectionPool.connect();
    const sqlQuery = `update the_office.users set 
          user_id = $1, username = $2, password = $3, firstname = $4, lastname = $5, email = $6, role = $7
          where user_id = $8`;
    const result = await client.query(sqlQuery,
      [user.userId, user.username, user.password, user.firstName, user.lastName, user.email, user.role, user.userId]);
    const userData = result.rows[0];
    if (userData) {
      const convertedUser = convertUserSql(userData);
      return convertedUser;
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