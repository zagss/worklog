const isDev = process.env.NODE_ENV === 'development'
let baseUrl = ''
if (location.host === 'fintech-demo.la-feng.com') {
  baseUrl = 'https://api-demo.la-feng.com'
} else if (location.host === 'fintech-admin1.la-feng.com') {
  baseUrl = 'https://api-demo1.la-feng.com'
} else if (location.host === 'fintech-admin2.la-feng.com') {
  baseUrl = 'https://api-demo2.la-feng.com'
} else if (location.host === 'fintech-admin3.la-feng.com') {
  baseUrl = 'https://api-demo3.la-feng.com'
} else {
  baseUrl = 'https://api-test.la-feng.com'
}

export default {
  host: baseUrl,
  qiniu: 'http://xxxx.clouddn.com/',
  local: location
}