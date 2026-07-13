function emitToken(text, handlers = {}) {
  if (!text) {
    return;
  }


  if (handlers.onToken) {
    handlers.onToken(text);
  }


  if (handlers.onText) {
    handlers.onText(text);
  }
}


function emitDone(handlers = {}) {

  if (handlers.onDone) {
    handlers.onDone();
  }

}


function emitError(error, handlers = {}) {

  if (handlers.onError) {
    handlers.onError(error);
  }

}


module.exports = {
  emitToken,
  emitDone,
  emitError
};
