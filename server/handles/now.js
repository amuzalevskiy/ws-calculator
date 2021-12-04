var cors = require('cors')

module.exports = (app) => {
  app.options('/now', cors()) 
  app.get('/now', cors(), (req, res) => {
    res.send(200, Date.now())
  })
}
