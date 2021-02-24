import CryptoJS from 'crypto-js'

export default {
  //加密
  encrypt(data, keyStr, ivStr) {
    let password = data.password
    let timeStamp = Date.now()
    let key = CryptoJS.enc.Utf8.parse(keyStr ? keyStr : 'Gbc*%fghijklmn12')
    let iv = CryptoJS.enc.Utf8.parse(ivStr ? ivStr : `wsf${timeStamp}`)
    let encrypted = CryptoJS.AES.encrypt(password, key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
    data.password = encrypted.ciphertext.toString(CryptoJS.enc.Base64)
    data.timeStamp = timeStamp
    return data
  }

  //解密
  // decrypt(word, keyStr, ivStr) {
  //   let key = CryptoJS.enc.Utf8.parse(keyStr ? keyStr : 'Gbc*%fghijklmn12')
  //   let iv = CryptoJS.enc.Utf8.parse(ivStr ? ivStr : '@bc$%fghijklmn12')
  //   let decrypt = CryptoJS.AES.decrypt(word, key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  //   return CryptoJS.enc.Utf8.stringify(decrypt).toString()
  // },
}
