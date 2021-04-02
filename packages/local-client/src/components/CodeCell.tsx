import { useEffect } from 'react'

import './code-cell.css'

import CodeEditor from './CodeEditor'
import Preview from './Preview'
import Resizable from './Resizable'
import { Cell } from '../state'
import { useActions } from '../hooks/useActions'
import { useSelector } from '../hooks/useSelector'
import { useCumulativeCode } from '../hooks/useCumulativeCode'

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions()
  const bundle = useSelector((state) => state?.bundles && state.bundles[cell.id])

  const cumulativeCode = useCumulativeCode(cell.id)

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode)
      return
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode)
    }, 750)

    return () => {
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cell.id, createBundle]) // do NOT add bundle dependancy here: you'll get an infinite loop

  // when show the loading?
  // so if it takes any longer than .XXsecs to bundle, it might take much longer
  // so we can animate the loading opacity when we want to show it
  return (
    <Resizable direction="vertical">
      <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor initialValue={cell.content} onChange={(value) => updateCell(cell.id, value)} />
        </Resizable>
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary">Loading..</progress>.
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  )
}

export default CodeCell
