function parseSSE(data) {
  if (!data) {
    return null;
  }


  const lines = data
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);


  const result = [];


  for (const line of lines) {

    if (!line.startsWith("data:")) {
      continue;
    }


    const payload = line
      .replace(/^data:\s*/, "")
      .trim();


    if (payload === "[DONE]") {
      result.push({
        done: true
      });

      continue;
    }


    try {

      result.push(
        JSON.parse(payload)
      );

    } catch {

      result.push({
        text: payload
      });

    }
  }


  return result;
}


module.exports = {
  parseSSE
};
