import service from '@/utils/request'

export function publicDataQueryGet(req){
    return service({
        url: '/publicData/query',
        method: 'get',
        params: req
    })
}

export function publicDataSetPost(req){
    return service({
        url: '/publicData/set',
        method: 'post',
        data: req
    })
}