import service from '@/utils/request'

export function register(req) {
    return service({
        url: '/user/register',
        method: 'post',
        data: req
    })
}

export function login(req) {
    return service({
        url: '/user/login',
        method: 'post',
        data: req
    })
}

export function findUser(req) {
    return service({
        url: '/user/find_user',
        method: 'post',
        data: req
    })
}

export function deleteUser(req) {
    return service({
        url: '/user/delete_user',
        method: 'post',
        data: req
    })
}

export function configUser(req) {
    return service({
        url: '/user/config_user',
        method: 'post',
        data: req
    })
}

export function uploadUser(req) {
    return service({
        url: '/user/upload_user',
        method: 'post',
        data: req
    })
}