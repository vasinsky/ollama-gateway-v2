function normalizeChunk(chunk) {

  if (!chunk) {
    return {
      text: "",
      done: false
    };
  }


  if (chunk.done === true) {
    return {
      text: "",
      done: true
    };
  }


  let text = "";


  if (chunk.message) {

    text =
      chunk.message.content ||
      "";

  }


  if (chunk.response) {

    text =
      chunk.response;

  }


  if (chunk.content) {

    text =
      chunk.content;

  }


  return {
    text,
    done: false,
    raw: chunk
  };
}


module.exports = {
  normalizeChunk
};
