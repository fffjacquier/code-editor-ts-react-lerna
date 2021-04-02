import express from 'express'
import path from 'path'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { createCellsRouter } from './routes/cell'

export const serve = (port: number, filename: string, dir: string, useProxy: boolean) => {
  // init express server
  const app = express()

  app.use(createCellsRouter(filename, dir))

  // if dev on our local machine, use proxy to local cra dev server
  // if on a user machine serve built files
  // so either useProxy or serve
  if (useProxy) {
    app.use(
      createProxyMiddleware({
        target: 'http://localhost:3000',
        ws: true, // websocket
        logLevel: 'silent',
      })
    )
  } else {
    // we use lerna to create the link local-client/build and local-api
    // but symbolic link not recognized by express static

    // resolve path to absolute
    const localPackagePath = require.resolve('@myjsnotebook/local-client/build/index.html')
    app.use(express.static(path.dirname(localPackagePath)))
  }

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject)
  })
}
