const crypto = require("crypto");

function safeJsonParse(text) {
    try {
        return {
            ok: true,
            value: JSON.parse(text)
        };
    } catch {
        return {
            ok: false,
            value: null
        };
    }
}

function estimateTokens(value) {

    if (!value) return 0;

    const text =
        typeof value === "string"
            ? value
            : JSON.stringify(value);

    return Math.ceil(text.length / 4);
}

function trimEmpty(value) {

    if (!value) return "";

    return value
        .split("\n")
        .map(v => v.trimEnd())
        .join("\n")
        .trim();
}

function createChatId() {

    return "chatcmpl-" +
        crypto.randomBytes(12).toString("hex");

}

function unixTime() {

    return Math.floor(Date.now() / 1000);

}

function uuid() {

    return crypto.randomUUID();

}

function now() {

    return Date.now();

}

function elapsed(start) {

    return Date.now() - start;

}

function isObject(value) {

    return (
        value !== null &&
        typeof value === "object" &&
        !Array.isArray(value)
    );

}

function clamp(value, min, max) {

    return Math.max(min, Math.min(max, value));

}

function isEmpty(value) {

    if (value === null || value === undefined)
        return true;

    if (typeof value === "string")
        return value.trim() === "";

    if (Array.isArray(value))
        return value.length === 0;

    if (isObject(value))
        return Object.keys(value).length === 0;

    return false;

}

module.exports = {

    safeJsonParse,

    estimateTokens,

    trimEmpty,

    createChatId,

    unixTime,

    uuid,

    now,

    elapsed,

    isObject,

    clamp,

    isEmpty

};
