
import { isEmpty } from 'lodash'
import { existsSync } from 'fs'
import PostgresSQL from './engine/postgresql'

export default class mOrm {
  configPathName = './morm.config.js'
  // async getEntity()

  async createConnection(dbConfig = {}) {

    this.entities = {
      Student: dbConfig.entities[0],
      Project: dbConfig.entities[1],
      Note: dbConfig.entities[2]
    }

    if (typeof dbConfig == 'string') {
      // postgres://user:pass@host:port/db
      // string => object
      let pattern = /(.*):\/\/(.*):(.*)@(.*):(.*)\/(.*)/;
      let matches = dbConfig.match(pattern);

      this.config = {
        type: "postgres",
        host: matches[4],
        port: matches[5],
        username: matches[2],
        password: matches[3],
        database: matches[6]
      }

    } else {
      if (isEmpty(dbConfig)) {
        if (!existsSync(this.configPathName)) {
          throw new Error('No CONFIG')
        }

        this.config = require(this.configPathName)
      } else {
        this.config = dbConfig
      }
    }

    const { host, port, username, password, database } = this.config


    switch (this.config.type) {
      case 'postgres':
        this.dbInstance = new PostgresSQL({ host, port, username, password, database, entities: this.entities })
        break
    }

    await this.dbInstance.initialize()
  }
}
