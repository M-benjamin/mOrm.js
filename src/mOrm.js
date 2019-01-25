
import { isEmpty } from 'lodash'
import { existsSync } from 'fs'
import PostgresSQL from './engine/postgresql'

export default class mOrm {
  configPathName = './morm.config.js'
  // async getEntity()

  async createConnection(dbConfig = {}) {
    console.log('dbConfig', dbConfig)
    console.log('element', dbConfig.entities);

    // [Student] = dbConfig.entities.name;
    // this.entities = { Student: Student }

    dbConfig.entities.forEach(element => {
      console.log(element.name)
      this.entities = {
        Student: element.name
      }
    });

    console.log('element', this.entities);


    if (typeof dbConfig == 'string') {
      // postgres://user:pass@host:port/db
      // string => object

      console.log('dbConfig', dbConfig)

      // let pattern = /^(?:([^:\/?#\s]+):\/{2})?(?:([^@\/?#\s]+)@)?([^\/?#\s]+)?(?:\/([^?#\s]*))?(?:[?]([^#\s]+))?\S*$/;

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

    const { host, port, username, pass } = this.config
    console.log(host, port, username, pass)
    console.log(this.config.type)

    switch (this.config.type) {
      case 'postgres':
        this.dbInstance = new PostgresSQL({ host, port, username, pass })
        break
    }

    await this.dbInstance.initialize()
  }
}
