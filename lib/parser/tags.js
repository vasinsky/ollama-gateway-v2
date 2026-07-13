const THINK_TAGS = [
  ["<think>", "</think>"],
  ["<thinking>", "</thinking>"],
  ["<analysis>", "</analysis>"]
];


function removeThinkingTags(text) {
  if (!text) {
    return "";
  }

  let result = text;

  for (const [start, end] of THINK_TAGS) {
    const regex = new RegExp(
      start.replace(/[<>]/g, "\\$&") +
      "[\\s\\S]*?" +
      end.replace(/[<>]/g, "\\$&"),
      "g"
    );

    result = result.replace(regex, "");
  }

  return result.trim();
}


function isThinkingStart(text) {
  return THINK_TAGS.some(
    ([start]) => text.includes(start)
  );
}


function isThinkingEnd(text) {
  return THINK_TAGS.some(
    ([, end]) => text.includes(end)
  );
}


module.exports = {
  THINK_TAGS,
  removeThinkingTags,
  isThinkingStart,
  isThinkingEnd
};
