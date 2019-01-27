export const dump = (is_uri = false, host, port, username, password, database) => {
  if (is_uri) {
    console.log(`Database connection :
        host: ${host}
        port: ${port}
        username: ${username}
        password: ${password}
        database: ${database}
      `)
  }
}
