import service from '@/utils/request'

// 模糊查询 姓名/学号
export function fuzzyQueryPost(req){
    return service({
        url: '/user/fuzzyQuery',
        method: 'post',
        data: req
    })
}

// 查询用户信息
export function userFindOneInfo(req){
    return service({
        url:'/user/findOneInfo',
        method:'get',
        params:req
    })
}