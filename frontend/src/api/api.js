let backendHost
const apiPort = 7997
const apiVersion = 'v1'
const apiVersion2 = 'v2'

const hostname = window && window.location && window.location.hostname

if (hostname !== 'localhost') {
  backendHost = `http://${hostname}`
} else {
  backendHost = process.env.REACT_APP_BACKEND_HOST || 'http://localhost'
}

const API_ROOT = `${backendHost}:${apiPort}/api/${apiVersion}`
const API_ROOT2 = `${backendHost}:${apiPort}/api/${apiVersion2}`

export { API_ROOT, API_ROOT2 }
