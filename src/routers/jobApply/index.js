const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const { Apply } = require('../../utils/dbModelExports')
module.exports = async router => {
    router.post('/set_apply', async (ctx, next) => {
        const { job_name, company_name, company_address,company_size,phone,people,email,content,status,data_type,job_type_id,tags,files} = ctx.request.body
        // const file = ctx.request.files.title; // 获取上传文件
        // const filename =  await setFile(file)
        console.log(job_name, company_name, company_address,company_size,phone,people,email,content,status,data_type,job_type_id,tags,files)
        await Apply({
            job_name,
            company_name,
            company_address,
            company_size,
            phone,
            people,
            email,
            content,
            status,
            data_type,
            job_type_id,
            tags,
            files
        }).save(err => {
            if (err) {
                next(err)
                return
            }
            ctx.body = { 
                data:'申请成功'
            }
            next()
        })
    })
}

async function setFile(file) {
    const reader = fs.createReadStream(file.path); // 创建可读流
    const ext = file.name.split('.').pop(); // 获取上传文件扩展名
    const filePath = `./init.${ext}`;
    const upStream = fs.createWriteStream(filePath); // 创建可写流
    reader.pipe(upStream); // 可读流通过管道写入可写流
    return filePath
}