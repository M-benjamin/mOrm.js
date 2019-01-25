import mOrm from './mOrm'
import Student from './entities/student'
// import Project from './entities/project'
// import Note from './entities/note'

// Let's Rock!
(async () => {
  const orm = new mOrm()

  try {
    await orm.createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'efrei-paris',
      password: '',
      database: 'db_postgres',
      synchronize: true,
      entities: [
        Student
        // Project,
        // Note
      ]
    })

    // or:
    // orm.createConnection('postgres://efrei-paris:@localhost:5432/db_postgres')
    console.log('INSIDE')
  } catch (err) {
    console.log(err)
    process.exit(-1)
  }
})()