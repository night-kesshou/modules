modules.exports = (key, val) => {
  let cookieJar = request.jar()
  let cookies = request.cookie(`${key}=${val}`)
  cookieJar.setCookie(cookies, 'http://210.70.131.56')
  return cookieJar
}
