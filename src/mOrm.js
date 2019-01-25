
import { isEmpty } from 'lodash'
import { existsSync } from 'fs'

export default class mOrm {
  configPathName = './morm.config.js'


  async createConnection(dbConfig = {}) {
    if (typeof dbConfig == 'string') {
      // postgres://user:pass@host:port/db
      // string => object
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

    switch (this.config.type) {
      case 'postgres':
        this.dbInstance = new PostgresSQL({ host, port, username, pass })
        break
    }
  }
}
