exports.config = {
  capabilities: {
    'browserName': 'chrome'
  },
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['test.js'],

  framework: 'mocha',
  mochaOpts: {
    reporter: "spec",
    enableTimeouts: false,
    bail: true
  }
};
