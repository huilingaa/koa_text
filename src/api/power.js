import service from '@/utils/request'


//用户账号管理查看
export function adminListPost (req) {
    return service({
        url: '/power/getAdminList',
        method: 'post',
        data: req
    })
}
//用户账号管理重置密码
export function resettingPost (req) {
    return service({
        url: '/power/resetting',
        method: 'post',
        data: req
    })
}

// 用户账号管理删除用户
export function deletePost (req) {
    return service({
        url: '/power/delete',
        method: 'post',
        data: req
    })
}

// 用户账号管理获取角色信息
export function getRole (req) {
    return service({
        url: '/power/getRole',
        method: 'get',
        params: req
    })
}

// 用户账号管理角色修改
export function editPost (req) {
    return service({
        url: '/power/edit',
        method: 'post',
        data: req
    })
}