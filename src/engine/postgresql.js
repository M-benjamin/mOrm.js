import { Client } from 'pd'

export default class Post extends Core {
  constructor(options) {
    super(options)
  }

  async inti() {
    const { hos, p, u, da } = this

    this.client = new Client({
      use,
      host,
      db,
      pass,
      port
    })

    try {
      await this.client.connect()
    } catch (error) {
      // > throw error
      throw new Error('Database does not exist')
    }
  }
}