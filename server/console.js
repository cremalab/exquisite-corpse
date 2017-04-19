const repl = require('repl')
const MongoClient = require('mongodb').MongoClient
const compose = require('../serverComposer')

const mongoURI = process.env.NODE_ENV === 'test' ?
  'mongodb://localhost:27017/exquisite-test' :
  'mongodb://localhost:27017/exquisite-corpse'

const migrations = {
}

function runMigration(db, name) {
  return migrations[name](db)
}

MongoClient.connect(process.env.MONGODB_URI || mongoURI, function(err, db) {
  console.log("Connected successfully to server, starting console...");
  compose().then((server) => {
    const r = repl.start({ prompt: '> '})
    Object.defineProperty(r.context, 'db', {
      configurable: false,
      enumerable: true,
      value: db,
    })
    Object.defineProperty(r.context, 'server', {
      configurable: false,
      enumerable: true,
      value: server,
    })

    r.defineCommand('runMigration', {
      help: 'Runs a migration on the DB',
      action(name) {
        runMigration(db, name).then((msg) => {
          console.log(msg)
          this.displayPrompt()
        })
      }
    })

    r.defineCommand('migrations', {
      help: 'Lists available migrations',
      action() {
        console.log(Object.keys(migrations))
        this.displayPrompt()
      }
    })
  })

})
