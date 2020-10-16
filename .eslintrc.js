module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'new-cap': 0,
    eqeqeq: 0,
    camelcase: 0,
    indent: ['error', 2]
  },
  globals: {
    _: true,
    devEnv: true,
    moment: true,
    ObjectId: true
  }
}
