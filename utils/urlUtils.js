const aes256 = require("aes256")
const base64 = require("base-64")
const {key} = require("../config").base
module.exports.generateURL = input => {
    if (input) {
        if (input.startsWith("https://") || input.startsWith("http://")) {
            return base64.encode(aes256.encrypt(key, input))
        } else if (input.startsWith("http://") || !input.startsWith("https://")) {
            return base64.encode(aes256.encrypt(key, `https://${input}`))
        }
    } else {
        return ""
    }
}
module.exports.decodeURL = input => {
    return input ? aes256.decrypt(key, base64.decode(input)) : "";
}
