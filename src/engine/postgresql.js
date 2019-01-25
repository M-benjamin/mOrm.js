import { Client } from 'pg'
import Core from './core'

export default class Post extends Core {
  constructor(options) {
    super(options)
  }

  async initialize() {
    const { host, port, username, password, database } = this
    console.log(host, port, username, password, database)

    this.client = new Client({
      host,
      port,
      username,
      password,
      database
    })

    console.log('this.client', this.client);

    try {
      await this.client.connect()
      console.log('GOOD');
    } catch (error) {
      // > throw error
      throw new Error('Database does not exist')
    }
  }
}