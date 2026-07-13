const express = require("express");
const config = require("./config");

const {
  getModels
} = require("./lib/models");

const {
  normalizeChunk
} = require("./lib/normalize");

const app = express();

app.use(express.json({ limit: "50mb" }));


app.get("/", (req, res) => {
  res.json({
    status: "ok",
    service: "ollama-smart-gateway"
  });
});


app.get("/v1/models", async (req, res) => {
  try {

    const models = await getModels();

    res.json({
      object: "list",
      data: models
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: err.message
    });

  }
});


app.post("/v1/chat/completions", async (req, res) => {

  try {

    const response = await fetch(
      `${config.OLLAMA_HOST}/api/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model:
            req.body.model ||
            config.MODEL,

          messages:
            req.body.messages,

          stream: false
        })
      }
    );


    const data = await response.json();


    const normalized =
          normalizeChunk(data);
    
    console.log("OLLAMA DATA:", JSON.stringify(data, null, 2));
            
    const content =
          normalized.text;


    res.json({
      id: "ollama-gateway",
      object: "chat.completion",

      choices: [
        {
          index: 0,

          message: {
            role: "assistant",
            content
          }
        }
      ]
    });


  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: err.message
    });

  }

});


app.listen(
  config.PORT,
  () => {
    console.log(
      `ollama-gateway listening on ${config.PORT}`
    );
  }
);
