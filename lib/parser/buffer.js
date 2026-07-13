const {
  THINK_TAGS
} = require("./tags");


class StreamBuffer {
  constructor() {
    this.buffer = "";
    this.thinking = false;
  }


  push(chunk) {
    this.buffer += chunk;

    let output = "";


    while (this.buffer.length > 0) {

      if (!this.thinking) {

        const start = THINK_TAGS.find(
          ([open]) =>
            this.buffer.includes(open)
        );


        if (start) {
          const index =
            this.buffer.indexOf(start[0]);

          output +=
            this.buffer.slice(0, index);

          this.buffer =
            this.buffer.slice(
              index + start[0].length
            );

          this.thinking = true;

          continue;
        }


        output += this.buffer;
        this.buffer = "";

      } else {

        const end = THINK_TAGS.find(
          ([, close]) =>
            this.buffer.includes(close)
        );


        if (end) {

          const index =
            this.buffer.indexOf(end[1]);

          this.buffer =
            this.buffer.slice(
              index + end[1].length
            );

          this.thinking = false;

          continue;

        }


        this.buffer = "";
      }
    }


    return output;
  }


  flush() {
    const result = this.buffer;
    this.buffer = "";
    return result;
  }
}


module.exports = StreamBuffer;
