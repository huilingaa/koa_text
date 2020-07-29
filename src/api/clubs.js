import service from '@/utils/request'

export function clubInfoGet(req){
    return service({
        url: '/club/clubInfo',
        method: 'post',
        params: req
    })
}

export function myClubPost(req){
    return service({
        url: '/club/myCluba',
        method: 'post',
        data: req
    })
}
