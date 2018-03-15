import a from '../../static/jsencrypt.min.js'

export const PUBKEY = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDNZgbtdLKnOUfr1iZGbKjpbLIkAbh8Wx3VKEGtSbUVPEok8erjvS+OEIwg3d9dOzNPNhqPYwZeSI3imjrmwyYB1xfXhF7F25jPg+NGfesPVJJz7QwGSUKV/RQARiFBL2hMbDu7z3G5lyJTsu8VS1Y2FIKHr+6cFeNKujw/uibx3QIDAQAB'
export const encrypt = (password) => {
  var JSEncrypt = a.JSEncrypt
  var encrypt = new JSEncrypt()
  encrypt.setPublicKey(PUBKEY)
  var encrypted = encrypt.encrypt(password)
  return encrypted
}
