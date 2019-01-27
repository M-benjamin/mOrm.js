import { Client, Pool } from 'pg'
import Core from './core'

export default class Post extends Core {
  constructor(options) {
    super(options)
  }

  async initialize() {
    const { host, port, username, password, database, entities } = this
    console.log('INIT :::', host, port, username, password, database, entities)

    const config = {
      host,
      port,
      username,
      password,
      database,
      max: 10, // max number of clients in the pool
      idleTimeoutMillis: 30000,
    };

    // this.client = new Client({
    //   host,
    //   port,
    //   username,
    //   password,
    //   database
    // })

    try {
      // await this.client.connect()

      const pool = new Pool(config)

      pool.on('connect', () => {
        console.log('connected to the Database');
      });

      Object.keys(entities).forEach(async (tableName) => {
        console.log('tableName.name', tableName)

        const schoolTable = `CREATE TABLE IF NOT EXISTS ${tableName} (
          id SERIAL PRIMARY KEY,
          student_name VARCHAR(128) NOT NULL,
          student_age INT NOT NULL,
          student_class VARCHAR(128) NOT NULL,
          parent_contact VARCHAR(128) NOT NULL,
          admission_date VARCHAR(128) NOT NULL
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