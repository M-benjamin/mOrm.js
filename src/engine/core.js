
export default class Core {
  constructor({ host, port, username, password, database, entities }) {
    this.host = host;
    this.port = port;
    this.username = username;
    this.password = password;
    this.database = database;
    this.entities = entities;
  }

  dump(is_uri = true) {
    console.log(`Database informations :
      host: ${this.host}
      port: ${this.port}
      username: ${this.username}
      password: ${this.password}
      database: ${this.database}
      is_uri: ${is_uri}
    `);
  }
}
