const Vue = require('vue')
const server = require('express')()
const VueServerRenderer = require('vue-server-renderer')
const renderer = VueServerRenderer.createRenderer()

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      hostname: req.hostname,
      url: req.url,
      query: req.query,
      text: `这是一个express作服务端返回数据的例子`,
    },
    template: `
      <div>
        <h1 v-html="text"></h1>
        <h2>当前访问的 hostname 是： {{ hostname }}</h2>
        <h2>当前访问的 url 是： {{ url }}</h2>
        <h2>当前访问的 query 是： {{ query }}</h2>
      </div>
    `
  })

  renderer.renderToString(app).then(html => {
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <meta charset="utf-8">
        <head><titleVue SSR 课程</title></head>
        <body>${html}</body>
      </html>
    `)
  }).catch(err => {
    res.status(500).end('Internal Server Error')
    return
  })
})

/**
 * 起 server 
 */
const port = process.env.PORT || 8888
server.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})
