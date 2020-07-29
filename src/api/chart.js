import service from '@/utils/request'

// 模糊查询 姓名/学号
export function scoreChartBarPost(req){
    return service({
        url: '/scoreChart/bar',
        method: 'post',
        data: req
    })
}