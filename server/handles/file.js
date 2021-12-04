const path = require('path')
const fs = require('fs')
var lockfile = require('proper-lockfile')
var { default: produce, applyPatches, enablePatches } = require('immer')
enablePatches()

const directoryPath = path.join(__dirname, '../../files')
var cors = require('cors')

const lockFileOpts = {
  retry: {
    retries: 10,
    factor: 2,
    minTimeout: 1,
    maxTimeout: 100,
  }
}

module.exports = (app) => {
  app.options('/file/:name', cors())
  app.get('/file/:name', cors(), (req, res) => {
    const filename = path.join(directoryPath, req.params.name + '.jsonl')
    const main = () => {
      res.setHeader('Content-Type', 'text/plain')
      const stream = fs.createReadStream(filename, 'utf8')
      stream.pipe(res)
      stream.on('end', () => {
        lockfile.unlock(filename).then(() => {})
      })
    }
    lockfile.lock(filename, lockFileOpts)
      .then(main)
      .catch((err) => {
        res.status(404).send(err.message)    
      })
  })
  app.post('/file/:name', cors(), (req, res) => {
    if (!req.body) {
      throw new Error('No data provided')
    }
    const name = req.params.name
    const content = req.body

    writeFile(name, content, res)
  })
  
  app.options('/file/:name/export', cors())
  app.get('/file/:name/export', cors(), (req, res) => {
    const name = req.params.name
    res.setHeader('Content-disposition', `attachment; filename=${name}.json`)
    res.setHeader('Content-type', 'application/json')
    const filename = path.join(directoryPath, name + '.jsonl')
    const main = () => {
      fs.readFile(filename, { encoding: 'utf-8' }, (err, content) => {
        lockfile.unlock(filename).then(() => {})
        if (!err) {
          const patches = content.split('\n')
          let jsonObj = {}
          
          for (let i = 1; i < patches.length; i++) {
            const patch = JSON.parse(patches[i])

            switch (patch.action) {
              case 'modify':
                jsonObj = applyPatches(jsonObj, patch.payload)
                break
              default:
                throw new Error('Unknown operation')
            }
          }

          jsonObj = { ...jsonObj, slots: { ...jsonObj.slots } }

          if (req.query.excludeDesign === 'true') {
            console.log('remove design')
            delete jsonObj.slots.design
          }

          res.send(JSON.stringify(jsonObj, null, 4))
        }
      })
    }
    lockfile.lock(filename, lockFileOpts)
    .then(main)
    .catch(() => {
      res.status(500).send('Lockfile failed')
    })
  })

  app.options('/file/:name/prune', cors())
  app.get('/file/:name/prune', cors(), (req, res) => {
    const name = req.params.name
    const filename = path.join(directoryPath, name + '.jsonl')
    const main = () => {
      fs.readFile(filename, { encoding: 'utf-8' }, (err, content) => {
        lockfile.unlock(filename).then(() => {})
        if (!err) {
          const patchesBefore = content.split('\n')
          let patchesAfter
          
          produce({}, (draft) => {
            // skip empty line at the start of file
            for (let i = 1; i < patchesBefore.length; i++) {
              const patch = JSON.parse(patchesBefore[i])
              switch (patch.action) {
                case 'modify':
                  draft = applyPatches(draft, patch.payload)
                  break
                default:
                  throw new Error('Unknown operation')
              }
            }
          }, (patches) => {
            patchesAfter = patches
          })
          writeFile(name, patchesAfter, res, true, 'w')
        }
      })
    }
    lockfile.lock(filename, lockFileOpts)
      .then(main)
      .catch(() => {
        res.status(500).send('Lockfile failed')
      })
  })

  app.options('/file/:name/clone', cors())
  app.post('/file/:name/clone', cors(), (req, res) => {
    const name = req.params.name
    const filename = path.join(directoryPath, name + '.jsonl')
    if (!/^[a-z0-9_-]{5,}$/.test(req.body.name)) {
      res.send({ error: 'Filename must contain a-z, 0-9, "_", "-" symbols and length should be at least at least 5' })
      return
    }
    const filenameToCreate = path.join(directoryPath, req.body.name + '.jsonl')
    
    const main = () => {
      fs.readFile(filename, { encoding: 'utf-8' }, (err, content) => {
        lockfile.unlock(filename).then(() => {})
        if (!err) {
          // eslint-disable-next-line node/no-deprecated-api
          fs.exists(filenameToCreate, (exists) => {
            if (exists) {
              res.send({ error: `file ${req.body.name} exists` })
              return
            }
            fs.writeFile(filenameToCreate, content, (err) => {
              if (err) {
                res.send({ error: `failed to write file ${req.body.name}` })
                return
              }
              res.send({
                error: null
              })
            })
          })
          // fs.writeFile()
        }
      })
    }
    lockfile.lock(filename, lockFileOpts)
      .then(main)
      .catch(() => {
        res.status(500).send('Lockfile failed')
      })
  })

  app.options('/file/:name/archive', cors())
  app.post('/file/:name/archive', cors(), (req, res) => {
    const name = req.params.name
    const filename = path.join(directoryPath, name + '.jsonl')
    const nextFilename = path.join(directoryPath, '_' + name + '.jsonl')
    // eslint-disable-next-line node/no-deprecated-api
    fs.exists(filename, (exists) => {
      if (exists) {
        fs.rename(filename, nextFilename, (err) => {
          if (err) {
            res.status(500).send(err.message)
          }
          res.send({
            error: null
          })  
        })
      } else {
        res.status(500).send('File absent')
      }
    })
  })

  app.options('/file/:name/unarchive', cors())
  app.post('/file/:name/unarchive', cors(), (req, res) => {
    const name = req.params.name
    const filename = path.join(directoryPath, name + '.jsonl')
    const nextFilename = path.join(directoryPath, name.substr(1) + '.jsonl')
    // eslint-disable-next-line node/no-deprecated-api
    fs.exists(filename, (exists) => {
      if (exists) {
        fs.rename(filename, nextFilename, (err) => {
          if (err) {
            res.status(500).send(err.message)
          }
          res.send({
            error: null
          })  
        })
      } else {
        res.status(500).send('File absent')
      }
    })
  })
}

function writeFile(name, content, res, hasLock = false, flag = 'a') {
  const filename = path.join(directoryPath, name + '.jsonl')
  const main = () => {
    fs.writeFile(
      filename,
      '\n' + JSON.stringify({ action: 'modify', at: new Date(), payload: content }),
      { encoding: 'utf8', flag },
      (err) => {
        lockfile.unlock(filename).then(() => { })
        if (err) {
          res.send({ error: err.message })
        }
        res.send({ error: null })
      }
    )
  }
  if (!hasLock) {
    lockfile.lock(filename, lockFileOpts)
      .then(main)
      .catch(() => {
        // eslint-disable-next-line node/no-deprecated-api
        fs.exists(filename, (exists) => {
          if (exists) {
            res.status(500).send('Lockfile failed')
          } else {
            // add new file
            main()
          }
        })
      })
  } else {
    main()
  }
}
