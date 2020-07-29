import service from '@/utils/request'

//查看社团成员
export function clubMemberGet(req){
    return service({
        url: '/clubMember/allData',
        method: 'get',
        params: req
    })
}

//查看社团成员select栏-条件搜索
export function selectFindPost(req){
    return service({
        url: '/clubMember/selectFind',
        method: 'post',
        data: req
    })
}

//查看社团成员select栏-条件搜索
export function memberDeletePost(req){
    return service({
        url: '/clubMember/deleteOne',
        method: 'post',
        data: req
    })
}

// 添加社团成员
export function memberAddManyPost(req){
  return service({
      url: '/clubMember/addMany',
      method: 'post',
      data: req
  })
}