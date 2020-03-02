// https://jstopics.com/javascript/javascript-include-file
const CryptoJS = require('crypto-js')

const encrypt = (msg, pass) => {
  const keySize = 256
  const iterations = 100
  const salt = CryptoJS.lib.WordArray.random(128 / 8)

  const key = CryptoJS.PBKDF2(pass, salt, {
    keySize: keySize / 32,
    iterations
  })

  const iv = CryptoJS.lib.WordArray.random(128 / 8)

  const encrypted = CryptoJS.AES.encrypt(msg, key, {
    iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
  })

  const transitmessage = salt.toString() + iv.toString() + encrypted.toString()
  return transitmessage
}

export default encrypt
