const path = require('path')
const fs = require('fs')
const directoryPath = path.join(__dirname, '../../files')
var cors = require('cors')

module.exports = (app) => {
  app.options('/list', cors()) 
  app.get('/list', cors(), (req, res) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        res.send(500)
      }
      res.send(files.filter(x => {
        return /\.jsonl$/i.test(x)
      }).map(filename => {
        return {
          name: filename,
          basename: path.basename(filename, '.jsonl'),
          mtime: fs.statSync(directoryPath + '/' + filename).mtimeMs,
        }
      }))
    })
  })
}
