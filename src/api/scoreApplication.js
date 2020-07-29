import service from '@/utils/request'

// 社团得分申请
export function scoreApplicationUploadPost(req) {
    return service({
        url: '/scoreApplication/upload',
        method: 'post',
        headers: { 'content-type': 'multipart/form-data' },
        data: req,
    })
}

// 社团得分申请列表
export function scoreApplicationGet(req) {
    return service({
        url: '/scoreApplication/query',
        method: 'get',
        params: req
    })
}

// 社团得分申请列表删除
export function scoreApplicationDeletePost(req) {
    return service({
        url: '/scoreApplication/delete',
        method: 'post',
        data: req,
    })
}

// 更新社团申请得分的状态
export function scoreApplicationUpdatePost(req) {
    return service({
        url: '/scoreApplication/update',
        method: 'post',
        data: req,
    })
}