// 判断接收的所有数据是否为空
// function isReceiveEmptys (...arr) {
//   let isEmpty = false
//   arr.map(item => {
//     if (item == 0) return
//     if (_.isNaN(item) || _.isNil(item) || item == '') isEmpty = true
//     if (_.isString(item) && item.trim() == '') isEmpty = true
//   })
//   return isEmpty
// }

function getReqIp (req) {
  const reqIp =
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress
  let matchIp = null
  try {
    matchIp = reqIp.match(/\d+\.\d+\.\d+\.\d+/)[0]
  } catch {
    matchIp = '127.0.0.1'
  }
  return matchIp
}

module.exports = {
  // isReceiveEmptys,
  getReqIp
}
