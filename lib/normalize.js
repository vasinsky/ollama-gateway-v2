function normalizeChunk(chunk) {

  if (!chunk) {
    return {
      text: "",
      done: false
    };
  }


  let text = "";


  // Ollama /api/chat response
  if (
    chunk.message &&
    typeof chunk.message.content === "string"
  ) {
    text = chunk.message.content;
  }


  // OpenAI style content
  if (
    chunk.choices &&
    chunk.choices[0] &&
    chunk.choices[0].message
  ) {
    text =
      chunk.choices[0].message.content || "";
  }


  // Ollama /api/generate response
  if (
    typeof chunk.response === "string"
  ) {
    text = chunk.response;
  }


  // remove thinking blocks
  text = text
    .replace(/<thinking>[\s\S]*?<\/thinking>/g, "")
    .trim();


  return {
    text,
    done: chunk.done === true,
    raw: chunk
  };
}


module.exports = {
  normalizeChunk
};