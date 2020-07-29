import service from '@/utils/request'

//活动创建提交
export function taskPublishPost(req){
    return service({
        url: '/task/publish',
        method: 'post',
        data: req
    })
}

//创建活动 选择社团列表
export function taskPublishGet(req){
    return service({
        url: '/task/publish',
        method: 'get',
        params: req
    })
}

//活动栏浏览
export function taskActivityBarGet(req){
    return service({
        url: '/task/activityBar',
        method: 'get',
        params: req
    })
}

// 删除某个活动
export function taskDeletePost(req){
    return service({
        url: '/task/delete',
        method: 'post',
        data: req
    })
}