import service from '@/utils/request'

export function register(req){
    return service({
        url: '/user/register',
        method: 'post',
        data: req
    })
}

export function login(req){
    return service({
        url:'/user/login',
        method:'post',
        data:req
    })
}