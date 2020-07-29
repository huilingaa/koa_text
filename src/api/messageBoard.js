import service from '@/utils/request'

// 评论
export function messageBoardAddPost(req) {
    return service({
        url: '/messageBoard/add',
        method: 'post',
        data: req
    })
}

// 获取评论
export function messageBoardQueryGet(req) {
    return service({
        url: '/messageBoard/query',
        method: 'get',
        params: req
    })
}

// 删除评论
export function messageBoardDeletePost(req) {
    return service({
        url: '/messageBoard/delete',
        method: 'post',
        data: req
    })
}
