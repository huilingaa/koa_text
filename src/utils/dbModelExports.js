const fs = require('fs')
const moduleExports = {}
const filesData = fs.readdirSync('src/model')

filesData.map(item => {
  if (item !== '.DS_Store') {
    const name = item.split('.')[0]
    moduleExports[name] = require(`../model/${item}`)
  }
})

module.exports = moduleExports
