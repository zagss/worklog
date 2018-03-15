export const GetUrl = () => {
  var url = (location.hash).slice(2).split('?')
  var theRequest = {}
  theRequest.host = url[0].split('/').join('.')
  theRequest.params = url[1]
  // var leng = url[0].split('/').length
  theRequest.local = url[0].split('/')[2]
  return theRequest
}
