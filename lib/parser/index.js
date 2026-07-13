const { parseJSON } = require("./json");
const { parseSSE } = require("./sse");

function parseRequest(body) {
  return {
    model: body.model,
    messages: body.messages || [],
    stream: body.stream !== false,
    options: body.options || {}
  };
}


function parseChunk(data) {
  if (!data) {
    return null;
  }

  if (typeof data === "string") {
    return parseSSE(data);
  }

  return parseJSON(data);
}


module.exports = {
  parseRequest,
  parseChunk
};
