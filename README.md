### **前端开发进化史**

#### **原始服务渲染**

了解SSR之前，需要知道最原始的服务器渲染：前后端一起开发，使用一个服务器。原始的服务器渲染是整个web项目放入后端，提供路由访问。好处坏处也很多，举例：MVC模式。JavaWeb。

![mvc](https://imgconvert.csdnimg.cn/aHR0cHM6Ly93d3cucnVub29iLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxNC8wOC8xMjAwcHgtTW9kZWxWaWV3Q29udHJvbGxlckRpYWdyYW0yLnN2Z18ucG5n?x-oss-process=image/format,png)

优点：

- 安全性：因为整个项目都在后端同一个服务器里。通过后端控制层提供路由访问
- 首屏加载快：这样浏览器不会太大工作，只需要接受后端返回回来html渲染

缺点：

- 不方便协同开发： 前后端开发困难，繁琐不方便，可能需要等待后端或者前端进度

- 前端代码量：前端还需要自己编写模板语句。jstl，ejs等…

- 维护难：随着项目增大页面的控制维护成本也会越来越大

- 体验不足：每次页面的切换需要重新请求在渲染

  

随着时代的变更。为了让开发更加高效，而且有更好的体验和维护成为。衍生出了**前后端分离模式**

意思就是：前端是一个单独模块单独服务器，后端也是单独模块单独服务器。两者之间通过跨域访问接口接口方式进行数据交互。大大提升了项目开发效率。比如较流行的 SPA单页面程序

#### **SPA单页面浏览渲染**

![前后分离](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy81NTg4Njg5LTJmYzlkNzg5YzMyMzk1M2YuanBn?x-oss-process=image/format,png)

优点：

- 减小服务器压力：性能消耗在客户端，可以减少服务器压力
- 协同开发、维护成本低： 前端不需要等后端，后端也不需要等前端，各做各的事。前端后端后只需要维护之间关注的功能
- 体验好： 可以做到接近原生软件效果，因为始终都是一个页面。而且一次性把所以页面请求到了，后面页面只需要请求一次或者不请求，也能访问到

缺点：

- SEO不友好： 因为页面中只有一个div。比如vue：div id=“app”, 其他页面是通过js操作生成页面。而SEO是爬取html的。不会爬取js
- 首屏加载慢： 由于更多加载及渲染工作都在浏览器端执行，比如：请求一个网站，浏览需要发出请求，获取到js，执行js获取到页面，在执行渲染页面，然后包括图片，css等。都需要大量和后端往返
- 性能问题： 由于更多加载及渲染工作都在浏览器端执行、单页面访问页面步骤： 先执行js —> 生成DOM —> 渲染DOM —> 发出请求回来—> 解析数据 —> 操作数据 —> 重新渲染

随着人们的需求升级，为了弥补缺点的不足。又推行了新模式 **SSR服务端渲染** 这个传统的MVC有一些相似，但具体又不同。他的出现解决了SPA单页面程序的问题，但是自身还有其他问题。

#### **服务端渲染（SSR）**

[官网]: https://ssr.vuejs.org/zh/#%E4%BB%80%E4%B9%88%E6%98%AF%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AB%AF%E6%B8%B2%E6%9F%93-ssr-%EF%BC%9F(https://ssr.vuejs.org/zh/#什么是服务器端渲染-ssr-？)	"什么是服务器端渲染"

优点：

- 更好的SEO（Search Engine Optimization：搜索引擎优化。利用搜索引擎的规则提高网站在有关搜索引擎内的自然排名。目的是让其在行业内占据领先地位，获得品牌收益。很大程度上是网站经营者的一种商业行为，将自己或自己公司的排名前移）：由于搜索引擎爬虫抓取的工具可以直接查看完全渲染的页面。不同爬虫工作原理类似，只会爬取源码，不会执行网站的任何脚本。使用了Vue或者其它MVVM框架之后，页面大多数DOM元素都是在客户端根据js动态生成，可供爬虫抓取分析的内容大大减少。另外，浏览器爬虫不会等待我们的数据完成之后再去抓取我们的页面数据。服务端渲染返回给客户端的是已经获取了异步数据并执行JavaScript脚本的最终HTML，网络爬中就可以抓取到完整页面的信息
- 首屏的渲染是node发送过来的html字符串，并不依赖于js文件了，这就会使用户更快的看到页面的内容。尤其是针对大型单页应用，因为打包后文件体积比较大，普通客户端渲染加载所有所需文件时间较长，首页就会有一个很长的白屏等待时间

缺点：

- 项目复杂度：由于需要做node中间处理，需要更多文件处理分服务，和浏览端文件
- 依赖性：SSR需要webpack做打包文件打包分离处理及node Server运行环境。在服务端渲染中，created和beforeCreate之外的生命周期钩子不可用，因此项目引用的第三方的库也不可用其它生命周期钩子，这对引用库的选择产生了很大的限制。前端修改部分html/css后端也要改
- 服务端压力大：本来是通过客户端完成渲染，现在统一到服务端node服务去做。尤其是高并发访问的情况，会大量占用服务端CPU资源

**预渲染**（prerender-spa-plugin）：无需服务器实时动态编译，采用预渲染，在构建时针对特定路由简单的生成静态HTML文件

优点：

- 加载应用程序的路由，将结果保存在一个静态的HTML文件中，几乎可以获得服务端渲染的所有优点，没有缺点
- 无需更改代码或添加服务器端

缺点：

- 若网站有成百上千条路线，预编译会非常的慢，虽每次更新只需要一次但会需要更长的时间。少数页面的SEO，可以采用预渲染。

![ssr渲染](https://img-blog.csdnimg.cn/20200517173205284.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxMzg3ODgy,size_16,color_FFFFFF,t_70)

##### **app.js / main.js入口文件**

app.js是我们的通用entry，它的作用就是构建一个Vue的实例以供服务端和客户端使用，注意一下，在纯客户端的程序中我们的app.js将会挂载实例到dom中，而在ssr中这一部分的功能放到了Client entry中去做了

###### app.js

```js
import Vue from 'vue'
import App from './App.vue'

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export function createApp () {
  const app = new Vue({
    // 根实例简单的渲染应用程序组件。
    render: h => h(App)
  })
  return { app }
}
```

###### entry-client.js

```js
import { createApp } from './app'

// 客户端特定引导逻辑……

const { app } = createApp()

// 这里假定 App.vue 模板中根元素具有 `id="app"`
app.$mount('#app')
```

###### entry-server.js

```js
import { createApp } from './app'

export default context => {
  const { app } = createApp()
  return app
}
```

##### **两部分入口entry.js**

Client entry和Server entry，这两者分别是**客户端的入口和服务端的入口**。Client entry的功能很简单，就是挂载我们的**Vue实例到指定的dom元素上**；Server entry是一个使用export导出的函数。主要负责调用组件内定义的获取数据的方法，获取到SSR渲染所需数据，并存储到上下文环境中。这个函数会在每一次的渲染中重复的调用



##### **webpack打包构建**

我们的服务端代码和客户端代码通过webpack分别打包，生成Server Bundle和Client Bundle，前者会运行在服务器上通过node生成预渲染的HTML字符串，发送到我们的客户端以便完成初始化渲染；而客户端bundle就自由了，初始化渲染完全不依赖它了。客户端拿到服务端返回的HTML字符串后，会去“激活”这些静态HTML，是其变成由Vue动态管理的DOM，以便响应后续数据的变化



##### **解析运行流程**

首先构建一个vue的实例，也就是前面构建流程中说到的app.js做的事情，但是这里不同于传统的客户端渲染的程序，我们需要用一个工厂函数去封装它，以便每一个用户的请求都能够返回一个新的实例，也就是官网说到的避免交叉污染。

然后到服务端的entry，这里要做的是拿到当前路由匹配的组件，调用组件里定义的一个方法（官网取名叫asyncData）拿到初始化渲染的数据，调用vuex store中的方法去异步获取数据。

接下来node服务器启动了，跑的是我们刚写好的服务端entry里的函数。在这里还要做的就是将我们刚刚构建好的Vue实例渲染成HTML字符串，然后将拿到的数据混入我们的HTML字符串中，最后发送到我们客户端。

打开浏览器的network，我们看到了初始化渲染的HTML，并且是我们想要初始化的结构，且完全不依赖于客户端的js文件了。里面有初始化的dom结构，有css，还有一个script标签。script标签里把我们在服务端entry拿到的数据挂载了window上。只是一个纯静态的HTML页面，没有任何的交互逻辑。

#### **如何选择？**

- 注重SEO的新闻网站，非强交互的页面，建议采用服务器端渲染
- 对于强交互的页面，不注重SEO，采用客户端渲染
- 只需改善少数页面的SEO，采用预渲染