import { Client, Pool } from 'pg'
import Core from './core'
import { dump } from '../libs/mDump'

export default class Post extends Core {
  constructor(options) {
    super(options)
  }

  async initialize() {
    const { host, port, username, password, database, entities } = this

    dump(true, host, port, username, password, database)

    const config = {
      host,
      port,
      username,
      password,
      database,
      max: 10, // max number of clients in the pool
      idleTimeoutMillis: 30000,
    };



    try {

      const pool = new Pool(config)

      pool.on('connect', () => {
        console.log('connected to the Database');
      });

      Object.keys(entities).forEach(async (tableName) => {

        const schoolTable = `CREATE TABLE IF NOT EXISTS ${tableName} (
          id SERIAL PRIMARY KEY,
          student_name VARCHAR(128) NOT NULL,
          student_age INT NOT NULL,
        )`

        pool.query(schoolTable)
          .then((res) => {
            console.log(res);
            pool.end();
          })
          .catch((err) => {
            console.log(err);
            pool.end();
          });
      })

      console.log('GOOD');
    } catch (error) {
      // > throw error
      throw new Error('Database does not exist')
    }
  }
}