class History {
  constructor(limit = 50) {
    this.limit = limit;
    this.items = [];
  }


  add(message) {
    this.items.push(message);

    if (this.items.length > this.limit) {
      this.items.shift();
    }
  }


  get() {
    return this.items;
  }


  clear() {
    this.items = [];
  }


  size() {
    return this.items.length;
  }
}


module.exports = History;
