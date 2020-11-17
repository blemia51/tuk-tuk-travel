const saisonId = 24
let requestURL = null
let baseURL = null
let baseRoot = null

const conf = {
  facebookAppId: '339459113146953',
  apiVersion: 'v1',
}

switch (process.env.NODE_ENV) {
  case 'local':
    baseURL = 'localhost/api'
    requestURL = `http://${baseURL}`
    baseRoot = 'http://localhost'
    break
  case 'development':
    baseURL = 'localhost/api'
    requestURL = `https://${baseURL}`
    baseRoot = 'https://competitions.dev.ffr.nextmap.io'
    break
  case 'preproduction':
    baseURL = 'pp.competitions.ffr.fr/2020-2021/api'
    requestURL = `https://${baseURL}`
    baseRoot = 'https://pp.competitions.ffr.fr'
    break
  case 'production':
    baseURL = 'competitions.ffr.fr/2020-2021/api'
    requestURL = `https://${baseURL}`
    baseRoot = 'https://competitions.ffr.fr'
    conf.facebookAppId = '753881258133291'
    break
  default:
    baseURL = 'competitions.dev.ffr.nextmap.io/api'
    requestURL = `https://${baseURL}`
}

conf.requestURL = requestURL
conf.baseURL = baseURL
conf.saisonId = saisonId
conf.baseRoot = baseRoot

export default conf
