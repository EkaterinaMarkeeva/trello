export default class State {
  constructor() {
    this.lists = {
      'todo': [],
      'progress': [],
      'done': []
    };
    
}

  static from(object) {
    if (object) {
      return {
        lists: object.lists,
      }
    }

    return null;
  }
}
