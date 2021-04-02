import express from 'express'
import { promises as fs } from 'fs'
import path from 'path'

interface Cell {
  id: string
  content: string
  type: 'text' | 'code'
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router()
  router.use(express.json())

  const fullPath = path.join(dir, filename)

  router.get('/cells', async (req, res) => {
    try {
      // read the file
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' })

      res.send(JSON.parse(result))
    } catch (err) {
      // if read error, check if file does not exist
      if (err.code === 'ENOENT') {
        // create file and add default cells
        await fs.writeFile(fullPath, '[]', 'utf-8')
        res.send([])
      } else {
        throw err
      }
    }
  })

  router.get('/posts', async (req, res) => {
    // take the list of cells from request object
    // serialize it
    const { cells }: { cells: Cell[] } = req.body

    // write cells into the file
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8')

    res.send({ status: 'ok' })
  })

  return router
}
