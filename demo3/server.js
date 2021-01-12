const fs = require('fs')
const Vue = require('vue')
const server = require('express')()
const VueServerRenderer = require('vue-server-renderer')

const renderer = VueServerRenderer.createRenderer({
  template: fs.readFileSync('./index.template.html', 'utf-8')
})

const context = {
  content: 'content 是服务端插入的内容，由 renderToString 第二个参数 context 提供'
}

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `
      <div>
      </div>
    `
  })

  renderer.renderToString(app, context).then(html => {
    // 这里输出就是将内容插入到模板后的，整个html内容
    res.end(`${html}`)
  }).catch(err => {
    res.status(500).end('Internal Server Error')
    return
  })
})

const port = process.env.PORT || 8888
server.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})
