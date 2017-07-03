require('babel-register')

const express=require('express')
const http = require('http');
const createServer = http.createServer
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const ReactRouter = require('react-router')
const StaticRouter = ReactRouter.StaticRouter
// const match = ReactRouter.match
const RouterContext = ReactRouter.RouterContext
const ReactRedux = require('react-redux')
const Provider = ReactRedux.Provider
const Store = require('./js/Store.jsx')
const store = Store.store
const _ = require('lodash')
const fs = require('fs')
const port = 5050
const baseTemplate = fs.readFileSync('./index.html')
const template = _.template(baseTemplate)
const ClientApp = require('./js/ClientApp.jsx')
const Routes = ClientApp.Routes

//Destructuring doesnt work in node hence doing long method

const app = express()

app.use('/public', express.static('./public'))


// app.use((req, res) => {
//   match({
//       routes: Routes(),
//       location: req.url
//     },
//     (error, redirectLocation, renderProps) => {
//       if(error) {
//         res.status(500).send(error.message)
//       } else if(redirectLocation) {
//         res.redirect(302, redirectLocation.pathname +
//                           redirectLocation.search)
//       } else if(renderProps) {
//         const body = ReactDOMServer.renderToString(
//           React.createElement(Provider, {store},
//             React.createElement(RouterContext, renderProps)
//           )
//         )
//         res.status(200).send(template(body))
//       } else {
//         res.status(404).send('Not Found')
//       }
//     })
// })
app.use((req, res) => {
  const context = {}

  // const html = ReactDOMServer.renderToString(
  //   <StaticRouter location={req.url} context={context}>
  //     <App/>
  //   </StaticRouter>
  // )

  const html = ReactDOMServer.renderToString(
    React.createElement(Provider, {store},
      React.createElement(RouterContext, renderProps)
    )
  )
  //res.status(200).send(template(body))
  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    })
    res.end()
  } else {
    res.write(`
      <!doctype html>
      <div id="app">${html}</div>
    `)
    res.end()
  }
})
console.log('listening on port' + port)
app.listen(port)



// createServer((req, res) => {
//   const context = {}
//
//   const html = ReactDOMServer.renderToString(
//     <StaticRouter
//       location={req.url}
//       context={context}>
//       <App/>
//     </StaticRouter>
//   )
//
//   if (context.url) {
//     res.writeHead(301, {
//       Location: context.url
//     })
//     res.end()
//   } else {
//     res.write(`
//       <!doctype html>
//       <div id="app">${html}</div>
//     `)
//     res.end()
//   }
// }).listen(3000)
