function parseJSON(data) {
  if (!data) {
    return null;
  }


  if (typeof data === "object") {
    return data;
  }


  try {

    return JSON.parse(data);

  } catch (err) {

    return {
      text: String(data)
    };

  }
}


module.exports = {
  parseJSON
};
