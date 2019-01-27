export default class Project {
  static meta() {
    return {
      name: 'Project',
      columns: {
        id: {
          primary: true,
          type: 'int',
          generated: true
        },
        name: {
          type: 'string'
        }
      }
    }
  }
}