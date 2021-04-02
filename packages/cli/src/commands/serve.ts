import path from 'path'
import { Command } from 'commander'
import { serve } from '@myjsnotebook/local-api'

const isProduction = process.env.NODE_ENV === 'production'

// [optional] <required>
export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server on', '4005')
  .action(async (filename = 'notebook.js', options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename))
      // are we on local dev or on a user's machine?
      // just before deploying our cli to npm, we run a script to replace NODE_ENV by 'production'
      await serve(+options.port, path.basename(filename), dir, !isProduction)
      console.log(`Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file.`)
    } catch (err) {
      if (err.code === 'EADDRINUSE') {
        console.error('Port is already in use. Try running on a different port.')
      } else {
        console.log('err', err.message)
      }
      process.exit(1)
    }
  })
