const router = require('koa-router')()
const fs = require('fs')
const process = require("child_process");

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

function runCommand() {
  return new Promise((resolve, reject) => {
    process.exec('npm run build', (error, stdout, stderr) => {
      console.log(error)
      if (!error) {
        resolve(true)
      } else {
        reject(error)
      }
    });
  })
}
router.post('/confused', async (ctx, next) => {
  const { code } = ctx.request.body
  try {
    await fs.writeFileSync('./public/js/index.js', code)
  } catch (err) {
    ctx.body = {
      code: 500,
      msg: '写入失败',
      err: err.message
    }
    return
  }
  try {
    await runCommand()
  } catch (err) {
    ctx.body = {
      code: 500,
      msg: '执行失败',
      err: err.message
    }
    return
  }
  try {
    const data = await fs.readFileSync('./public/js/index-obfuscated.js')
    ctx.body = {
      code: 200,
      data: data.toString()
    }
  } catch (err) {
    ctx.body = {
      code: 500,
      msg: '读取失败',
      err: err.message
    }
  }
})



module.exports = router
