
import { isEmpty } from 'lodash'
import { existsSync } from 'fs'
import PostgresSQL from './engine/postgresql'

export default class mOrm {
  configPathName = './morm.config.js'
  // async getEntity()

  async createConnection(dbConfig = {}) {
    console.log('dbConfig', dbConfig.entities)
    console.log('dbConfig', dbConfig.entities[0].name)
    console.log('dbConfig', dbConfig.entities[0].columns)

    this.entities = {
      Student: dbConfig.entities[0],
      Project: dbConfig.entities[1],
      Note: dbConfig.entities[2]
    }

    if (typeof dbConfig == 'string') {
      // postgres://user:pass@host:port/db
      // string => object

      console.log('dbConfig', dbConfig)

      let pattern = /(.*):\/\/(.*):(.*)@(.*):(.*)\/(.*)/;
      let matches = dbConfig.match(pattern);
      console.log(matches)

      this.config = {
        type: "postgres",
        host: matches[4],
        port: matches[5],
        username: matches[2],
        password: matches[3],
        database: matches[6]
      }

      console.log('this.config', this.config)

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
    console.log(host, port, username, password, database)
    console.log(this.config.type)
    console.log('FFFFF ::', this.entities)

    switch (this.config.type) {
      case 'postgres':
        this.dbInstance = new PostgresSQL({ host, port, username, password, database, entities: this.entities })
        break
    }

    await this.dbInstance.initialize()
  }
}
