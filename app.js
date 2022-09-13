const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const BodyParser = require('koa-bodyparser');

app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

const bodyparser= new BodyParser();
app.use(bodyparser);

const index = require('./routes/index')
// routes
app.use(index.routes(), index.allowedMethods())

const server = app.listen(3000, () => {
  const { address, port } = server.address()
  // console.log('HTTP服务启动成功: http://%s:%s', address, port)
  console.log(`HTTP服务启动成功: http://localhost:${port}`)
})
