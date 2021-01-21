const CONFIG = require('./test/config.js');
const Auth = require('./test/pageObject/auth/Auth.js')
const ReportAggregator = require('@rpii/wdio-html-reporter').ReportAggregator;
const HtmlReporter = require('@rpii/wdio-html-reporter').HtmlReporter;
const log4js = require('log4js');

exports.config = {
  specs: [
    `./test/testScripts/${CONFIG.folderTest}-test/attachment.js`,
    `./test/testScripts/${CONFIG.folderTest}-test/text.js`,
    `./test/testScripts/${CONFIG.folderTest}-test/datetime.js`,
    `./test/testScripts/${CONFIG.folderTest}-test/tabs.js`,
    `./test/testScripts/${CONFIG.folderTest}-test/alert.js`,
    `./test/testScripts/${CONFIG.folderTest}-test/textarea.js`,
    `./test/testScripts/${CONFIG.folderTest}-test/spinner.js`,
    `./test/testScripts/${CONFIG.folderTest}-test/label.js`,
    `./test/testScripts/${CONFIG.folderTest}-test/dialog.js`,
    `./test/testScripts/${CONFIG.folderTest}-test/fieldgroup.js`,
    `./test/testScripts/${CONFIG.folderTest}-test/colorpicker.js`,
    `./test/testScripts/${CONFIG.folderTest}-test/icon-button.js`,
    `./test/testScripts/${CONFIG.folderTest}-test/normalButton.js`,
    `./test/testScripts/${CONFIG.folderTest}-test/submitButton.js`,
    `./test/testScripts/${CONFIG.folderTest}-test/radio-button.js`,
    `./test/testScripts/${CONFIG.folderTest}-test/multiplechoice.js`,
    `./test/testScripts/${CONFIG.folderTest}-test/notify-popup.js`,
    `./test/testScripts/${CONFIG.folderTest}-test/checkbox.js`,
    `./test/testScripts/${CONFIG.folderTest}-test/dropdown.js`,
    `./test/testScripts/${CONFIG.folderTest}-test/table.js`,
  ],

  suites: {
    preparation: [
      './test/testScripts/preparation/importSource.js'
    ],
  },

  maxInstances: 10,
  capabilities: [{
    maxInstances: 1,
    browserName: 'chrome',
    'goog:chromeOptions': {
      // to run chrome headless the following flags are required
      // (see https://developers.google.com/web/updates/2017/04/headless-chrome)
      args: ['--headless', '--disable-gpu', 'no-sandbox', '--window-size=1920,1080'],
    },
  }],
  logLevel: 'silent',
  bail: 0,
  baseUrl: 'http://localhost',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  services: [
    'selenium-standalone',
    ['image-comparison',
      {
        baselineFolder: './resources/screen_images/baseline',
        formatImageName: '{platformName}_{tag}_{width}x{height}',
        screenshotPath: './resources/screen_images/.tmp',
        autoSaveBaseline: true,
        blockOutStatusBar: true,
        blockOutToolBar: true,
        // clearRuntimeFolder: true,
      }
    ],
  ],
  framework: 'mocha',
  reporters: ['spec',
    [HtmlReporter, {
      debug: true,
      outputDir: './reports/html-reports/',
      filename: 'report.html',
      reportTitle: 'Test Report Title',
      //to show the report in a browser when done
      showInBrowser: false,
      //to turn on screenshots after every test
      useOnAfterCommandForScreenshot: false,
      //to initialize the logger
      LOG: log4js.getLogger("default")
    }]
  ],
  mochaOpts: {
    ui: 'bdd',
    timeout: 900000
  },

  onPrepare: function (config, capabilities) {
    let reportAggregator = new ReportAggregator({
      outputDir: './reports/html-reports/',
      filename: 'master-report.html',
      reportTitle: 'Master Report',
    });
    reportAggregator.clean() ;

    global.reportAggregator = reportAggregator;
  },

  onComplete: function(exitCode, config, capabilities, results) {
    (async () => {
      await global.reportAggregator.createReport( {
        config: config,
        capabilities: capabilities,
        results : results
      });
    })();
  },

  // before() {
  //   browser.setWindowSize(1440, 900);
  // },

  beforeSuite() {
    Auth.login()
    // should pause for test grid loaded
    browser.pause(3000)
  },

  afterSuite() {
    Auth.logout()
  },

  afterTest: function (test) {
    const path = require('path');
    const moment = require('moment');

    // if test passed, ignore, else take and save screenshot.
    if (test.passed) {
      return;
    }
    const timestamp = moment().format('YYYYMMDD-HHmmss.SSS');
    const filepath = path.join('reports/html-reports/screenshots/', timestamp + '.png');
    browser.saveScreenshot(filepath);
    process.emit('test:screenshot', filepath);
  },
};
