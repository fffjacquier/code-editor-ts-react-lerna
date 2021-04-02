import React, { Fragment, useEffect } from 'react'

import './cell-list.css'

import { useSelector } from '../hooks/useSelector'
import AddCell from './AddCell'
import CellListItem from './CellListItem'
import { useActions } from '../hooks/useActions'

const CellList: React.FC = () => {
  const cells = useSelector(({ cells }) => cells?.order.map((id) => cells?.data[id]))

  const { fetchCells } = useActions()

  useEffect(() => {
    fetchCells()
  }, [])

  const renderedCells = cells?.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ))

  return (
    <div className="cell-list">
      <AddCell forceVisible={cells && cells.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  )
}

export default CellList
