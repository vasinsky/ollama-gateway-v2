const config = require("../config");

function detectModel(model = "") {

    const name = model.toLowerCase();

    if (name.includes("qwen")) {
        return {
            name: "qwen",
            ...config.MODEL_RULES.qwen
        };
    }

    if (name.includes("gemma")) {
        return {
            name: "gemma",
            ...config.MODEL_RULES.gemma
        };
    }

    if (name.includes("deepseek")) {
        return {
            name: "deepseek",
            ...config.MODEL_RULES.deepseek
        };
    }

    return {

        name: "generic",

        thinking: true,

        xml: true

    };

}

function supportsThinking(model) {

    return detectModel(model).thinking;

}

function supportsXml(model) {

    return detectModel(model).xml;

}

module.exports = {

    detectModel,

    supportsThinking,

    supportsXml

};
