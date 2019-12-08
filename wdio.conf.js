const CONFIG = require('./test/config.json')
exports.config = {
  specs: [

    //Fro running test scipt
    `./test/testScripts/${CONFIG.folderTest}-test/text.js`,
  ],

  suites: {
    preparation: [
      './test/testScripts/preparation/importSource.js'
    ],
  },

  maxInstances: 10,
  //Server Info for Chrome
  host: 'localhost',
  port: 9515,
  path: '/',

  //Testing Browser Info
  capabilities: [{
    maxInstances: 5,
    browserName: 'chrome',
    'goog:chromeOptions': {
      // to run chrome headless the following flags are required
      // (see https://developers.google.com/web/updates/2017/04/headless-chrome)
      args: ['--headless', '--disable-gpu', 'no-sandbox'],
    },
    proxy: {
      proxyType: 'autodetect'
    }
  }],
  reporters: 'spec',

  services: ['chromedriver'],
  sync: true,
  deprecationWarnings: false,

  //Testing Framework Info
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 900000, //10 minutes
  },
  logLevel: 'silent'
};