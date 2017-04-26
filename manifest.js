const dotEnv = require('dotenv')
const Path = require('path')

let mongoURI
if (process.env.NODE_ENV === 'test') {
  if (process.env.HEROKU_TEST_RUN_ID) { mongoURI = process.env.MONGODB_URI }
  else { mongoURI = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/exquisite-test'}
} else {
  mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/exquisite-corpse'
}

if (process.env.NODE_ENV !== 'production') {
  dotEnv.config()
}

console.log(`Mongo Connecting using ${mongoURI}`);
console.log(`TEST IS ${process.env.HEROKU_TEST_RUN_ID}`);

const manifest = {
  connections: [
    {
      port: process.env.PORT || 8000,
      host: process.env.HOST || '0.0.0.0',
      labels: ['web'],
      routes: {
        cors: {
          origin: ['*'],
          credentials: true,
        },
        files: {
          relativeTo: Path.join(__dirname, 'client/build'),
        },
      },
    },
  ],
  registrations: [
    { plugin: 'inert' },
    { plugin: 'vision' },
    {
      plugin: {
        register: 'hapi-mongodb',
        options: {
          url: mongoURI,
          settings: {
            db: {
              native_parser: false,
            },
          },
          decorate: true,
        },
      },
    },
    { plugin: './server/auth' },
    {
      plugin: {
        register: 'nes',
        options: {
          auth: {
            type: 'token',
            isSecure: false,
            isHttpOnly: false,
            index: true,
          },
        },
      },
    },
    { plugin: './server/corpses' },
    { plugin: './server/drawings' },
    { plugin: './server/corpseDrawings' },
    { plugin: './server/lobby' },
    { plugin: './server/users' },
    { plugin: './server/client' },
    {
      plugin: {
        register: './server/corpseCleaner',
        options: {
          interval: 10 * 60000,
          cleaner: {
            guestWindow: 2 * 60 * 60000,
            memberWindow: 24 * 60 * 60000,
          }
        }
      },
    },
  ],
}

// DEV TOOLS
if (process.env.NODE_ENV !== 'test') {
  // Good
  manifest.registrations.push({
    plugin: {
      register: 'good',
      options: {
        reporters: {
          console: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{
              response: '*',
              log: '*',
            }],
          }, {
            module: 'good-console',
          }, 'stdout'],
        },
      },
    },
  })
  // Swagger
  manifest.registrations.push({
    plugin: {
      register: 'hapi-swagger',
      swaggerOptions: {
        info: {
          title: 'Exquisite Corpse API Documentation',
        },
      },
    },
  })
}

module.exports = manifest
