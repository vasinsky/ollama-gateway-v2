class ParserState {
  constructor() {
    this.buffer = "";
    this.thinking = false;
    this.content = "";
  }


  reset() {
    this.buffer = "";
    this.thinking = false;
    this.content = "";
  }


  append(data) {
    this.buffer += data;
  }


  setThinking(value) {
    this.thinking = value;
  }


  addContent(text) {
    this.content += text;
  }
}


module.exports = ParserState;
