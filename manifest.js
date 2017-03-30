const dotEnv = require('dotenv')
const Path = require('path')

if (process.env.NODE_ENV !== 'production') {
  dotEnv.config()
}

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
          relativeTo: Path.join(__dirname, 'public/build'),
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
          url: process.env.MONGODB_URI || 'mongodb://localhost:27017/exquisite-corpse',
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
          },
        },
      },
    },
    { plugin: './server/corpses' },
    { plugin: './server/drawings' },
    { plugin: './server/corpseDrawings' },
    { plugin: './server/lobby' },
    { plugin: './server/client' },
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
