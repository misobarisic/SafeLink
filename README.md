<h1 align="center">Welcome to SafeLink 👋</h1>
<p>
  <a href="https://github.com/misobarisic/SafeLink/blob/main/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

[SafeLink](https://misobarisic.com/go/safelink) is an open-source link "shortener"

What makes SafeLink stand out is its lack of a **database**. It is 100% frontend (client side).

### Advantages:

- Your links **cannot be deleted**
- The server hosting SafeLink (including any fork using the same encode process) have **no access** to your data
- Your link will be accessible **forever**
- Links are decoded on your device
- [AES256](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) + [Base64](https://en.wikipedia.org/wiki/Base64)
  encoding

## How it works

When you click on "Generate URL", SafeLink generates a link based on your input: `link.misobarisic.com/<your data>`

When you open a link, SafeLink reads and decodes whatever comes after the first `/` upon which you are redirected to
their respective destination.

## HTTP REST

SafeLink links can be easily created or read with a HTTP GET request:

Make sure to use `x-www-form-urlencoded` to pass data.

The accept header should include `application/json` or `*/*`.

`data` refers to the original (redirect) URL, whereas
`link` refers to the part of the URL after `link.misobarisic.com/`

### Encode

```javascript
GET / api / encode
Body
should
contain: data

Example
response:
{
  "data"
:
  "https://github.com",
          "link"
:
  "dGhpcyBpcyBhbiBleGFtcGxl"
} 
```

### Encode with password

```javascript
GET / api / encode
Body
should
contain: data, password

// Password is not sent back in the response
Example
response:
{
  "data"
:
  "this is an example",
          "link"
:
  "dGhpcyBpcyBhbiBleGFtcGxl"
} 
```

### Decode

```javascript
GET / api / decode
Body
should
contain: link

Example
response:
{
  "data"
:
  "another example",
          "link"
:
  "YW5vdGhlciBleGFtcGxl"
}
```

## Forks

If you wish for all SafePaste links to be accessible on your fork of this project make sure not to edit these fields

`config.js`

``` javascript
module.exports.base = {
    key: "safepaste"
}
```

`utils/urlUtils.js`

```javascript
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

```

## Deploy your own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/misobarisic/safelink/)

## Author

👤 **Mišo Barišić**

* Website: https://www.misobarisic.com
* GitHub: [@misobarisic](https://github.com/misobarisic)

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [misobarisic](https://github.com/misobarisic).<br />
This project is [MIT](https://github.com/misobarisic/SafeLink/blob/main/LICENSE) licensed.
