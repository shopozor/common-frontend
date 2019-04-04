/**
 * base code code from https://www.w3schools.com/js/js_cookies.asp
 */

export const set = ({ cookieId, cookieValue, cookieDuration }) => {
  var d = new Date()
  d.setTime(d.getTime() + (cookieDuration * 24 * 60 * 60 * 1000))
  var expires = 'expires=' + d.toUTCString()
  document.cookie = cookieId + '=' + cookieValue + ';' + expires + ';path=/'
  // TODO: when releasing, secure the cookie
  // document.cookie = cookieId + '=' + cookieValue + ';' + expires + ';path=/;secure'
}

export const get = ({ cookieId }) => {
  var name = cookieId + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

export const del = ({ cookieId }) => {
  set({ cookieId, cookieValue: '', cookieDuration: -1 })
}
