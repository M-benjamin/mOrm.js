export default class Note {
  static meta() {
    return {
      name: 'Note',
      columns: {
        id: {
          primary: true,
          type: 'int',
          generated: true
        },
        note: {
          type: 'decimal'
        }
      }
    }
  }
}