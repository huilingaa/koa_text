import service from '@/utils/request'

// 获取所有角色
export function roleAllDataGet (req) {
    return service({
        url: '/role/allData',
        method: 'get',
        params: req
    })
}

// 获取角色的账号列表
export function roleUsersGet (req) {
    return service({
        url: '/role/getRoleUsers',
        method: 'get',
        params: req
    })
}

//【创建角色】权限树形结构基础数据
export function roleFromPost (req) {
    return service({
        url: '/role/roleFrom',
        method: 'post',
        data: req
    })
}

// 添加角色
export function roleAddPost (req) {
    return service({
        url: '/role/roleAdd',
        method: 'post',
        data: req
    })
}

// 删除角色
export function roleDeletePost (req) {
    return service({
        url: '/role/roleDelete',
        method: 'post',
        data: req
    })
}

// 解除账号与角色绑定
export function roleUnbindPost (req) {
    return service({
        url: '/role/unbind',
        method: 'post',
        data: req
    })
}


