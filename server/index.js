const express = require('express')
const app = express()
const host = process.env.REACT_APP_HOST || 'locahost'
const port = parseInt(process.env.REACT_APP_PORT) || 3032

// requiring path and fs modules
const path = require('path')
const fs = require('fs')

app.use('/', express.static(path.join(__dirname, '../build')))

app.use(express.json({
  limit: '150mb',
  extended: true
}))

// joining path of directory 
const directoryPath = path.join(__dirname, 'handles')
// passsing directoryPath and callback function
const files = fs.readdirSync(directoryPath)
const apiRouter = express.Router()
files.forEach(function (file) {
  if (path.extname(file) === '.js') {
    const handle = require(directoryPath + '/' + file)
    handle(apiRouter)
  }
})
app.use('/api', apiRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://${host}:${port}`)
})
