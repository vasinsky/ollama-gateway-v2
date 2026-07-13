module.exports = {
  PORT: process.env.PORT || 11435,

  OLLAMA_HOST:
    process.env.OLLAMA_HOST ||
    "http://localhost:11434",

  MODEL:
    process.env.OLLAMA_MODEL ||
    "qwen3.5-dev:latest",

  DEBUG:
    process.env.DEBUG === "true"
};
