
const host = process.env.REACT_APP_HOST || 'localhost'
const port = process.env.REACT_APP_PORT || 3032
export const backendURL = `http://${host}${port !== 80 ? ':' + port : ''}/api`
