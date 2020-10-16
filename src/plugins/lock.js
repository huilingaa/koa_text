const crypto = require('crypto')
const key = 'xstxxstxxstxxstx'
const iv = Buffer.from('chirenmengtoxstx', 'utf8')

// AES-128-CBC加密模式,key为16位
function Encrypt (data) {
  const cipher = crypto.createCipheriv('aes-128-cbc', key, iv)
  let crypted = cipher.update(data, 'utf8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}

function Decrypt (encrypted) {
  const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv)
  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

module.exports = {
  Encrypt,
  Decrypt
}
