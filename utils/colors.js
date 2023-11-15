const red = (string) => `\x1b[31m${string}\x1b[0m`;
const green = (string) => `\x1b[32m${string}\x1b[0m`;
const blue = (string) => `\x1b[34m${string}\x1b[0m`;
const magenta = (string) => `\x1b[35m${string}\x1b[0m`;


module.exports = { red, green, blue, magenta };