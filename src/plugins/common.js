const fs = require('fs')

// 判断接收的所有数据是否为空
function isReceiveEmptys (...arr) {
  let isEmpty = false
  arr.map(item => {
    if (item === 0) return
    if (_.isNaN(item) || _.isNil(item) || item == '') isEmpty = true
    if (_.isString(item) && item.trim() == '') isEmpty = true
  })
  return isEmpty
}

function getCtxIp (ctxIp) {
  let matchIp = null
  try {
    matchIp = ctxIp.match(/\d+\.\d+\.\d+\.\d+/)[0]
  } catch {
    matchIp = '127.0.0.1'
  }
  return matchIp
}

// 上传文件，分类更种文件类型 filew 文件流，url 存储文件，fileName文件名称，可不传
function setUpload (file, url, fileName) {
  const path = `./uploads/${url}/`
  const status = fs.existsSync(path)
  if (!status) {
    fs.mkdirSync(path) // 创建目录， 默认权限0777
  }
  // 创建可读流 -> 获取扩展名 -> 创建可写流 -> 写入可写流
  const reader = fs.createReadStream(file.path)
  const ext = file.name.split('.').pop()
  const filePath = `./${url}/${new Date().getTime()}${fileName || 'null'}.${ext}`
  const upStream = fs.createWriteStream(filePath)
  reader.pipe(upStream)
  return filePath.substr(1)
}

module.exports = {
  isReceiveEmptys,
  getCtxIp,
  setUpload
}
