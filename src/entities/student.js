export default class Student {
  static meta() {
    return {
      name: 'Student',
      columns: {
        id: {
          primary: true,
          type: 'int',
          generated: true
        },
        firstname: {
          type: 'string'
        },
        fullname: {
          type: 'string'
        }
      }
    }
  }
}