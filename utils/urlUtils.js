const aes256 = require("aes256")
const base64 = require("base-64")
const {key, passphrase} = require("../config").base

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
module.exports.generateURLwithPass = (input, pass) => {
    if (input) {
        if (input.startsWith("https://") || input.startsWith("http://")) {
            return base64.encode(aes256.encrypt(key, base64.encode(aes256.encrypt(pass, input)) + passphrase))
        } else if (input.startsWith("http://") || !input.startsWith("https://")) {
            return base64.encode(aes256.encrypt(key, base64.encode(aes256.encrypt(pass, `https://${input}`)) + passphrase))
        }
    } else {
        return ""
    }
}
module.exports.decodeURL = (input, pass) => {
    if (input) {
        try {
            return aes256.decrypt(pass || key, base64.decode(input))
        } catch (e) {
            return ""
        }
    } else return ""
}
