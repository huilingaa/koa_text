import service from '@/utils/request'

//社团注册申请表
export function clubApplicationUploadPost(req) {
  return service({
    url: '/clubApplication/upload',
    method: 'post',
    headers: { 'content-type': 'multipart/form-data' },
    data: req,
  })
}

//社团注册申请信息
export function clubApplicationApplyForGet(req) {
    return service({
      url: '/clubApplication/applyFor',
      method: 'get',
      params: req,
    })
}

//社团注册申请信息
export function clubApplicationVerifyPost(req) {
    return service({
      url: '/clubApplication/verify',
      method: 'post',
      data: req,
    })
}