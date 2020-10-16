const { Apply } = require('../../utils/dbModelExports')
const { isReceiveEmptys, setUpload } = require('../../plugins/common')

module.exports = async router => {
    /**
       * @swagger
       * /public/set_apply:
       *   post:
       *     description: set_apply 招聘发布-申请
       *     tags: [User]
       *     parameters:
       *       - name: job_name
       *         type: string
       *         required: true
       *         description: 职位名称
       *       - name: company_name
       *         type: string
       *         required: true
       *         description: 公司名称
       *       - name: company_address
       *         type: string
       *         required: true
       *         description: 公司地址
       *       - name: company_size
       *         type: string
       *         required: true
       *         description: 公司规模
       *       - name: phone
       *         type: string
       *         required: true
       *         description: 手机号
       *       - name: people
       *         type: string
       *         required: true
       *         description: 联系人
       *       - name: email
       *         type: string
       *         required: true
       *         description: 邮箱
       *       - name: content
       *         type: string
       *         required: true
       *         description: 富文本
       *       - name: data_type
       *         type: string
       *         required: true
       *         description: 数据引入类型
       *       - name: job_type_id
       *         type: string
       *         required: true
       *         description: 职位类型
       *       - name: tags
       *         type: string
       *         required: true
       *         description: 岗位标签
       *       - name: img
       *         type: string
       *         required: true
       *         description: 营业执照
       *     responses:
       *       200:
       *         description: 返回用户信息及token
       *         schema:
       *           example:
       *              {"data": {
       *           user:'用户信息',
       *           token:'token'
       * }}
    */

    router.post('/public/set_apply', async (ctx, next) => {
        const img = ctx.request.files.img
        const { data } = ctx.request.body
        const { company_address, company_name, company_size, content, data_type, email, job_name, job_type_id, people, phone, tags } = JSON.parse(data)
        if (isReceiveEmptys(company_address, company_name, company_size, content, data_type, email, job_name, job_type_id, people, phone, tags)) {
            ctx.throw('400', '缺少上传参数！')
        }
        const files = setUpload(img, 'jobApply', company_name)
        const applyData = await Apply.create({
            company_address,
            company_name,
            company_size,
            content,
            data_type,
            email,
            job_name,
            job_type_id,
            people,
            phone,
            tags,
            files: [files]
        })
        if (applyData) {
            ctx.msg = '发布成功'
        } else {
            ctx.throw('400', '发布失败')
        }
        await next()
    })
}
