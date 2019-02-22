const jwtDecode = require('jwt-decode')
// import { duration } from 'moment'

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InByb2R1Y3RldXJAYnVkem9ucy5jaCIsImV4cCI6MTU1MjcxODMzMiwib3JpZ0lhdCI6MTU1MDEyNjMzMn0.LyUN4W7XIPbz6ZOUWzVyZYUOi726sQZGb6SuwLjNYbU'
const decodedToken = jwtDecode(token)
console.log('decoded = ', decodedToken)
// return duration(decodedToken.exp - decodedToken.origIat, 'seconds')
